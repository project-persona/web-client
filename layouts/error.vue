<template>
  <v-app dark>
    <h1 v-if="error.statusCode === 404">
      {{ pageNotFound }}
    </h1>
    <h1 v-else>
      {{ otherError }}
      <p class="error-message">
        {{ error.message }}
      </p>
    </h1>
    <NuxtLink to="/">
      Home page
    </NuxtLink>
    <a @click.stop="$router.go(0)">
      Refresh
    </a>
    <a @click.stop="clearSession(); $router.push('/')">
      Sign In
    </a>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error has occurred'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  },
  methods: {
    clearSession () {
      window.sessionStorage.clear()
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}

.error-message {
  font-size: 16px;
  font-weight: normal;
}
</style>
