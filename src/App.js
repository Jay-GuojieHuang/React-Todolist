import React, { useState, useCallback, useEffect } from 'react'
import logo from './logo.svg';
import './App.css';
import MyHeader from './components/Header'
import AddInput from './components/AddInput';
import TodoItem from './components/TodoItem';
import CheckModal from './components/Modal/CheckModal';
import EditModal from './components/Modal/EditModal';
import WelcomePage from './components/WelcomePage';
function App() {

  const [isInputShow, setisInputShow] = useState(false),
    [ isShowCheckModal, setShowCheck ] = useState(false),
    [isShowEditModal, setShowEditModal ] = useState(false),
    [todoList, setTodoList] = useState([]),
    [currentData, setCurrentData]=useState({});

  //相当于class组件中的componentDidMount()
  useEffect(() => {
    const todoData = JSON.parse(localStorage.getItem('todoData') || []);
    setTodoList(todoData);
  }, []);
  useEffect(() => {
     localStorage.setItem('todoData', JSON.stringify(todoList));
  }, [todoList]);


  const addItem = useCallback((value) => {
    // console.log('app' + value)
    const dataItem = {
      id: new Date().getTime(),
      content: value,
      completed: false
    };

    setTodoList((todoList) =>
      [dataItem, ...todoList]
    );
    setisInputShow(false);
  }, []);
  // const openInput=()=>{
  //   let toggle=!isInputShow
  //   setisInputShow(toggle)
  // }

  const openCheckModal =useCallback((id) =>{
    setCurrentData(()=>todoList.filter(item=>item.id ===id)[0]);
    setShowCheck(true);
  },[todoList])

  const openEditModal =useCallback((id) =>{
    
    setCurrentData(()=>todoList.filter(item=>item.id ===id)[0]);

    setShowEditModal(true);
  },[todoList])

  const submitEdit = useCallback((newData,id)=>{
    setTodoList((todoList) => 
      todoList.map((item) => { 
        if(item.id === id) {
          item= newData
        }
        return item;
      })
      
     )
     setShowEditModal(false)
  },[])

  const onCheckChange = useCallback((id) =>{
    setTodoList((todoList)=>
    todoList.map((item)=>{
      if(item.id===id){
         item.completed= !item.completed
      }
      return item;
    }))
  },[]);

  const deleteTodoItem =useCallback((id)=>{
    setTodoList((todoList)=>
    todoList.filter(item=>item.id !==id))
  },[])

  return (
    
    <div className="App">
      <CheckModal
      isShowCheckModal = {isShowCheckModal}
      data= {currentData}
      closeModal = {()=>{setShowCheck(false)}}
      ></CheckModal>
      <EditModal
      isShowEditModal = {isShowEditModal}  
      data ={currentData}
      submitEdit = {submitEdit}
    >
      </EditModal>
      <MyHeader openInput={() => setisInputShow(!isInputShow)} ></MyHeader>
      <AddInput isInputShow={isInputShow} addItem={addItem}></AddInput>

{
  !todoList ||todoList.length===0
  ?
  <WelcomePage></WelcomePage>
  :
  (
          <ul className="todo-list">
        {
          todoList.map((item, index) => {
            return (
              <TodoItem 
              data={item} 
              key={index}
              openCheckModal = {openCheckModal}
              openEditModal = {openEditModal}
              onCheckChange = {onCheckChange}
              deleteTodoItem = {deleteTodoItem}
              ></TodoItem>
            )

          })}
      </ul>
  )
}

    </div>
  );
}

export default App;
