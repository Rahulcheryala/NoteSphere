// import { useState } from "react";
// import NoteContext from "./noteContext";

// const NoteState = (props) => {
//   const s1 = {
//     name: "Rahul",
//     roll: 210010012,
//   };
//   const [details, setDetails] = useState(s1);

//   const updateDetails = () => {
//     setTimeout(() => {
//       setDetails({
//         name: "Rohith",
//         roll: 190010012,
//       });
//     }, 1000);
//   };
//   return (
//     <NoteContext.Provider
//       value={{ state: details, updateFunction: updateDetails }}
//     >
//       {props.children}
//     </NoteContext.Provider>
//   );
// };

// export default NoteState;

import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const existingNotes = [];
  const [notes, setNotes] = useState(existingNotes);

  // Fetch all notes of the user
  const getNotes = async () => {
    // API call
    const response = await fetch(`${host}/api/notes/fetchNotes`, {
      method: "GET", // GET, POST, PUT, DELETE etc...
      headers: {
        "Content-Type": "application/json",
        "auth-token": JSON.parse(localStorage.getItem("UserInfo")).token,
      },
    });
    const json = await response.json();
    // console.log(json);
    setNotes(json);
  };

  // Add a note
  const addNote = async (title, description, tag) => {
    // API call
    const response = await fetch(`${host}/api/notes/addNote`, {
      method: "POST", // GET, POST, PUT, DELETE etc...
      headers: {
        "Content-Type": "application/json",
        "auth-token": JSON.parse(localStorage.getItem("UserInfo")).token,
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    console.log("Adding a new note");
    // console.log(note);
    setNotes(notes.concat(note));
  };

  // Delete a note
  const deleteNote = async (id) => {
    // API call
    const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
      method: "DELETE", // GET, POST, PUT, DELETE etc...
      headers: {
        "Content-Type": "application/json",
        "auth-token": JSON.parse(localStorage.getItem("UserInfo")).token,
      },
    });
    const json = await response.json();
    // console.log(json);

    console.log("Deleting note with id:" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
      method: "PUT", // GET, POST, PUT, DELETE etc...
      headers: {
        "Content-Type": "application/json",
        "auth-token": JSON.parse(localStorage.getItem("UserInfo")).token,
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <>
      <NoteContext.Provider
        value={{ notes, setNotes, addNote, editNote, deleteNote, getNotes }}
      >
        {props.children}
      </NoteContext.Provider>
    </>
  );
};

export default NoteState;
