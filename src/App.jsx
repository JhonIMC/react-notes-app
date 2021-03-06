import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import NoteList from "./components/NoteList";
import Search from "./components/Search";
import Header from "./components/Header";

function App() {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("react-notes")) ?? []
  );

  const [searchText, setSearchText] = useState("");
  
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("toggle-mode")) ?? false
  );

  // Send notes to LocalStorage
  useEffect(() => {
    localStorage.setItem("react-notes", JSON.stringify(notes));
  }, [notes]);

  // Send toggle mode to LocalStorage
  useEffect(() => {
    localStorage.setItem("toggle-mode", JSON.stringify(darkMode));
  }, [darkMode]);

  // Add new note
  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString(),
    };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  };

  // Delete a note
  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  return (
    <div className={`${darkMode && "dark-mode"}`}>
      <div className="container">
        <Header handleToggleDarkMode={setDarkMode} />
        <Search handleSearchNote={setSearchText} />
        <NoteList
          notes={notes.filter((note) =>
            note.text.toLowerCase().includes(searchText)
          )}
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
        />
      </div>
    </div>
  );
}

export default App;
