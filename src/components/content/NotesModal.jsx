import React, { useState, useEffect } from "react";
import axios from "axios";
import "./NoteChat.css";

function NotesModal({ showModal, toggleModal }) {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [editedNoteId, setEditedNoteId] = useState(null);
  const [editedNote, setEditedNote] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const token = localStorage.getItem("jwtToken");

  const fetchNotes = async () => {
    try {
      const response = await axios.get("http://localhost:8086/note", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSendNote = async () => {
    try {
      await axios.post(
        "http://localhost:8086/note",
        { message: newNote },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchNotes();
      setNewNote("");
    } catch (error) {
      console.error("Error sending note:", error);
    }
  };

  const handleEditNote = async () => {
    try {
      await axios.put(
        `http://localhost:8086/note/${selectedNoteId}`,
        { message: editedNote },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedNotes = notes.map((note) => {
        if (note.id === selectedNoteId) {
          return { ...note, message: editedNote };
        }
        return note;
      });
      setNotes(updatedNotes);
      setShowOptions(false);
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const handleDeleteNote = async () => {
    try {
      await axios.delete(`http://localhost:8086/note/${selectedNoteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedNotes = notes.filter((note) => note.id !== selectedNoteId);
      setNotes(updatedNotes);
      setShowOptions(false);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const startEditingNote = (noteId, noteMessage) => {
    setEditedNoteId(noteId);
    setEditedNote(noteMessage);
    setShowOptions(true);
    setSelectedNoteId(noteId);
  };

  return (
    <div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={toggleModal}>
              &times;
            </span>
            <h2 id="titleNotesda">Заметки</h2>
            <div>
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="note"
                  onDoubleClick={() => startEditingNote(note.id, note.message)}
                >
                  {editedNoteId === note.id ? (
                    <input
                      type="text"
                      value={editedNote}
                      onChange={(e) => setEditedNote(e.target.value)}
                    />
                  ) : (
                    <span>{note.message}</span>
                  )}
                </div>
              ))}
            </div>
            <div className="note-input">
              <input
                type="text"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
              />
              <button onClick={handleSendNote}>Отправить заметку</button>
            </div>
            {showOptions && (
              <div className="note-options">
                <button onClick={handleEditNote}>Сохранить изменения</button>
                <button onClick={handleDeleteNote}>Удалить заметку</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default NotesModal;
