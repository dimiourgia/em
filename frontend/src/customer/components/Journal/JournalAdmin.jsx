import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchJournals, deleteJournal } from '../../../State/Journal/actions';

const JournalAdmin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { journals, loading, error } = useSelector((state) => state.journal);

    useEffect(() => {
        dispatch(fetchJournals());
    }, [dispatch]);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this journal?")) {
            dispatch(deleteJournal(id));
        }
    };

    if (loading) return <div className="text-center py-10">Loading...</div>;
    if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;

    return (
        <div className="bg-gray-500 min-h-screen flex items-center justify-center">
            <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-4xl">
                <h1 className="text-2xl font-bold mb-5 text-center">Manage Journals</h1>
                <button
                    onClick={() => navigate('/admin/journals/create')}
                    className="mb-5 w-full py-2 bg-gray-600 text-white rounded hover:bg-blue-500"
                >
                    Create Journal
                </button>
                <ul className="space-y-4">
                    {Array.isArray(journals) && journals.map((journal) => (
                        <li key={journal._id} className="flex justify-between items-center p-4 border border-gray-300 rounded">
                            <span className="font-semibold">{journal.title}</span>
                            <div className="space-x-2">
                                <button
                                    onClick={() => navigate(`/admin/journals/edit/${journal._id}`)}
                                    className="py-1 px-3 bg-gray-600 text-white rounded hover:bg-blue-500"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(journal._id)}
                                    className="py-1 px-3 bg-gray-600 text-white rounded hover:bg-red-500"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default JournalAdmin;
