import React, { useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import Clock from './Clock'
import InputTask from './InputTask'
import ItemList from './ItemList'
import './Todolist.css'

function TodoList(){

    // List

    const initialList = () => {
        const savedList = localStorage.getItem('myList');
        return savedList ? JSON.parse(savedList) : [];
    };

    const [list, setList] = useState(initialList);

    useEffect(() => {
        localStorage.setItem('myList', JSON.stringify(list));
    }, [list]);

    // -----

    const [newItem, setNewItem] = useState("");
    const [deleteConfirm, setDeleteConfirm] = useState(false)

    const handleInputChange = (value) => {
        setNewItem(value);
    };

    function addItem(form){
        form.preventDefault();
        if(!newItem){
            return;
        }
        setList([...list, { id: uuidv4(), text: newItem, isCompleted: false }]);
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

    function deleteItem(index){
        const newList = list.filter((item, i) => i !== index);
        setList(newList);
    }

    function editItem(index, newText) {
        const updatedList = list.map((item, i) => 
            i === index ? { ...item, text: newText } : item
        );
    
        setList(updatedList);
    }

    function handleDragEnd(result) {
    if (!result.destination) return;

    const updatedList = Array.from(list);
    const [reorderedItem] = updatedList.splice(result.source.index, 1);
    updatedList.splice(result.destination.index, 0, reorderedItem);

    // Agora, atualize o estado do componente com updatedList.
    setList(updatedList);
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
                        <DragDropContext onDragEnd={handleDragEnd}>
                            <Droppable droppableId="taskList">
                                {(provided) => (
                                    <div className='list-container' {...provided.droppableProps} ref={provided.innerRef}>
                                        {list.map((item, index) => (
                                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                                {(provided) => (
                                                    <div ref={provided.innerRef} {...provided.draggableProps} >
                                                        <ItemList 
                                                            text={item.text} 
                                                            key={item.id}
                                                            index={index}
                                                            completed={item.isCompleted} 
                                                            onClickCheckItem={clickCheckItem} 
                                                            onDeleteItem={deleteItem}
                                                            onEditItem={editItem}
                                                            dragHandleProps={provided.dragHandleProps}
                                                        />
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </div>
                )
            }
        </div>
    );
}


export default TodoList