import React , {useState, useEffect} from 'react'
import axios from 'axios'
import './App.css';
import Addtask from './Components/Addtask';

function App() {
  const [todolist,setTodolist] = useState([])
  useEffect(() => {
    axios.get('http://localhost:3001/todos').then(res =>{
      setTodolist(res.data)
    }).catch(err => console.log(err))
  },[])


  const addTask = newTask =>{
    setTodolist([...todolist,newTask])
  }
  return (
    <div className="App">
      <Addtask addTask = {addTask}/>
      
    </div>
  );
}

export default App;
