const listEntryMenuLogic = {
  data() {
    return {
      editable: false,
    };
  },
  methods: {
    deleteRequest() {
      this.$emit('add-delete-request', this.entry.id);
    },
    toggleEditable() {
      this.editable = !this.editable;
    },
  },
};

export default listEntryMenuLogic;
