import NoteService from '../../../services/noteService';

export const fetchNotes = async ({ commit }) => {
  const response = await NoteService.getNoteList();
  commit('SET_NOTES', response.data.data.items);
};

export const fetchNote = async ({ commit }, id) => {
  const response = await NoteService.getNote(id);
  commit('SET_ACTIVE_NOTE', response.data.data.resource);
};

export const addNote = async ({ commit }, params) => {
  const response = await NoteService.addNote(params);
  commit('CREATE_NOTE', response.data.data.resource);
};

export const updateNote = async ({ commit }, params) => {
  const response = await NoteService.updateNote(params);
  commit('UPDATE_NOTE', response.data.data.resource);
};

export const removeNote = async ({ commit }, id) => {
  const response = await NoteService.deleteNote(id);
  commit('DELETE_NOTE', response.data.data.resource);
};

export const noteToggleSelection = ({ commit }, note) => {
  commit('NOTE_TOGGLE_SELECTION', note);
};

export const deselectAllNotes = ({ commit }) => {
  commit('DESELECT_ALL_NOTES');
};
