import React from 'react'
import Clock from './Clock'
import InputTask from './InputTask'
import './Todolist.css'

function TodoList(){
    return (<div className='todo-list-container'>
                <Clock/>
                <InputTask/>
            </div>
        )
}

export default TodoList