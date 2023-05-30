import { useState, useMemo } from 'react'


function App() {

  const [newTask, setNewTask] = useState([]);
  
  const handleCreateNewTask = (e) => {
    if(e.key==='Enter'){
      setNewTask((prev) => {
        const task = e.target.value;
        return [...prev,{id:Math.floor(Math.random()*100000), task}];
      })
    }
  }

  const handleRemoveItem = (e) => {
    const id = e.target.id;
    setNewTask((prev)=>{
      return prev.filter((item)=> item.id != id?item:null)
    })
  }

  const list = useMemo(()=>{
    console.log(newTask);
    return newTask;
    
  },[newTask]);

  return (
    <section className='d-flex justify-content-center mt-5'>
      <ul className='list-group w-50 border'>
        <input type="text" placeholder='New task' name='task' className='list-group-item' onKeyUp={handleCreateNewTask}/>
        {list.map((item) => <li className='list-group-item d-flex justify-content-between' key={item.id}>{item.task}<a className='btn btn-danger' id={item.id} onClick={handleRemoveItem}>x</a></li>)}
        <li className='list-group-item text-secondary'>{list.length} Item left</li>
      </ul>
        
      
    </section>
  )
}

export default App
