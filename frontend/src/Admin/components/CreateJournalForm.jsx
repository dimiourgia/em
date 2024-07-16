import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createJournal } from '../../State/Journal/actions';
import { useNavigate } from 'react-router-dom';

const CreateJournalForm = () => {
    const [formData, setFormData] = useState({
        category: '',
        title: '',
        subHeadings: [],
        images: ['', '', ''], // Initial empty strings for three images
        authorName: '',
        content: [{ subHeading: '', text: '' }],
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector(state => state.journal);

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

    const handleImageChange = (index, e) => {
        const newImages = [...formData.images];
        newImages[index] = e.target.value;
        setFormData({ ...formData, images: newImages });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(createJournal(formData));
        navigate('/admin/journals');
    };

    return (
        <div className="bg-gray-500 min-h-screen flex items-center justify-center">
            <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-2xl">
                <h1 className="text-2xl font-bold mb-5 text-center">Create Journal</h1>
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

                    {/* Image inputs */}
                    <div className="space-y-2">
                        <h4>Images</h4>
                        {formData.images.map((image, index) => (
                            <input
                                key={index}
                                type="text"
                                name={`images[${index}]`}
                                placeholder={`Image ${index + 1}`}
                                value={image}
                                onChange={(e) => handleImageChange(index, e)}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        ))}
                    </div>

                    {/* Content inputs */}
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

                    {/* Buttons */}
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
                        {loading ? 'Creating...' : 'Create Journal'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateJournalForm;
