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
          </v-card>
        </v-col>
      </v-row>
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
      snackbarMsg: ''
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
    }
  }
}
</script>
