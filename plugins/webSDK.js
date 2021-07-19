import firebase from 'firebase'
import { Client } from '@persona/infra/web-sdk'

const firebaseConfig = {
  apiKey: 'AIzaSyBY4fEX_2U8NXMRWvj0o7a7wfXDnuepTPQ',
  authDomain: 'project-persona-553ab.firebaseapp.com',
  projectId: 'project-persona-553ab',
  storageBucket: 'project-persona-553ab.appspot.com',
  messagingSenderId: '580192136806',
  appId: '1:580192136806:web:851f6a836be87e3a4287a7'
}

export default {

  install (Vue, options) {
    // create a mixin
    Vue.prototype.$fireApp = firebase.initializeApp(firebaseConfig)
    Vue.prototype.$client = Client.create(Vue.prototype.$fireApp)

    Vue.prototype.$accountLogin = async function (email, password) {
      let response
      try {
        response = await firebase.app().auth().loginWithEmailPassword(email, password)
      } catch (err) {
        return err
      }
      return response
    }

    Vue.prototype.$accountSignup = async function (email, password) {
      let response
      try {
        response = await firebase.app().auth().createUserWithEmailAndPassword(email, password)
      } catch (err) {
        return err
      }
      return response
    }
  }
}
