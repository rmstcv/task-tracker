const taskComponent = { 
  props: ['column', 'notes', 'dragClass'],
  emits: ['removeNoteEvent','addNodeEvent', 'startDragEvent', 'dropEvent'],
  data() {
    return {
      inputValue: '',
    }
  },
  methods: {
    inputChange(event) {
      this.inputValue = event.target.value;
    },
    validateInput(event) {
       if (event.target.value.length >= 15) {
        event.preventDefault();
      }
    },
    addNote() {
      if (this.inputValue !== '') {
        this.$emit('addNodeEvent', this.inputValue, this.column);
        this.inputValue = '';
      }
    },
    enterDragEvent(evt) {
      evt.target.classList.add('activeItem');
    },
    leaveDragEvent(evt) {
      evt.target.classList.remove('activeItem');
    }
  },
  template: 
  `
    <div class="column"
      @drop="$emit('dropEvent', column, $event, index)"
      @dragover.prevent
      @dragenter.prevent
    >
      <div class="column__head">
        <input
          type="text" 
          placeholder="enter note"
          :value="inputValue"
          @input="inputChange" 
          @keypress.enter="addNote"
          @keypress="validateInput"
        >
        <button @click="addNote">add note</button>
      </div>
      <ul>
        <li
          v-for="(note, index) in notes"
        >
          <div 
            class="content"
            :class="dragClass"
            draggable="true"
            @drop="leaveDragEvent($event), $emit('dropEvent', column, $event, index)"
            @dragover.prevent
            @dragenter.prevent
            @dragstart="$emit('startDragEvent', index, column, $event)"
            @dragenter="enterDragEvent($event)"
            @dragleave="leaveDragEvent($event)"
          >{{ note }}</div>
          <button @click="$emit('removeNoteEvent', index, column)">remove</button>
        </li>
      </ul>
    </div>
  `
}

export default taskComponent;