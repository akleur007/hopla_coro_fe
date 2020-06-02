import ApiService from './apiService';

export class AuthenticationError extends Error {
  constructor(errorCode, message) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errorCode = errorCode;
  }
}

const NoteService = {
  async getNoteList() {
    return ApiService.get('notes');
  },
  async addNote(params) {
    return ApiService.post('notes', params);
  },
  async getNote(id) {
    return ApiService.get(`notes/${id}`);
  },
  async updateNote(params) {
    return ApiService.put(`notes/${params.id}`, params);
  },
  async deleteNote(id) {
    return ApiService.delete(`notes/${id}`);
  },
};

export default NoteService;
