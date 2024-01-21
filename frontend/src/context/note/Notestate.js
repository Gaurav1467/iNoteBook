import { useState } from "react";
import NoteContext from "./noteContext";


const NoteState = (props) => {

  const [notes, setNotes] = useState([])

  const url = "https://i-note-book-backend-psi.vercel.app"

  // Get all notes

  const getNotes = async () => {

    const respone = await fetch(`${url}/api/notes/fetchallnotes`, {

      method: "GET",
      headers: {
        "Content-Type": "application/json",

        "auth-token": localStorage.getItem('token')
      }

    });

    const json = await respone.json();
    setNotes(json.notes);

  }


  // Add a note 
  const addNote = async ({ title, description, tag }) => {

    const response = await fetch(`${url}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

        "auth-token": localStorage.getItem('token')
      },

      body: JSON.stringify({ title, description, tag })

    })

    const json = await response.json()


    setNotes(notes.concat(json.savedNote));

  }

  // Delete a note

  const deleteNote = async (id) => {

    setNotes(notes.filter((note) => note._id !== id));

    await fetch(`${url}/api/notes/deletenote/${id}`, {

      method: "DELETE",
      headers: {
        "Content-Type": "application/json",

        "auth-token": localStorage.getItem('token')
      }

    });


  }

  // Edit a note 

  const editNote = async (id, title, description, tag,) => {

    //  editing the client note details
    for (let i = 0; i < notes.length; i++) {
      const element = notes[i];
      if (element._id === id) {
        notes[i].title = title
        notes[i].description = description
        notes[i].tag = tag

      }
      break;
    }

    // API call
    await fetch(`${url}/api/notes/updatenote/${id}`, {

      method: "PUT",
      headers: {
        "Content-Type": "application/json",

        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })

    });

    // const json = respone.json();

  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;