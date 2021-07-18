<template>
  <v-row>
    <v-col>
      <h1>Personas</h1>
      <v-card
        v-for="(persona, p) in personas"
        :key="p"
        shaped
        outlined
        class="card"
      >
        <v-card-title v-text="persona.name">
        </v-card-title>
        <v-card-subtitle v-text="persona.email">
        </v-card-subtitle>
      </v-card>
      <p v-if="personas.length">
        Select an existing persona, or create a new persona.
      </p>
      <p v-else>
        Create your first persona.
      </p>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Create New
        </v-btn>
      </template>
      <v-card>
        <v-toolbar>
          <v-btn
            icon
            dark
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Create a persona</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              text
              @click="dialog = false"
            >
              Create
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list
          three-line
          subheader
        >
          <v-subheader>User Controls</v-subheader>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Content filtering</v-list-item-title>
              <v-list-item-subtitle>Set the content filtering level to restrict apps that can be downloaded</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Password</v-list-item-title>
              <v-list-item-subtitle>Require password for purchase or use password to restrict purchase</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list
          three-line
          subheader
        >
          <v-subheader>General</v-subheader>
          <v-list-item>
            <v-list-item-action>
              <v-checkbox v-model="notifications"></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Notifications</v-list-item-title>
              <v-list-item-subtitle>Notify me about updates to apps or games that I downloaded</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-action>
              <v-checkbox v-model="sound"></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Sound</v-list-item-title>
              <v-list-item-subtitle>Auto-update apps at any time. Data charges may apply</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-action>
              <v-checkbox v-model="widgets"></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Auto-add widgets</v-list-item-title>
              <v-list-item-subtitle>Automatically add home screen widgets</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
    </v-col>
  </v-row>
</template>
<script>
export default {
  layout: 'dashboard',
  data () {
    return {
      personas: [
        {
          name: 'Lucy',
          email: 'lucyzhong@sfu.ca'
        },
        {
          name: 'Abby',
          email: 'abby@sfu.ca'
        },
        {
          name: 'Cole',
          email: 'cole@sfu.ca'
        }
      ],
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false
    }
  }
}
</script>
<style scoped>
.card {
  margin: 20px;
}
</style>
