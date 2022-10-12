import type { Note } from "../types";


type Props = {
    note: Note;
    onArchive: (id: Note['id']) => void;
    onDelete: (id: Note['id']) => void;
    onEdit: (note: Note) => void;
  }



export default function NoteCard({note, onArchive, onEdit, onDelete}: Props) {
    return (
      <div className="nes-container" data-testid={`note-${note.id}`}>
        <div>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <p>Las edited: {note.lastEdited}</p>
          <div style={{display: "flex", gap: 12}}>
            <button className="nes-btn" onClick={() => onArchive(note.id)}>Archivar</button> 
            <button className="nes-btn" onClick={() => onEdit(note)}>Editar</button> 
            <button className="nes-btn" data-testid="delete" onClick={() => onDelete(note.id)}>Borrar</button>
          </div>
        </div>
      </div>
    );
  }