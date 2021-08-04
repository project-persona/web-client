import Vue from 'vue'
import firebase from 'firebase'

Vue.use({
  install (Vue, options) {
    Vue.prototype.$fireApp = firebase.initializeApp({
      apiKey: 'AIzaSyBY4fEX_2U8NXMRWvj0o7a7wfXDnuepTPQ',
      authDomain: 'project-persona-553ab.firebaseapp.com',
      projectId: 'project-persona-553ab',
      storageBucket: 'project-persona-553ab.appspot.com',
      messagingSenderId: '580192136806',
      appId: '1:580192136806:web:851f6a836be87e3a4287a7'
    })

    Vue.prototype.$fireApp.ensureLoggedIn = async () => {
      if (Vue.prototype.$fireApp.auth().currentUser) {
        return true
      }

      return !!await new Promise((resolve) => {
        Vue.prototype.$fireApp.auth().onAuthStateChanged(resolve)
        setTimeout(() => resolve(null), 3000) // treat as not logged in if user not obtained in 3 seconds
      })
    }
  }
})
