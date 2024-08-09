import React, { useState, useEffect } from 'react';
import { BlobServiceClient } from '@azure/storage-blob';
import { readAndCompressImage } from 'browser-image-resizer';
import { Button } from '@mui/material';

const storage_sas_token = import.meta.env.VITE_AZURE_BLOB_SAS_TOKEN;
const storage_account = import.meta.env.VITE_AZURE_BLOB_ACCOUNT;
const az_blob_container = import.meta.env.VITE_AZURE_BLOB_CONTAINER;

const blob_endpoint = `https://${storage_account}.blob.core.windows.net/?${storage_sas_token}`;

// Configuration options for resizing
const imageResizeConfig_original = {
    quality: 0.95,
    maxWidth: 2048,
    maxHeight: 2048,
    autoRotate: true,
    debug: true,
};

const imageResizeConfig_thumbnail = {
    quality: 0.5,
    maxWidth: 200,
    maxHeight: 200,
    autoRotate: true,
    debug: true,
};

const imageResizeConfig_medium = {
    quality: 0.8,
    maxWidth: 1024,
    maxHeight: 1024,
    autoRotate: true,
    debug: true,
};

async function uploadFileToAzure(file) {
    try {
        const blobServiceClient = new BlobServiceClient(blob_endpoint);
        const containerClient = blobServiceClient.getContainerClient(az_blob_container);
        const blobClient = containerClient.getBlockBlobClient(file.name);

        const result = await blobClient.uploadBrowserData(file, {
            blobHTTPHeaders: { blobContentType: file.type },
            blockSize: 4 * 1024 * 1024,
            concurrency: 20,
            onProgress: (ev) => console.log(ev),
        });

        console.log(`Upload of file '${file.name}' completed`);

        const blobUrl = `https://${storage_account}.blob.core.windows.net/${az_blob_container}/${file.name}`;

        return { success: true, url: blobUrl };
    } catch (e) {
        console.error(e);
        return { success: false, url: null };
    }
}

const FileUploader = ({updateImageUrls}) => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState([]);

    useEffect(()=>{
        console.log(uploadedFiles, "uploaded files");
    },[uploadedFiles]);

    const handleFileChange = (event) => {
        setSelectedFiles(event.target.files);
    };

    const handleUpload = async () => {
        const uploadedFilesList = [];

        for (let i = 0; i < selectedFiles.length; i++) {
            const file = selectedFiles[i];

            // Resize the image
            const resizedImage_hq = await resizeImage(file, 'hq');
            const resizedImage_lq = await resizeImage(file, 'lq');
            const resizedImage_mq = await resizeImage(file, 'mq');

            const result = await uploadFileToAzure(resizedImage_hq);

            //upload other resolution images as well images as well
            await uploadFileToAzure(resizedImage_lq);
            await uploadFileToAzure(resizedImage_mq);

            if (result.success) {
                uploadedFilesList.push({ name: file.name, url: result.url });
            }
        }

        setUploadedFiles(uploadedFilesList);
        updateImageUrls(pre=>({...pre, imageUrl:uploadedFilesList.map(item=>item.url)}));
    };

    const resizeImage = async (file, resolution) => {
        try {
            
            switch(resolution){
                case 'hq' : {
                    const resizedImage = await readAndCompressImage(file, imageResizeConfig_original);
                    return new File([resizedImage], file.name, { type: file.type });
                }
                case 'mq' : {
                    const resizedImage = await readAndCompressImage(file, imageResizeConfig_medium);
                    return new File([resizedImage], `${file.name}_mq`, { type: file.type });
                }
                case 'lq' : {
                    const resizedImage = await readAndCompressImage(file, imageResizeConfig_thumbnail);
                    return new File([resizedImage], `${file.name}_lq`, { type: file.type });
                }
            }
            
        } catch (error) {
            console.error('Error resizing image:', error);
            return file; // Return the original file if resizing fails
        }
    };

    return (
        <div>
            <h2>Upload Images (Multiple images can be uploaded) </h2>
            <input type="file" accept="image/*" multiple onChange={handleFileChange} />
            <Button variant="contained" sx={{ p: .8 }} className="py-20" size="small" onClick={handleUpload}>{`Upload File(s)`}</Button>
            <h3>Uploaded Files</h3>
            <ul>
                {uploadedFiles.map((file) => (
                    <li key={file.name}>
                        <a href={file.url} target="_blank" rel="noopener noreferrer">
                            {file.name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FileUploader;
