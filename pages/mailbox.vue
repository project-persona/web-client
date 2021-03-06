<template>
  <v-row id="list" justify="center">
    <v-col>
      <div class="pagetitle">
        <span>Emails</span>
      </div>
      <div>
        <span>Your email address: <strong>{{ persona ? persona.email : 'loading...' }}</strong></span>
      </div>
    </v-col>
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
            @click="read(mail._id)"
          >
            <v-col
              cols="1"
            >
              <v-avatar
                size="42px"
                color="indigo"
              >
                <span v-if="mail.from[0].name" class="white--text text-h5">
                  {{ mail.from[0].name[0] + mail.from[0].name[1] }}
                </span>
                <v-icon v-else dark>
                  mdi-account-circle
                </v-icon>
              </v-avatar>
            </v-col>
            <v-col>
              <strong>{{ mail.subject }}</strong>
            </v-col>
            <v-col
              class="grey--text text-truncate"
            >
              {{ mail.date | durationFormat }}
            </v-col>
            <v-list-item-action>
              <v-btn icon class="icon" @click.stop="deleteEmail(mail._id)">
                <v-icon>
                  mdi-delete
                </v-icon>
              </v-btn>
            </v-list-item-action>
            <v-list-item-icon>
              <v-icon class="icon" :color="mail.read ? 'deep-purple accent-4' : 'grey'">
                mdi-message-outline
              </v-icon>
            </v-list-item-icon>
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <p><strong>From: </strong> {{
              mail.from.map(({
                address,
                name
              }) => name ? `${name} &lt;${address}&gt;` : address).join(', ')
            }}</p>
          <p><strong>To: </strong>{{
              mail.to.map(({
                address,
                name
              }) => name ? `${name} &lt;${address}&gt;` : address).join(', ')
            }}</p>
          <p><strong>Date: </strong>{{ mail.date | durationFormat }}</p>
          <p><strong>Subject: </strong>{{ mail.subject }}</p>
          <hr>
          <iframe :srcdoc="mail.content" sandbox width="100%" style="height: 500px; background: white"></iframe>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <p v-if="!mailList.length" class="bottom-text">
      No email received yet.
    </p>
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
</template>
<script>
export default {
  filters: {
    durationFormat (value) {
      if (value) {
        const dayPart = value.split('T')
        const hourPart = dayPart[1].substring(0, 8)
        return dayPart[0] + '  ' + hourPart
      } else {
        return 'unknown'
      }
    }
  },
  layout: 'dashboard',
  data () {
    return {
      dialog: false,
      overlay: true,
      snackbar: false,
      snackbarMsg: '',
      mailList: [],
      timeoutHandler: 0,
      persona: null
    }
  },
  async created () {
    if (!await this.$fireApp.ensureLoggedIn()) {
      return await this.$router.push('/')
    }

    if (!this.$currentID.value) {
      alert('Select a persona first')
      return await this.$router.push('/personas')
    }

    try {
      this.persona = await this.$client.personas.show(this.$currentID.value)
      this.mailList = await this.$client.emails.list(this.$currentID.value)
    } catch (error) {
      this.snackbarMsg = error.message
      this.snackbar = true
    }

    this.overlay = false

    const refresh = () => {
      this.timeoutHandler = setTimeout(() => {
        this.$client.emails.list(this.$currentID.value)
          .then((emails) => {
            this.mailList = emails
          })
          .finally(() => refresh())
      }, 5000)
    }

    refresh()
  },
  destroyed () {
    clearTimeout(this.timeoutHandler)
  },
  methods: {
    async read (id) {
      const email = this.mailList.find(email => email._id === id && !email.read)
      if (email) {
        await this.$client.emails.show(id)
        email.read = true
      }
    },
    async deleteEmail (id) {
      this.overlay = true
      try {
        await this.$client.emails.delete(id)
        this.mailList = await this.$client.emails.list(this.$currentID.value)
      } catch (error) {
        this.snackbarMsg = error.message
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
.pagetitle {
  font-size: 3rem;
  font-weight: bold;
}

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
