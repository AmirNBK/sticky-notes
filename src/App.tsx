import React, { useState, useEffect } from 'react';
import './App.css';
import Note from '../components/Note/Note';
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';

interface NoteData {
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

  const [notes, setNotes] = useState<NoteData[]>(storedNotes);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    const newNote: NoteData = {
      content: 'New Note',
      bgColor: getRandomColor(),
      rotation: 4,
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
        {notes.map((item, index) => {
          return (
            <Note
              key={index}
              content={item.content}
              bgColor={item.bgColor}
              rotation={item.rotation}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
