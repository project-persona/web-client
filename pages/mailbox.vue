<template>
  <v-row id="list" justify="center">
    <v-expansion-panels inset>
      <v-expansion-panel
        v-for="mail in mailList"
        :key="mail.content"
        hide-actions
      >
        <v-expansion-panel-header>
          <v-row
            align="center"
            class="spacer"
            no-gutters
          >
            <v-col
              cols="1"
            >
              <v-avatar
                size="42px"
                color="indigo"
              >
                <span v-if="mail.from.name" class="white--text text-h5">
                  {{ mail.from.name[0] + mail.from.name[1] }}
                </span>
                <v-icon v-else dark>
                  mdi-account-circle
                </v-icon>
              </v-avatar>
            </v-col>
            <v-col
              cols="9"
            >
              <strong>{{ mail.subject }}</strong>
            </v-col>
            <v-col
              id="time"
              class="grey--text text-truncate hidden-sm-and-down"
            >
              {{ mail.date }}
            </v-col>
            <v-list-item-action>
              <v-btn icon class="icon" @click.stop="deleteEmail(email._id)">
                <v-icon>
                  mdi-delete
                </v-icon>
              </v-btn>
            </v-list-item-action>
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <p>FROM: {{ mail.from.address }}</p>
          <p>TO: {{ mail.to.address }}</p>
          <p>date: {{ mail.date }}</p>
          <p>subject: {{ mail.subject }}</p>
          <hr>
          <div class="content">
            {{ mail.content }}
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <p />
    <p />
    <v-row dense justify="center">
      <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <template #activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
          >
            Send an Email
          </v-btn>
        </template>
        <v-card>
          <v-toolbar
            dark
          >
            <v-btn
              icon
              dark
              @click="cancel"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Send an Email</v-toolbar-title>
            <v-spacer />
            <v-toolbar-items>
              <v-btn
                dark
                text
                bottom
                @click="create"
              >
                Save
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-form
            ref="form"
            lazy-validation
          >
            <v-container fluid>
              <v-row justify="center">
                <v-col cols="2">
                  <v-subheader>To:</v-subheader>
                </v-col>
                <v-col cols="9">
                  <v-text-field
                    label="Email Address"
                    outlined
                  />
                </v-col>
              </v-row>

              <v-row justify="center">
                <v-col cols="2">
                  <v-subheader>Subject:</v-subheader>
                </v-col>
                <v-col cols="9">
                  <v-text-field
                    label="Subject"
                    outlined
                  />
                </v-col>
              </v-row>

              <v-row justify="center">
                <v-col cols="11">
                  <v-textarea
                    label="Email Content:"
                    outlined
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card>
      </v-dialog>
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
    </v-row>
  </v-row>
</template>
<script>
function getNow () {
  const today = new Date()
  const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
  const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
  const dateTime = date + ' ' + time
  return dateTime
}
/*
function Email (from, to, subject, content) {
  this.from = from
  this.to = to
  this.date = getNow()
  this.subject = subject
  this.content = content
}
*/
const d = getNow()
export default {
  layout: 'dashboard',
  data () {
    return {
      dialog: false,
      overlay: true,
      snackbar: false,
      snackbarMsg: '',
      mailList: [
        { from: { address: 'coleeeee@sfu.com', name: 'Abby' }, to: { address: 'abbbbby@sfu.com' }, date: d, subject: 'Event today', content: 'There is a wonderful basketball game on the indoor basketball court today' },
        { from: { address: 'coleeeee@sfu.com', name: 'Cole' }, to: { address: 'abbbbby@sfu.com' }, date: d, subject: 'Good news', content: 'Cheese has dropped in price!' },
        { from: { address: 'kennnnn@sfu.com' }, to: { address: 'abbbbby@sfu.com' }, date: d, subject: 'Important evet', content: 'Whatever else humans are supposed to eat' }
      ]
    }
  },
  async created () {
    console.log('id: ' + this.$currentID.value)
    this.mailList = await this.$client.emails.list(this.$currentID)
    console.log('id: ')
    this.overlay = false
  },
  methods: {
    cancel () {
      this.dialog = false
      this.reset()
    },
    reset () {
      this.$refs.form.reset()
    },
    create () {
      // const email = new Email()
    },
    async deleteEmail (id) {
      this.overlay = true
      try {
        await this.$client.emails.delete(id)
        this.personas = await this.$client.emails.list()
      } catch (error) {
        this.snackbarMsg = 'An error occurred, please try again'
        this.snackbar = true
      }
      this.overlay = false
      this.snackbarMsg = 'Delete Successfully'
      this.snackbar = true
    }
  }
}
</script>
<style>
  .content {
    margin: 30px;
  }
  #time {
    float: right;
  }
  .icon {
    float: right;
    margin-left: 10px;
  }
</style>
