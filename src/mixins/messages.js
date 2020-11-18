const showMessage = {
  methods: {
    showSimpleMessage(text, status) {
      this.flashMessage.show({
        title: text,
        wrapperClass: `msg alert-${status}`,
      });
    },
  },
};

export default showMessage;
