import React, { useState } from 'react'
import Clock from './Clock'
import InputTask from './InputTask'
import ItemList from './ItemList'
import './Todolist.css'

function TodoList(){
    const [list, setList] = useState([]);
    const [newItem, setNewItem] = useState("");
    const [deleteConfirm, setDeleteConfirm] = useState(false)

    const handleInputChange = (value) => {
        setNewItem(value);
    };

    function addItem(form){
        form.preventDefault();
        if(!newItem){
            return
        }
        setList([...list, {text: newItem, isCompleted:false}])
        setNewItem("");
        document.querySelector("#inputEntry").focus();
    }
    
    function clickCheckItem(index){
        const listAux = [...list];
        listAux[index].isCompleted = !listAux[index].isCompleted;
        setList(listAux);
    }

    function deleteAll() {
        const btnDelete = document.querySelector("#button-delete-all");
        if(!deleteConfirm) {
            btnDelete.innerHTML = "Confirm";
            btnDelete.style.color = "#FD6363";
            setDeleteConfirm(true);
        } else {
            btnDelete.innerHTML = "Delete All";
            btnDelete.style.color = "#666";
            setList([]);
            setDeleteConfirm(false);
        }
    }
    
    let containerClassName = 'todo-list-container';
    if (list.length < 1) {
        containerClassName += ' noItems';
    }
    const completedTasksCount = list.filter(item => item.isCompleted).length;


    return (
        <div className={containerClassName}>
            <Clock />
            <InputTask onInputChange={handleInputChange} value={newItem} onSubmit={addItem} />
    
            {
                list.length > 0 && (
                    <div>
                        <div className='tasks-container'>
                            <span className='tasks-count'>{completedTasksCount}/{list.length} Tasks</span>
                            <button className='tasks-button-delete' id="button-delete-all" onClick={deleteAll}>Delete all</button>
                        </div>
                        <div className='list-container'>
                            {list.map((item, index)=>(
                                <ItemList 
                                text={item.text} 
                                key={index} 
                                index={index} 
                                completed={item.isCompleted} 
                                onClickCheckItem={clickCheckItem} 
                            />
                            ))}
                        </div>
                    </div>
                )
            }
    
        </div>
    );
}


export default TodoList