import React, { useState } from 'react';

const LearnNext = () => {
    const [topic, setTopic] = useState("");
    const [source, setSource] = useState("");
    const [skillsArr, setSkillsArr] = useState([]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!topic.trim()) return; // Don't add empty topics

        setSkillsArr([...skillsArr, { 
            id: Date.now(), // Unique ID for key mapping
            topic, 
            source, 
            status: "Not Started" 
        }]);
        setTopic("");
        setSource("");
    };

    const toggleStatus = (id) => {
        setSkillsArr(skillsArr.map(item => {
            if (item.id === id) {
                // Cycle through statuses or toggle
                const nextStatus = item.status === "Not Started" ? "In Progress" : 
                                   item.status === "In Progress" ? "Mastered" : "Not Started";
                return { ...item, status: nextStatus };
            }
            return item;
        }));
    };

    return (
        <div className='m-8 p-4 border-t-2 border-zinc-200 pt-8'>
            <h2 className='text-4xl font-bold text-center mb-6'>
                What to <span className='text-green-700'>Learn Next</span>
            </h2>

            <form onSubmit={handleFormSubmit} className='flex flex-wrap gap-4 justify-center mb-6'>
                <input 
                    type="text"
                    placeholder="Topic (e.g., Node.js CORS)"
                    className='text-xl p-4 border-zinc-700 border-2 rounded-lg'
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                />
                <input 
                    type="text"
                    placeholder="Resource/Link"
                    className='text-xl p-4 border-zinc-700 border-2 rounded-lg'
                    value={source}
                    onChange={(e) => {setSource(e.target.value)}}
                />
                <button className='bg-green-700 text-white p-4 rounded-lg text-xl font-semibold'>
                    Add to Roadmap
                </button>
            </form>

            {/* Render list mapping goes here, similar to your todo renderer */}
            <div className='flex flex-col items-center'>
                {skillsArr.length === 0 ? (
                    <p className='text-zinc-500'>Your roadmap is empty. Add a skill to conquer!</p>
                ) : (
                    <ul className='w-full max-w-md'>
                        {skillsArr.map((item) => (
                            <li key={item.id} className='m-3 p-4 border-2 border-zinc-400 rounded-lg bg-white flex justify-between items-center'>
                                <div>
                                    <p className='text-xl font-bold'>{item.topic}</p>
                                    <p className='text-sm text-zinc-500'>{item.source || "No resource linked"}</p>
                                </div>
                                <button 
                                    onClick={() => toggleStatus(item.id)}
                                    className={`p-2 rounded text-white text-sm font-bold ${
                                        item.status === "Mastered" ? "bg-green-500" : 
                                        item.status === "In Progress" ? "bg-yellow-500 text-black" : "bg-zinc-400"
                                    }`}
                                >
                                    {item.status}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default LearnNext;