export const allNotes = (state) => state.notes;
export const selectedNotes = (state) => state.selectedNotes;
export const getNoteById = (state) => (id) => {
  const item = state.notes.filter((note) => note.id === id);
  return item;
};
