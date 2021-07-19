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
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <p>FROM: {{ mail.from[0].address }}</p>
          <p>TO: {{ mail.to[0].address }}</p>
          <p>date: {{ mail.date }}</p>
          <p>subject: {{ mail.subject }}</p>
          <hr>
          <div class="content">
            {{ mail.content }}
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
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
const d = getNow()
export default {
  layout: 'dashboard',
  data () {
    return {
      mailList: [
        { from: [{ address: 'coleeeee@sfu.com', name: 'Abby' }], to: [{ address: 'abbbbby@sfu.com' }], date: d, subject: 'Event today', content: 'There is a wonderful basketball game on the indoor basketball court today' },
        { from: [{ address: 'coleeeee@sfu.com', name: 'Cole' }], to: [{ address: 'abbbbby@sfu.com' }], date: d, subject: 'Good news', content: 'Cheese has dropped in price!' },
        { from: [{ address: 'kennnnn@sfu.com' }], to: [{ address: 'abbbbby@sfu.com' }], date: d, subject: 'Important evet', content: 'Whatever else humans are supposed to eat' }
      ]
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
</style>
