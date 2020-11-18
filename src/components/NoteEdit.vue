<template>
  <div class="container">
    <div class="row">
      <form class="ng-pristine" @submit="updateEntry()">
        <div class="form-group row justify-content-between">
          <div class="col-lg-7 col-sm-12 col-input">
            <label for="to-user">An:</label>
            <select name="to-user" v-model="note.toId" class="form-control">
              <option selected value="0">Alle</option>
              <option v-for="user in allUsers" :key="user.id" :value="user.id">{{
                user.username
              }}</option>
            </select>
          </div>
          <div class="col-lg-7 col-sm-12 col-input">
            <input type="text" v-model="note.text" class="form-control" />
          </div>
          <div class="col-lg-2 col-sm-12 col-input text-right">
            <button id="submit" type="submit" class="btn btn-primary">Speichern</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import showMessage from '../mixins/messages';

export default {
  name: 'NoteEdit',
  props: {
    note: Object,
  },
  data() {
    return {
      errors: [],
    };
  },
  computed: {
    ...mapGetters('users', ['allUsers']),
  },
  mounted() {},
  methods: {
    ...mapActions('notes', ['updateNote']),
    async updateEntry() {
      try {
        await this.updateNote(this.note);
        this.$emit('saved');
        this.showSimpleMessage('Note geändert', 'success');
      } catch (err) {
        this.errors.push(err);
        console.log(`Err: ${err.response.data.message}`);
        this.showSimpleMessage('Note konnte nicht geändert werden', 'warning');
      }
    },
  },
  mixins: [showMessage],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
