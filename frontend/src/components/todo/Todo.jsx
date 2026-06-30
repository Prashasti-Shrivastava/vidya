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

    let renderTask = <h2 className='text-xl text-zinc-500 m-5 text-center w-full'>No tasks available</h2>;
    
    if (tastArr.length > 0) {
        renderTask = tastArr.map((item, index) => {
            return (
                <li key={index} className='w-[380px] min-w-[320px] p-5 border-2 border-zinc-700 rounded-lg bg-zinc-50 flex flex-col justify-between shadow-sm'>
                    <div>
                        <p className='text-2xl font-bold text-zinc-800 break-words mb-2'>{item.task}</p>
                        <p className='text-xl text-zinc-600 break-words mb-4'>{item.des}</p>
                    </div>
                    <button className='bg-red-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-600 transition-colors self-start cursor-pointer text-sm'
                    onClick={() => {
                        deleteHandler(index);
                    }}
                    >Delete</button>
                </li>
            );
        });
    }

  return (
    <div className='max-w-7xl mx-auto px-4 pb-12'>
      <h1 className='m-8 p-4 text-4xl font-bold text-center '>Your personalised <span className='text-green-700'>TO-DO</span> List</h1>

      <form onSubmit={submitHandler} className='flex flex-col gap-4 max-w-md mx-auto p-6 border-2 border-zinc-300 rounded-xl bg-white shadow-sm mb-12'>
        <input type="text"
        placeholder='Add a new task'
        className='text-xl p-4 border-zinc-700 border-2 rounded-lg w-full h-12 focus:outline-none focus:border-green-700'
        value={task}
        onChange={(e)=>{
            setTask(e.target.value);
        }}
        required
        />
      
        <input type="text"
        placeholder='Add description for the task'
        className='text-xl p-4 border-zinc-700 border-2 rounded-lg w-full h-12 focus:outline-none focus:border-green-700'
        value={des}
        onChange={(e)=>{
            setDes(e.target.value);
        }}
        />
        
        <button className='bg-green-700 text-white font-semibold rounded-lg text-xl h-12 w-full hover:bg-green-800 transition-colors cursor-pointer mt-2'>Add Task</button>
      </form>

      <div className="w-full px-4">
        <ul className="flex flex-row flex-wrap justify-start gap-6 w-full">
            {renderTask}
        </ul>
      </div>     
    </div>
  )
}

export default Todo;

