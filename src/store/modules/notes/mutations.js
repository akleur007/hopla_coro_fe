export const SET_NOTES = (state, notes) => {
  state.notes = notes;
};
export const CREATE_NOTE = (state, note) => [note, ...state.notes];

export const DELETE_NOTE = (state, id) => state.notes.filter((note) => note.id !== id);

export const UPDATE_NOTE = (state, updNote) => {
  const index = state.notes.findIndex((note) => note.id === updNote.id);
  if (index !== -1) {
    state.notes.splice(index, 1, updNote);
  }
};

export const NOTE_TOGGLE_SELECTION = (state, note) => {
  const isSelected = state.selectedNotes.find((item) => item.id === note.id);
  const index = state.selectedNotes.findIndex((item) => item.id === note.id);
  if (!isSelected) {
    state.selectedNotes.push(note);
  } else {
    state.selectedNotes.splice(index, 1);
  }
};

export const DESELECT_ALL_NOTES = (state) => {
  state.selectedNotes = [];
};
