import React, { useState, useEffect } from 'react';
import './App.css';
import Note from '../components/Note/Note';
import { getRandomColor, getRandomRotation } from '../functions/functions';
interface NoteData {
  id: number;
  content: string;
  bgColor: string;
  rotation: number;
}

function App() {
  const storedNotes: NoteData[] = JSON.parse(localStorage.getItem('notes') || '[]');
  const [notes, setNotes] = useState<NoteData[]>(storedNotes);
  
  const updateNotePosition = (id: number, position: { x: number; y: number }) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, position } : note
      )
    );
  };

  const handleContentChange = (id: number, newContent: string) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, content: newContent } : note
      )
    );
  };

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    const newNote: NoteData = {
      id: Date.now(),
      content: '',
      bgColor: getRandomColor(),
      rotation: getRandomRotation(),
    };
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    const notesContainer = document.querySelector('.notes-container');
    if (notesContainer && !notesContainer.contains(e.target as Node)) {
      addNote();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div>
      <div className="notes-container">
        {notes.map((item) => (
          <Note
            key={item.id}
            id={item.id}
            content={item.content}
            bgColor={item.bgColor}
            rotation={item.rotation}
            onChange={handleContentChange}
            updateNotePosition={updateNotePosition}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
