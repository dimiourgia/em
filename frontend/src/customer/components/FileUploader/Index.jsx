import React, { useState, useEffect } from 'react';
import { BlobServiceClient } from '@azure/storage-blob';
import { readAndCompressImage } from 'browser-image-resizer';

const storage_sas_token = import.meta.env.VITE_AZURE_BLOB_SAS_TOKEN;
const storage_account = import.meta.env.VITE_AZURE_BLOB_ACCOUNT;
const az_blob_container = import.meta.env.VITE_AZURE_BLOB_CONTAINER;

const blob_endpoint = `https://${storage_account}.blob.core.windows.net/?${storage_sas_token}`;

// Configuration options for resizing
const imageResizeConfig = {
    quality: 0.8,
    maxWidth: 800,
    maxHeight: 800,
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

const FileUploader = () => {
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
            const resizedImage = await resizeImage(file);

            const result = await uploadFileToAzure(resizedImage);

            if (result.success) {
                uploadedFilesList.push({ name: file.name, url: result.url });
            }
        }

        setUploadedFiles(uploadedFilesList);
    };

    const resizeImage = async (file) => {
        try {
            const resizedImage = await readAndCompressImage(file, imageResizeConfig);
            return new File([resizedImage], file.name, { type: file.type });
        } catch (error) {
            console.error('Error resizing image:', error);
            return file; // Return the original file if resizing fails
        }
    };

    return (
        <div>
            <h2>Upload Images to Azure Blob Storage</h2>
            <input type="file" accept="image/*" multiple onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload Files</button>

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
