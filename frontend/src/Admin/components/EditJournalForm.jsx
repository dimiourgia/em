import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchJournal, updateJournal } from '../../State/Journal/actions';

const EditJournalForm = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, journals } = useSelector(state => state.journal);

    const [formData, setFormData] = useState({
        category: '',
        title: '',
        authorName: '',
        content: [{ subHeading: '', text: '' }],
        images: [] // New field for images
    });

    useEffect(() => {
        dispatch(fetchJournal(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (journals.length > 0) {
            const journalToEdit = journals.find(journal => journal._id === id);
            setFormData({
                category: journalToEdit.category,
                title: journalToEdit.title,
                authorName: journalToEdit.authorName,
                content: journalToEdit.content,
                images: journalToEdit.images // Set existing images for editing
            });
        }
    }, [journals, id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleContentChange = (index, e) => {
        const { name, value } = e.target;
        const newContent = formData.content.map((content, i) =>
            i === index ? { ...content, [name]: value } : content
        );
        setFormData({ ...formData, content: newContent });
    };

    const handleAddContent = () => {
        setFormData({ ...formData, content: [...formData.content, { subHeading: '', text: '' }] });
    };

    const handleDeleteContent = (index) => {
        const newContent = formData.content.filter((_, i) => i !== index);
        setFormData({ ...formData, content: newContent });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const imagesArray = files.map(file => URL.createObjectURL(file));
        setFormData({ ...formData, images: [...formData.images, ...imagesArray] });
    };

    const handleRemoveImage = (index) => {
        const newImages = formData.images.filter((_, i) => i !== index);
        setFormData({ ...formData, images: newImages });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(updateJournal(id, formData));
        navigate('/admin/journals');
    };

    return (
        <div className="bg-gray-500 min-h-screen flex items-center justify-center">
            <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-2xl">
                <h1 className="text-2xl font-bold mb-5 text-center">Edit Journal</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && <div className="text-red-500">{error}</div>}
                    <input
                        type="text"
                        name="category"
                        placeholder="Category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="text"
                        name="authorName"
                        placeholder="Author Name"
                        value={formData.authorName}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />

                    <div className="space-y-2">
                        <h4>Images</h4>
                        {formData.images.map((image, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <img src={image} alt={`Image ${index}`} className="h-20" />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveImage(index)}
                                    className="py-1 px-2 bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <input
                            type="file"
                            name="images"
                            onChange={handleImageChange}
                            multiple
                            accept="image/*"
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>

                    {formData.content.map((content, index) => (
                        <div key={index} className="space-y-2">
                            <h4>Add Subheading</h4>
                            <input
                                type="text"
                                name="subHeading"
                                placeholder="Subheading"
                                value={content.subHeading}
                                onChange={(e) => handleContentChange(index, e)}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                            <h4>Add Content</h4>
                            <textarea
                                name="text"
                                placeholder="Text"
                                value={content.text}
                                onChange={(e) => handleContentChange(index, e)}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                            <button
                                type="button"
                                onClick={() => handleDeleteContent(index)}
                                className="w-full py-2 bg-gray-600 text-white rounded hover:bg-red-400"
                            >
                                Delete Content Section
                            </button>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={handleAddContent}
                        className="w-full py-2 bg-gray-600 text-white rounded hover:bg-green-400"
                    >
                        Add Content Section
                    </button>
                    <button
                        type="submit"
                        className="w-full py-2 bg-gray-600 text-white rounded hover:bg-blue-500"
                        disabled={loading}
                    >
                        {loading ? 'Updating...' : 'Update Journal'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditJournalForm;
