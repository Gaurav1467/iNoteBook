import React, { useContext } from 'react';
import noteContext from '../context/note/noteContext';
import Notes from './Notes';



function Home(props) {

  const context = useContext(noteContext);

  const { notes } = context;

  return (

    <div className="container">

      <Notes notes={notes} showAlert={props.showAlert} />

    </div>


  )
}

export default Home