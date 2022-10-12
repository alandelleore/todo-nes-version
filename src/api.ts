import type { Note } from "./types";

const api = {
    notes: {
      list: (): Note[] => {
        try {
          const notes =  JSON.parse(localStorage.getItem('todos') || '[]')

          return notes
        } catch (error) {
          return []
        }
      },
      set: (notes: Note[]) => {
        localStorage.setItem('todos', JSON.stringify(notes))
      }
    },
  };

  export default api