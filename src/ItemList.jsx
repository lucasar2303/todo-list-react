import React from 'react'
import './ItemList.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'


function ItemList(props){
    return (
                <div 
                className={props.completed ? "item-container item-completed" : "item-container"} >
                    <div className='item-text-container'>
                    <div className='item-check'  onClick={() => props.onClickCheckItem(props.index)}><FontAwesomeIcon icon={faCheck} /></div>
                    <input className='item-text' type='text' value={props.text} disabled/>
                    </div>
                    <div className='item-button-container'>
                        <button className='item-button-edit'><FontAwesomeIcon icon={faPenToSquare} /></button>
                        <button className='item-button-delete'><FontAwesomeIcon icon={faTrash} /></button>
                        <button className='item-button-confirm'><FontAwesomeIcon icon={faCheck} /></button>
                    </div>
                </div>


        )
}

export default ItemList