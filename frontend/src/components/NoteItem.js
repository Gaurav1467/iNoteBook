import React, { useContext } from 'react'
import noteContext from '../context/note/noteContext';

function NoteItem(props) {
    const context = useContext(noteContext)
    const {deleteNote } = context;
    const { note, updateNote, showAlert } = props;
    const {_id, title, description, tag } = note ;

    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{title} </h5>
                    <p className="card-text">{description}</p>
                    <h6 style={{position : "relative", float : "right"}}>{tag}</h6>
                    <i className="fa-solid fa-pen-to-square fa-lg" onClick={()=>{updateNote(note)}}></i>
                    <i className="fa-solid fa-trash fa-lg " onClick={()=> {deleteNote(_id) ; showAlert("Deleted Note Successfully", "success")}}></i>
                </div>
            </div>
        </div>
    )
}

export default NoteItem