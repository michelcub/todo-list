import { useState, useEffect, useMemo } from 'react'


function App() {


  const [newTask, setNewTask] = useState();

   const createListOnApi = () => {
     fetch('https://assets.breatheco.de/apis/fake/todos/user/fastTodoList', {
       method: "POST",
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify(newTask)
     })
     .then(res => {
       if(!res.ok&&!res.status == '400'){
         throw Error(`Hay un error ${res.status}`)
       }
       return res.json()
     })
     .then(data => data)
     .catch( err => console.log(err));
   }

  const updateList = ()=> {
    fetch('https://assets.breatheco.de/apis/fake/todos/user/fastTodoList', {
      method: "PUT",
      headers: {'Content-Type' : 'application/json'},
      body: [JSON.stringify(newTask)]
    })
  }

  const callApiTodo = () => {
    fetch('https://assets.breatheco.de/apis/fake/todos/user/fastTodoList', {
      method: "GET",
      headers: {'Content-Type': 'application/json'},
    })
    .then(res => res.json())
    .then(res => setNewTask([...res]))
    .catch(err => console.log(err))
  }
  useEffect(()=>createListOnApi,[createListOnApi])
  useEffect(()=>callApiTodo,[]);

  const handleCreateNewTask = (e) => {
    if(e.key==='Enter'){
      setNewTask((prev) => {
        let task = e.target.value;
        if(!task?.length){
          alert('esta vacio');
          return;
        }
        newTask?.map(item=>{
          if(item.label ===task){
            alert('Ya tienes creada una lista con el mismo contenido, puedes crear otra lista diferente');
            return task = prev;
          }
        })
        return task!==prev?[...prev,{label:task, done: false}]:[...prev];
      })
    }
  }

  const handleRemoveItem = (e) => {
    const id = e.target.id;
    setNewTask((prev)=>{
      return prev.filter((item)=> item.label != id?item:null)
    })
  }

  const list = useMemo(()=>{
    console.log(newTask);
    return newTask
  },[newTask]);

  useEffect(updateList,[newTask]);


  return (
    <section className='d-flex justify-content-center mt-5'>
      <ul className='list-group w-50 border' key='list'>
        <input type="text" placeholder='New task' name='task' className='list-group-item' onKeyUp={handleCreateNewTask} key='input'/>
        {list?.map((item) => <li className='list-group-item d-flex justify-content-between' key={item.id}>{item.label}<a className='btn btn-danger' id={item.label} onClick={handleRemoveItem}>x</a></li>)}
        <li className='list-group-item text-secondary'>{list?.length} Item left</li>
      </ul>
        
      
    </section>
  )
}

export default App
