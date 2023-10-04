import React from 'react'
import './InputTask.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

function InputTask(){
    return (
            <form className='input-task-form'>

                <input type='text' placeholder='Add task' className='input-task-input'/>

                <button type='submit' className='input-task-button'>
                    <FontAwesomeIcon icon={faCheck} />
                </button>
                
            </form>

        )
}

export default InputTask