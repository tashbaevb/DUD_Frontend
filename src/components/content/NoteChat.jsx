import React, { useState, useEffect } from 'react';
import axios from 'axios';

function NoteChat() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [editedMessageId, setEditedMessageId] = useState(null);
  const [editedMessage, setEditedMessage] = useState('');
  const [originalNotes, setOriginalNotes] = useState([]); // Сохраняем оригинальный список заметок
  const token = localStorage.getItem('jwtToken');

  const fetchNotes = async () => {
    try {
      const response = await axios.get('http://localhost:8086/note', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes(response.data);
      setOriginalNotes(response.data); // Сохраняем оригинальный список заметок
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
  };

  const handleSaveEditedMessage = async () => {
    try {
      await axios.put(`http://localhost:8086/note/${editedMessageId}`, { message: editedMessage }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedNotes = notes.map(note => {
        if (note.id === editedMessageId) {
          return { ...note, message: editedMessage };
        }
        return note;
      });
      setNotes(updatedNotes);
      setOriginalNotes(updatedNotes); // Обновляем оригинальный список
      setEditedMessageId(null);
      setEditedMessage('');
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const handleCancelEdit = () => {
    setNotes(originalNotes); // Восстанавливаем оригинальный список при отмене редактирования
    setEditedMessageId(null);
    setEditedMessage('');
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
      {editedMessageId && (
        <>
          <button onClick={handleSaveEditedMessage}>Save Changes</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </>
      )}
    </div>
  );
}

export default NoteChat;
