import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchJournals } from '../../../State/Journal/actions';

const JournalList = () => {
    const dispatch = useDispatch();
    const { journals, loading, error } = useSelector((state) => state.journal);

    useEffect(() => {
        dispatch(fetchJournals());
    }, [dispatch]);

    if (loading) return <div className="min-h-screen text-center py-10">Loading...</div>;
    if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;

    const cardColors = ['bg-blue-200', 'bg-green-200', 'bg-yellow-200', 'bg-pink-200']; 

    return (
        <div className="min-h-screen flex justify-center bg-white"> 
            <div className="p-10 mb-8 rounded-lg bg-gray-50 shadow-lg w-full max-w-4xl grid-container"> 
                <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {Array.isArray(journals) && journals.map((journal, index) => (
                        <div key={journal._id} className={`border border-gray-300 rounded-lg overflow-hidden shadow-lg journal-card ${cardColors[index % cardColors.length]}`}>
                            <Link to={`/journals/${journal._id}`} className="block h-full">
                                {journal.images.length > 0 && (
                                    <img src={journal.images[0]} alt={journal.title} className="w-full h-40 object-cover" />
                                )}
                                <div className="p-4">
                                    <h2 className="text-lg font-heading font-semibold mb-2">{journal.title}</h2>
                                    <p className="text-xs text-gray-600">Publised Date: {new Date(journal.createdAt).toLocaleDateString()}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default JournalList;
