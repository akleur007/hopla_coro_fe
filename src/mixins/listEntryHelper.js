const listEntryMenuLogic = {
  data() {
    return {
      editable: false,
    };
  },
  methods: {
    deleteRequest(params) {
      this.$emit('add-delete-request', params);
    },
    toggleEditable() {
      this.editable = !this.editable;
    },
  },
};

export default listEntryMenuLogic;
