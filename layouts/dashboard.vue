<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      expand-on-hover
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
          @click="setPage(item)"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"/>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
      <v-toolbar-title v-text="username"/>
      <v-spacer/>
      <v-btn class="mr-4" icon @click.stop="logout()">
        <v-icon class="mx-1">
          mdi-logout-variant
        </v-icon>
        Logout
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt/>
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Home',
          to: '/personas'
        },
        {
          icon: 'mdi-email',
          title: 'Mailbox',
          to: '/mailbox'
        },
        {
          icon: 'mdi-account-key',
          title: 'Passwords',
          to: '/passwords'
        },
        {
          icon: 'mdi-note-text-outline',
          title: 'Notes',
          to: '/notes'
        }
      ],
      miniVariant: true,
      pageName: 'Home',
      persona: null
    }
  },
  computed: {
    username () {
      if (this.pageName === 'Home') {
        return 'Home'
      }

      this.updatePersona()

      if (!this.persona) {
        return 'loading... > ' + this.pageName
      }

      return this.persona.firstName + ' > ' + this.pageName
    }
  },
  created () {
    this.updatePersona()
  },
  methods: {
    updatePersona () {
      if (this.$currentID.value) {
        this.$client.personas.show(this.$currentID.value).then((persona) => {
          this.persona = persona
        }).catch(() => undefined) // noop
      }
    },
    setPage (item) {
      this.pageName = item.title
    },
    logout () {
      this.$fireApp.auth().signOut()
        .catch(error => alert(error.message))
        .finally(() => {
          this.$currentID.value = ''
          this.$router.push('/')
        })
    }
  }
}
</script>
