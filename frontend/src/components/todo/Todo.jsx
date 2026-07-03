import React, { useState, useEffect } from 'react'

const Todo = () => {
    const [task, setTask] = useState("");
    const [des, setDes] = useState("");
    
    // READ: Load tasks from localStorage on initial load, default to empty array if none found
    const [tastArr, setTaskArr] = useState(() => {
        const localData = localStorage.getItem('my_todo_list');
        return localData ? JSON.parse(localData) : [];
    });

    // WRITE: Automatically update localStorage whenever tastArr changes
    useEffect(() => {
        localStorage.setItem('my_todo_list', JSON.stringify(tastArr));
    }, [tastArr]);

    const submitHandler = (e) => {
        e.preventDefault();
        setTaskArr([...tastArr, { task, des }]);
        setTask("");
        setDes("");
    }

    const deleteHandler = (index) => {
        const copyArr = [...tastArr];
        copyArr.splice(index, 1);
        setTaskArr(copyArr);
    }

    return (
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12'>
            <h1 className='my-8 p-2 text-3xl sm:text-4xl font-extrabold text-center text-zinc-800 tracking-tight'>
                Your personalised <span className='text-purple-700 px-3 py-1 rounded-lg border'>TO-DO</span> List
            </h1>

            {/* Form layout: Clean border profiles, uniform heights, and fluid sizing */}
            <form onSubmit={submitHandler} className='flex flex-col gap-4 max-w-md mx-auto p-5 sm:p-6 border border-zinc-200 rounded-2xl bg-white shadow-sm mb-12'>
                <div>
                    <label className='block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5 ml-1'>Task Title</label>
                    <input 
                        type="text"
                        placeholder='What needs to be done?'
                        className='text-base px-4 py-3 border-zinc-300 border rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all shadow-inner bg-zinc-50/50'
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        required
                    />
                </div>
            
                <div>
                    <label className='block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5 ml-1'>Description</label>
                    <input 
                        type="text"
                        placeholder='Add optional details...'
                        className='text-base px-4 py-3 border-zinc-300 border rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all shadow-inner bg-zinc-50/50'
                        value={des}
                        onChange={(e) => setDes(e.target.value)}
                    />
                </div>
                
                <button className='bg-purple-700 hover:bg-purple-800 text-white font-semibold rounded-xl text-base py-3 w-full transition-all shadow-sm active:scale-[0.99] transform duration-100 mt-2 cursor-pointer'>
                    Add Task
                </button>
            </form>

            {/* Task Container */}
            <div className="w-full">
                {tastArr.length === 0 ? (
                    <div className='text-center py-12 bg-purple-100 rounded-2xl border border-dashed border-zinc-300 max-w-md mx-auto'>
                        <p className='text-zinc-500 font-medium text-sm sm:text-base'>No tasks available. Relax or add a target!</p>
                    </div>
                ) : (
                    // Responsive dynamic grid system matching mobile, tablet, and desktop viewports
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
                        {tastArr.map((item, index) => (
                            <li key={index} className='p-5 border border-zinc-200 rounded-2xl bg-purple-100 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow group min-w-0'>
                                <div className='min-w-0 mb-4'>
                                    <p className='text-lg font-bold text-zinc-800 break-words mb-1.5 tracking-tight'>{item.task}</p>
                                    <p className='text-sm text-zinc-500 break-words leading-relaxed'>
                                        {item.des || <span className='italic text-zinc-300'>No description added</span>}
                                    </p>
                                </div>
                                <div className='pt-3 border-t border-zinc-100 flex justify-end mt-auto'>
                                    <button 
                                        className='bg-zinc-100 text-zinc-600 hover:bg-red-50 hover:text-red-600 py-1.5 px-3 rounded-lg font-medium transition-colors cursor-pointer text-xs flex items-center gap-1'
                                        onClick={() => deleteHandler(index)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>     
        </div>
    )
}

export default Todo;

