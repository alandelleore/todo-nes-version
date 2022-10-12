import { useEffect, useMemo, useState } from "react";

import type { Note } from "./types";

import api from "./api";
import NoteCard from "./components/NoteCard";
import NoteModal from "./components/NoteModal";

function App() {
 const [notes, setNotes] = useState<Note[]>(() => api.notes.list())
 const [draft, setDraft] = useState<null | Partial<Note>>(null)
 const [view, setView] = useState<'active' | 'archived'>('active')
 const matches = useMemo(() => {
  return notes.filter(notes => {
    if (view === 'active') {
      return !notes.archived;
    } else if (view === 'archived') {
      return notes.archived;
    }
  })
 }, [notes, view])



 function handleDelete(id: Note['id']) {
  setNotes(notes => notes.filter(note => note.id !== id))
 }

 function handleEdit(note: Note) {
    setDraft(note);
 }

 function handleArchive(id: Note['id']) {
  setNotes((notes) => 
    notes.map((note) => {
      if (note.id !== id) return note;
      return {
        ...note,
        archived: !note.archived,
      }
    }),
  );
 }

function handleDraftChange(field: string, value: string) {
  setDraft(draft => ({
    ...draft,
    [field]: value
  }))
}

function handleSave() {
  if(draft?.id) {
    setNotes((notes) => 
    notes.map((note) => {
      if (note.id !== draft.id) return note;
      return {
        ...draft, 
        lastEdited: new Date().toString()
      } as Note
    }),
  );
 
  } else {
    setNotes(notes => notes.concat({
      id: String(+new Date()),
      lastEdited: new Date().toString(),
      ...(draft as Omit<Note, 'id' | 'lastEdited'>),
    }))
  }

  setDraft(null);
}

useEffect(() => {
  api.notes.set(notes);
}, [notes])

  return (
    <main>
      <div style={{marginBottom: 24}}>
      <h1>Mis notas</h1>
      <div style={{display: 'flex', gap: 24}}>
        <button className="nes-btn" onClick={() => setDraft({})}>Crear nota</button>
        <button className="nes-btn" onClick={() => setView(view => view === 'active' ? 'archived' : 'active')}>{view === 'active' ? 'Ver archivadas' : 'Ver activas'}</button>
      </div>
      
      </div>
      <div style={{display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fill, minmax(480px, 1fr))'}}>
      {matches.length ? matches.map((note) => (
        <NoteCard  key={note.id} note={note} onArchive={handleArchive} onEdit={handleEdit} onDelete={handleDelete}/>
      )) : <p>No hay notas</p>}
      </div>
      {draft && <NoteModal onSave={handleSave} onChange={handleDraftChange} note={draft} onClose={() => setDraft(null)} />}
    </main>
  )
}

export default App
