import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteItem from './NoteItem'
import AddNote from './AddNote';
import noteContext from '../context/note/noteContext';
import { useNavigate } from 'react-router-dom';

function Notes(props) {
    const {showAlert} = props; 
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    const [note, setNote] = useState({_id : "", etitle : "", edescription : "", etag : ""})
    const navigate =  useNavigate();

    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes();
        }
        else{
            navigate('/login');
        }

        // eslint-disable-next-line
    },[])

    const ref = useRef(null)

    const updateNote = (currentNote) => {
        setNote({_id : currentNote._id, etitle : currentNote.title, edescription : currentNote.description, etag : currentNote.tag});
        ref.current.click();
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name] : e.target.value })
    }

    const handleClick = (e)=>{
        editNote(note._id, note.etitle, note.edescription, note.etag );
        showAlert("Note updated Successfully", "success")
        ref.current.click();        

    }

    return (
        <>
            <AddNote showAlert = {showAlert} />

            <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">

            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className='container'>
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="title" className="form-label">Title</label>
                                        <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} aria-describedby="title" minLength={3} required  onChange={onChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className="text-box">Description</label>
                                        <textarea rows="4" type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} minLength={8} required  onChange={onChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="tag" className="form-label">Tag</label>
                                        <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} />
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled = { note.etitle.length<2 || note.edescription.length<7 || note.etag.length <1 } type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row ">
                <h2 className=' my-2'>Your Notes</h2>
                <div className="container">
                    {notes.length===0 && "No notes to display"}
                </div>
                {notes.map((note) => {

                    return <NoteItem key={note._id} note={note} updateNote={() => { updateNote(note) } } showAlert={showAlert} />

                })}
            </div>

        </>


    )
}

export default Notes