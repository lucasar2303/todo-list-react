import React, { useState } from 'react'
import './ItemList.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faGripLines } from '@fortawesome/free-solid-svg-icons'


function ItemList(props){
    
    const [inputValue, setInputValue] = useState(props.text);
    const [isDisabled, setIsDisabled] = useState(true);
    const [operation, setOperation] = useState("");
    

    function switchConfirmEdit(event){
        const itemContainer = event.target.closest('.item-container');
        itemContainer.classList.add("item-selected")
        const itemText = itemContainer.querySelector('.item-text');
        setIsDisabled(false)
        setTimeout(() => {
            itemText.focus();
        }, 10);
        hideButtons("edit", itemContainer)
    }

    function switchConfirmDelete(event){
        const itemContainer = event.target.closest('.item-container');
        itemContainer.style.background = "#FD6363";
        const itemText = itemContainer.querySelector('.item-text');
        itemText.classList.add("text-selected")
        hideButtons("delete", itemContainer);
    }
    
    function confirm(){
        if(operation == "edit"){
            const itemContainer = event.target.closest('.item-container');
            itemContainer.classList.remove("item-selected")
            setIsDisabled(true)
            showButtons()
            props.onEditItem(props.index, inputValue)
        }else if(operation == "delete"){
            props.onDeleteItem(props.index)
            showButtons()
            resetCssDelete()
        }
    }

    function showButtons(){
        const itemContainer = event.target.closest('.item-container');
        itemContainer.querySelector(".item-button-edit").classList.remove("hide");
        itemContainer.querySelector(".item-button-delete").classList.remove("hide");
        itemContainer.querySelector(".drag-handle").style.color = "#787878"
        itemContainer.querySelector(".drag-handle").style.visibility = ""
        itemContainer.querySelector(".drag-handle").style.opacity = ""
        itemContainer.querySelector(".item-button-confirm").classList.add("hide");
    }

    function hideButtons(button, itemContainer){
        itemContainer.querySelector(".item-button-edit").classList.add("hide");
        itemContainer.querySelector(".item-button-delete").classList.add("hide");
        itemContainer.querySelector(".drag-handle").style.color = "#FFF"
        itemContainer.querySelector(".drag-handle").style.visibility = "visible"
        itemContainer.querySelector(".drag-handle").style.opacity = "1"
        itemContainer.querySelector(".item-button-confirm").classList.remove("hide");
   
        setOperation(button);
    }

    function handleMouseLeave(event) {
        if(operation=="delete"){
        showButtons()
        resetCssDelete()
        }
    }

    function resetCssDelete(){
        const itemContainer = event.target.closest('.item-container');
        itemContainer.style.background = "#222";
        const itemText = itemContainer.querySelector('.item-text');
        itemText.classList.remove("text-selected")
    }
    


    return (
            <div className={props.completed ? "item-container item-completed" : "item-container"} onMouseLeave={(e)=>handleMouseLeave(e)} >
                <div className='item-text-container'>
                    <div className='item-check'  onClick={() => props.onClickCheckItem(props.index)}><FontAwesomeIcon icon={faCheck} /></div>
                    <input className='item-text' type='text' value={inputValue} onChange={e => setInputValue(e.target.value)} disabled={isDisabled}/>
                </div>
                <div className='item-button-container'>
                    <button className='item-button-edit' onClick={(e) => switchConfirmEdit(e)}><FontAwesomeIcon icon={faPenToSquare} /></button>
                    <button className='item-button-delete' onClick={(e) => switchConfirmDelete(e)}><FontAwesomeIcon icon={faTrash} /></button>
                    <button className='item-button-confirm hide' onClick={confirm}><FontAwesomeIcon icon={faCheck} /></button>
                    <div className="drag-handle" {...props.dragHandleProps}><FontAwesomeIcon icon={faGripLines} /></div>
                </div>
            </div>
        )
}

export default ItemList