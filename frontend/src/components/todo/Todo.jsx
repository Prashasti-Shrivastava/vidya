import React, { useState } from 'react'

const Todo = () => {
    const [task, setTask] = useState("");
    const [des,setDes]=useState("");
    const [tastArr,setTaskArr]=useState([]);
    const submitHandler=(e)=>{
        e.preventDefault();
        setTaskArr([...tastArr,{task,des}]);
        setTask("");
        setDes("");
    }

    const deleteHandler=(index)=>{
        const copyArr=[...tastArr];
        copyArr.splice(index,1);
        setTaskArr(copyArr);
    }
     // FIX: Only map if there are tasks, otherwise show the fallback message
    let renderTask = <h2 className='text-xl text-zinc-500 m-5'>No tasks available</h2>;
    
    if (tastArr.length > 0) {
        renderTask = tastArr.map((item, index) => {
            return (
                <li key={index} className='w-full max-w-md m-3 p-5 border-2 border-zinc-700 mb-5 rounded-lg bg-zinc-50'>
                    <p className='text-2xl font-bold text-zinc-800 break-words'>{item.task}</p>
                    <p className='text-xl text-zinc-600 break-words'>{item.des}</p>
                    <button className='bg-red-500 text-white p-2 m-2 rounded-lg'
                    onClick={() => {
                        deleteHandler(index);
                    }}
                    >Delete</button>
                </li>
            );
        });
    }

  return (
    <div className='shadow-sm mb-12'>
      <h1 className='m-8 p-4 text-4xl font-bold text-center '>Your personalised <span className='text-green-700'>TO-DO</span> List</h1>

      <form onSubmit={submitHandler} className='flex flex-col max-w-[600px] mx-auto p-6 border-2 border-zinc-300 rounded-xl bg-white '>
        <input type="text"
        placeholder='Add a new task'
        className='text-2xl p-5 m-5 border-zinc-700 border-2 rounded-lg min-w-[350px]'
        value={task}
        onChange={(e)=>{
            setTask(e.target.value);
        }}
        >
        </input>
      
        <input type="text"
        placeholder='Add description for the task'
        className='text-2xl p-5 m-5 border-zinc-700 border-2 rounded-lg min-w-[350px] h-40px'
        value={des}
        onChange={(e)=>{
            setDes(e.target.value);
        }}
        >
        </input>
        
        <button className='bg-green-700 text-white p-5 m-5 rounded-lg text-2xl min-w-[350px]'>Add Task</button>
      </form>
        <div className="w-full px-8 my-8">
        <ul className="flex flex-row flex-wrap flex-start gap-6 w-full">
            {renderTask}
        </ul>
        </div>     
    </div>
  )
}

export default Todo;
