import React, { useState, useEffect } from 'react';

const LearnNext = () => {
    const [topic, setTopic] = useState("");
    const [source, setSource] = useState("");
    
    // Lazy initialisation to fetch data from localStorage on first render
    const [skillsArr, setSkillsArr] = useState(() => {
        const savedSkills = localStorage.getItem('learnNext_roadmap');
        return savedSkills ? JSON.parse(savedSkills) : [];
    });

    // Synchronize data to localStorage whenever skillsArr updates
    useEffect(() => {
        localStorage.setItem('learnNext_roadmap', JSON.stringify(skillsArr));
    }, [skillsArr]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!topic.trim()) return;

        setSkillsArr([...skillsArr, { 
            id: Date.now(), 
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
                const nextStatus = item.status === "Not Started" ? "In Progress" : 
                                   item.status === "In Progress" ? "Mastered" : "Not Started";
                return { ...item, status: nextStatus };
            }
            return item;
        }));
    };

    const deleteSkill = (id) => {
        setSkillsArr(skillsArr.filter(item => item.id !== id));
    };

    return (
        <div className='max-w-4xl mx-auto my-6 mx-4 sm:mx-6 md:mx-auto p-4 sm:p-6 bg-purple-200 rounded-2xl border border-zinc-200 shadow-sm'>
            <h2 className='text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-6 text-zinc-800 tracking-tight'>
                What to <span className='text-purple-700 px-2 py-1 rounded-md'>Learn Next</span>
            </h2>

            {/* Input Form: Stacked on mobile, 2 cols on tablet, 3 elements row on desktop */}
            <form onSubmit={handleFormSubmit} className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-8 bg-purple-400 p-4 rounded-xl border border-zinc-200 shadow-inner'>
                <div className='lg:col-span-2'>
                    <input 
                        type="text"
                        placeholder="Topic (e.g., Node.js CORS)"
                        className='w-full text-base p-3 border-zinc-300 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all'
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                    />
                </div>
                <div className='lg:col-span-2'>
                    <input 
                        type="text"
                        placeholder="Resource/Link"
                        className='w-full text-base p-3 border-zinc-300 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all'
                        value={source}
                        onChange={(e) => setSource(e.target.value)}
                    />
                </div>
                <button className='w-full sm:col-span-2 lg:col-span-1 bg-purple-700 hover:bg-purple-800 text-white p-3 rounded-lg text-base font-semibold transition-colors shadow-sm active:scale-[0.98] transform duration-100'>
                    Add Skill
                </button>
            </form>

            {/* Output List Container */}
            <div className='w-full'>
                {skillsArr.length === 0 ? (
                    <div className='text-center py-10 bg-purple-100 rounded-xl border border-dashed border-zinc-300'>
                        <p className='text-zinc-500 font-medium text-sm sm:text-base'>Your roadmap is empty. Add a skill to conquer!</p>
                    </div>
                ) : (
                    // Card layout: 1 col on mobile, 2 cols on tablet/desktop
                    <ul className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        {skillsArr.map((item) => (
                            <li key={item.id} className='p-4 border border-zinc-200 rounded-xl bg-purple-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between gap-4'>
                                <div className='min-w-0'>
                                    <p className='text-lg font-bold text-zinc-800 break-words mb-1'>{item.topic}</p>
                                    <p className='text-xs text-zinc-500 truncate'>
                                        {item.source ? (
                                            <a href={item.source} target="_blank" rel="noreferrer" className='text-blue-600 hover:underline'>
                                                {item.source}
                                            </a>
                                        ) : "No resource linked"}
                                    </p>
                                </div>
                                <div className='flex items-center justify-between pt-2 border-t border-zinc-100 mt-auto'>
                                    <button 
                                        onClick={() => toggleStatus(item.id)}
                                        className={`px-3 py-1.5 rounded-md text-xs font-bold tracking-wide transition-all uppercase ${
                                            item.status === "Mastered" ? "bg-green-100 text-green-800 border border-green-200" : 
                                            item.status === "In Progress" ? "bg-amber-100 text-amber-800 border border-amber-200" : 
                                            "bg-zinc-100 text-zinc-600 border border-zinc-200"
                                        }`}
                                    >
                                        {item.status}
                                    </button>
                                    
                                    <button 
                                        onClick={() => deleteSkill(item.id)}
                                        className='text-xs font-medium text-zinc-400 hover:text-red-500 transition-colors px-2 py-1'
                                        title="Delete topic"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default LearnNext;

