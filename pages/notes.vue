<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-text-field
            v-model="titleToSaved"
            label="Title"
            class="mx-3"
          />
          <v-textarea
            v-model="toSaved"
            solo
            name="noteInput"
            label="Take a note"
          />
          <v-card-actions>
            <v-spacer />
            <v-btn
              text
              @click="saveNewNote"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-container>
      <v-row>
        <v-col
          v-for="note in notes"
          :key="note.title"
        >
          <v-card>
            <v-card-title v-text="note.title" />
            <v-card-text v-text="note.content" />
            <v-card-actions>
              <v-spacer />
              <v-btn
                icon
                @click="editNote(note._id)"
              >
                <v-icon>
                  mdi-file-edit
                </v-icon>
              </v-btn>
              <v-btn
                icon
                @click="deleteNote(note._id)"
              >
                <v-icon>
                  mdi-delete
                </v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-dialog
        v-model="dialog"
        width="1000"
      >
        <v-card>
          <v-card-title>
            Edit Note
          </v-card-title>

          <v-text-field
            v-model="titleToEdit"
            label="Title"
            class="mx-3"
          />
          <v-textarea
            v-model="contentToEdit"
            solo
            name="noteInput"
            label="Take a note"
          />

          <v-divider />

          <v-card-actions>
            <v-spacer />
            <v-btn
              color="primary"
              text
              @click="onEditFormSubmit"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
    <v-snackbar
      v-model="snackbar"
      :multi-line="true"
    >
      {{ snackbarMsg }}

      <template #action="{ attrs }">
        <v-btn
          color="warning"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-overlay :value="overlay" :absolute="true">
      <v-progress-circular
        indeterminate
        color="amber"
      />
    </v-overlay>
  </v-container>
</template>
<script>
export default {
  layout: 'dashboard',
  data () {
    return {
      overlay: true,
      notes: [],
      toSaved: '',
      titleToSaved: '',
      snackbar: false,
      snackbarMsg: '',
      dialog: false,
      titleToEdit: '',
      contentToEdit: '',
      currentNoteID: ''
    }
  },
  async created () {
    this.notes = await this.$client.notes.list(this.$currentID.value)
    this.overlay = false
  },
  methods: {
    async saveNewNote () {
      this.overlay = true
      try {
        await this.$client.notes.create(this.$currentID.value, { title: this.titleToSaved, content: this.toSaved })
        this.notes = await this.$client.notes.list(this.$currentID.value)
        this.snackbarMsg = 'Success!'
        this.snackbar = true
      } catch (error) {
        this.overlay = false
        this.snackbarMsg = error
        this.snackbar = true
      }
      this.overlay = false
    },
    async deleteNote (id) {
      this.overlay = true
      try {
        await this.$client.notes.delete(id)
        this.notes = await this.$client.notes.list(this.$currentID.value)
        this.snackbarMsg = 'Deleted'
        this.snackbar = true
      } catch (error) {
        this.overlay = false
        this.snackbarMsg = error
        this.snackbar = true
      }
      this.overlay = false
    },
    editNote (id) {
      const targetNote = this.notes.find((item) => {
        return item._id === id
      })
      this.titleToEdit = targetNote.title
      this.contentToEdit = targetNote.content
      this.currentNoteID = targetNote._id
      this.dialog = true
    },
    async onEditFormSubmit () {
      this.overlay = true
      try {
        await this.$client.notes.edit(this.currentNoteID, { title: this.titleToEdit, content: this.contentToEdit })
        this.notes = await this.$client.notes.list(this.$currentID.value)
        this.snackbarMsg = 'Success!'
        this.snackbar = true
      } catch (error) {
        this.overlay = false
        this.snackbarMsg = error
        this.snackbar = true
      }
      this.dialog = false
      this.overlay = false
    }
  }
}
</script>
