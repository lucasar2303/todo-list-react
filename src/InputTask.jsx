import React from 'react'
import './InputTask.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

function InputTask({ onInputChange, value, onSubmit }){
    return (
        <form className='input-task-form' onSubmit={onSubmit}>
            <input 
                id='inputEntry'
                placeholder='Add task' 
                className='input-task-input' 
                type='text' 
                value={value} 
                onChange={(e) => onInputChange(e.target.value)}
            />
            <button type='submit' className='input-task-button'>
                <FontAwesomeIcon icon={faCheck} />
            </button>
        </form>
    );
}


export default InputTask