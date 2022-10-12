import type { Note } from "../types";


type Props = {
    note: Partial<Note>;
    onClose: VoidFunction;
    onChange: (field: string, value: string) => void;
    onSave: VoidFunction;
  }
  
  function NoteModal({onClose, note, onChange, onSave}: Props) {
    return (
  
    <section className="nes-dialog" id="dialog-default" style={{width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{position: 'absolute', backgroundColor: 'rgba(0,0,0,0.2', width: '100%', height: '100%'}} />
      <form method="dialog" style={{backgroundColor: 'white', zIndex: 1, padding: 12, border: '5px solid black'}}>
        <h1 className="title">Create / edit note</h1>
        <div className="nes-field">
          <label htmlfor="title">Title</label>
          <input onChange={(e) => onChange('title', e.target.value)} value={note.title} type="text" id="title" className="nes-input" />
        </div>
        <div className="nes-field">
          <label htmlfor="content">Content</label>
          <textarea onChange={(e) => onChange('content', e.target.value)} value={note.content} id="content" className="nes-textarea"></textarea>
        </div>
        <div style={{marginTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}} className="dialog-menu">
          <button className="nes-btn" onClick={onClose}>Close</button>
          <button className="nes-btn is-primary" onClick={onSave}>Save</button>
        </div>
      </form>
    </section>
    )
  }

  export default NoteModal;