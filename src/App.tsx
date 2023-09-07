import React, { useState, useEffect } from 'react';
import './App.css';
import Note from '../components/Note/Note';

interface NoteData {
  id: number;
  content: string;
  bgColor: string;
  rotation: number;
}

function App() {
  const storedNotes: NoteData[] = JSON.parse(localStorage.getItem('notes') || '[]');

  const bgColors = ['#d070af', '#2fb4ab', '#d9a75f'];

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * bgColors.length);
    return bgColors[randomIndex];
  };

  function getRandomRotation(): number {
    return Math.floor(Math.random() * 9) - 4;
  }

  const [notes, setNotes] = useState<NoteData[]>(storedNotes);

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
      id: Date.now(), // Use a unique ID, e.g., timestamp
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
          />
        ))}
      </div>
    </div>
  );
}

export default App;
