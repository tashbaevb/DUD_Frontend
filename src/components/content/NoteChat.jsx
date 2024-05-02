import React, { useState, useEffect } from 'react';
import axios from 'axios';

function NoteChat() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [editedMessageId, setEditedMessageId] = useState(null);
  const [editedMessage, setEditedMessage] = useState('');
  const [originalNotes, setOriginalNotes] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const token = localStorage.getItem('jwtToken');

  const fetchNotes = async () => {
    try {
      const response = await axios.get('http://localhost:8086/note', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes(response.data);
      setOriginalNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSendNote = async () => {
    try {
      await axios.post('http://localhost:8086/note', { message: newNote }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchNotes();
      setNewNote('');
    } catch (error) {
      console.error('Error sending note:', error);
    }
  };

  const handleDoubleClick = (messageId, message) => {
    setEditedMessageId(messageId);
    setEditedMessage(message);
    setShowOptions(true);
    setSelectedNoteId(messageId);
  };

  const handleEditNote = async () => {
    try {
      await axios.put(`http://localhost:8086/note/${selectedNoteId}`, { message: editedMessage }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedNotes = notes.map(note => {
        if (note.id === selectedNoteId) {
          return { ...note, message: editedMessage };
        }
        return note;
      });
      setNotes(updatedNotes);
      setOriginalNotes(updatedNotes);
      setEditedMessageId(null);
      setEditedMessage('');
      setShowOptions(false);
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const handleDeleteNote = async () => {
    try {
      await axios.delete(`http://localhost:8086/note/${selectedNoteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedNotes = notes.filter(note => note.id !== selectedNoteId);
      setNotes(updatedNotes);
      setOriginalNotes(updatedNotes);
      setShowOptions(false);
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <div>
      <h2>Note Chat</h2>
      <div>
        {notes.map(note => (
          <div key={note.id} onDoubleClick={() => handleDoubleClick(note.id, note.message)}>
            {editedMessageId === note.id ? (
              <input type="text" value={editedMessage} onChange={(e) => setEditedMessage(e.target.value)} />
            ) : (
              <span>{note.message}</span>
            )}
          </div>
        ))}
      </div>
      <input type="text" value={newNote} onChange={(e) => setNewNote(e.target.value)} />
      <button onClick={handleSendNote}>Send Note</button>
      {showOptions && (
        <>
          <button onClick={handleEditNote}>Edit</button>
          <button onClick={handleDeleteNote}>Delete</button>
        </>
      )}
    </div>
  );
}

export default NoteChat;
