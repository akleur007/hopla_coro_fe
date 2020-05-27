<template>
  <div>
    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
      <div class="menubar">
        <button
          class="btn btn-primary m-1"
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
        >
          <b-icon-type-bold></b-icon-type-bold>
        </button>
        <button
          class="btn btn-primary m-1"
          :class="{ 'is-active': isActive.italic() }"
          @click="commands.italic"
        >
          <b-icon-type-italic></b-icon-type-italic>
        </button>
        <button
          class="btn btn-primary m-1"
          :class="{ 'is-active': isActive.heading({ level: 1 }) }"
          @click="commands.heading({ level: 1 })"
        >
          <b-icon-type-h1></b-icon-type-h1>
        </button>

        <button
          class="btn btn-primary m-1"
          :class="{ 'is-active': isActive.heading({ level: 2 }) }"
          @click="commands.heading({ level: 2 })"
        >
          <b-icon-type-h2></b-icon-type-h2>
        </button>

        <button
          class="btn btn-primary m-1"
          :class="{ 'is-active': isActive.heading({ level: 3 }) }"
          @click="commands.heading({ level: 3 })"
        >
          <b-icon-type-h3></b-icon-type-h3>
        </button>
        Platzhalter für Namen => <strong>##name##</strong>
      </div>
    </editor-menu-bar>
    <editor-content :editor="editor" class="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap';
import { Bold, Italic, Link, HardBreak, Heading } from 'tiptap-extensions';
import {
  BIconTypeBold,
  BIconTypeItalic,
  BIconTypeH1,
  BIconTypeH2,
  BIconTypeH3,
} from 'bootstrap-vue';

export default {
  name: 'TextEditor',
  components: {
    EditorContent,
    EditorMenuBar,
    BIconTypeBold,
    BIconTypeItalic,
    BIconTypeH1,
    BIconTypeH2,
    BIconTypeH3,
  },
  data() {
    return {
      editor: null,
      html: '',
    };
  },
  mounted() {
    this.editor = new Editor({
      extensions: [
        new Bold(),
        new Italic(),
        new Link(),
        new HardBreak(),
        new Heading({
          levels: [1, 2, 3],
        }),
      ],
      onUpdate: ({ getHTML }) => {
        this.html = getHTML();
        this.$emit('getHtml', this.html);
      },
    });
  },
  beforeDestroy() {
    this.editor.destroy();
  },
};
</script>

<style scoped lang="scss"></style>
