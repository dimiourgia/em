import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchJournal } from '../../../State/Journal/actions';
import { Link } from 'react-router-dom';

const JournalDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { loading, error, journals } = useSelector(state => state.journal);

    useEffect(() => {
        dispatch(fetchJournal(id));
    }, [dispatch, id]);

    if (loading) return <div className="text-center py-10">Loading...</div>;
    if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;

    const journal = journals.find(journal => journal._id === id);

    if (!journal) return <div className="text-center py-10 text-red-500">Journal not found.</div>;

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString();
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="p-10 rounded-lg w-full max-w-4xl">
                <div className={`bg-gray-200 border border-gray-300 rounded-lg overflow-hidden shadow-lg journal-card`}>
                    {journal.images.length > 0 && (
                        <img src={journal?.images[0]} alt={journal.title} className="w-full h-80 object-cover" />
                    )}
                    <div className="p-4">
                        <h1 className="text-3xl font-heading font-bold mb-2">{journal.title}</h1>
                        <p className="text-sm text-gray-600 mb-1">Published on {formatDate(journal.createdAt)}</p>
                        <p className=" font-heading mb-2">Author: {journal.authorName}</p>
                        <div className="mt-4">
                            {journal.content.map((content, index) => (
                                <div key={index} className="space-y-2">
                                    <h3 className="text-xl font-heading flex items-center justify-center font-semibold m-2 mb-2">{content.subHeading}</h3>
                                    <p className="text-gray-700 m-2 mb-2">{content.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Link to="/journals" className="pt-10 flex items-center justify-center text-gray-800 py-2 px-4 text-center hover:bg-gray-300">
                        <div className='text-center rounded-lg bg-white px-2 py-2'>Back to Journals </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default JournalDetail;
