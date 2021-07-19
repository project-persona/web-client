<template>
  <v-row id="list" justify="center">
    <v-expansion-panels inset>
      <v-expansion-panel
        v-for="mail in mailList"
        :key="mail"
      >
        <v-expansion-panel-header>{{ mail.id }}</v-expansion-panel-header>
        <v-expansion-panel-content>
          {{ mail.text }}
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-row>
</template>
<script>
export default {
  layout: 'dashboard',
  data () {
    return {
      mailList: [
        { id: '0', text: 'Vegetables' },
        { id: '1', text: 'Cheese' },
        { id: '2', text: 'Whatever else humans are supposed to eat' }
      ]
    }
  }
}
</script>
