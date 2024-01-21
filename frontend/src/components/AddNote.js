import React, { useContext, useState } from 'react';
import noteContext from '../context/note/noteContext';

function AddNote(props) {

    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({title : "", description : "", tag : ""})

    const handleClick = (e)=>{

        e.preventDefault();
        addNote(note);
        setNote({title : "", description : "", tag : ""})
        props.showAlert("Added note successfully","success")

    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name] : e.target.value })
    }

    return (
        <>
            <div className='container'>
                <h2>Add Note</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name='title'value={note.title} aria-describedby="emailHelp" minLength={3} required onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="text-box">Description</label>
                        <textarea rows="4" type="text" className="form-control" id="description" minLength={8} required  name='description' value={note.description} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name='tag'value={note.tag} onChange={onChange}/>
                    </div>
                    <button disabled = { note.title.length<2 || note.description.length<7 }  type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </>
    )
}

export default AddNote