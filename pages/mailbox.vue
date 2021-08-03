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
          <p>FROM: {{ mail.from[0].address }}</p>
          <p>TO: {{ mail.to[0].address }}</p>
          <p>date: {{ mail.date | durationFormat }}</p>
          <p>subject: {{ mail.subject }}</p>
          <hr>
          <div class="content" v-html="mail.content" />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
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
      mailList: []
    }
  },
  async created () {
    this.mailList = await this.$client.emails.list(this.$currentID.value)
    this.overlay = false
  },
  methods: {
    async read (id) {
      await this.$client.emails.show(id)
      this.mailList = await this.$client.emails.list(this.$currentID.value)
    },
    async deleteEmail (id) {
      this.overlay = true
      try {
        await this.$client.emails.delete(id)
        this.mailList = await this.$client.emails.list(this.$currentID.value)
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
