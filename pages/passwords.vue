<template>
  <v-row>
    <v-col>
      <v-simple-table dark>
        <thead>
          <tr>
            <th id="th" class="text-center" width="33%">
              SITE
            </th>
            <th id="th" class="text-center" width="33%">
              PASSWORD
            </th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr v-for="pw in pwList" :key="pw.site" align="center">
            <td>{{ pw.name.toUpperCase() }}</td>
            <td class="text-center">
              {{ pw.show ? pw.password : '#######' }}
            </td>
            <td>
              <v-btn icon class="icon" @click="pw.show = !pw.show">
                <v-icon>
                  {{ pw.show ? 'mdi-eye' : 'mdi-eye-off' }}
                </v-icon>
              </v-btn>
              <v-btn
                text
                outlined
                class="icon"
                @click="editOn(pw._id)"
              >
                Edit
              </v-btn>
              <v-btn
                text
                outlined
                class="icon"
                @click="deletePw(pw._id)"
              >
                Delete
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
      <p />
      <v-row dense justify="center" margin="30px">
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
              @click="createOn"
            >
              Add a new passeord
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
              <v-toolbar-title>Add a new password</v-toolbar-title>
              <v-spacer />
              <v-toolbar-items>
                <v-btn
                  v-if="forCreate"
                  dark
                  text
                  bottom
                  :disabled="disable"
                  @click="create"
                >
                  Create
                </v-btn>
                <v-btn
                  v-if="forEdit"
                  dark
                  text
                  bottom
                  :disabled="disable"
                  @click="edit"
                >
                  Save
                </v-btn>
              </v-toolbar-items>
            </v-toolbar>
            <v-form
              ref="form"
              lazy-validation
            >
              <v-text-field
                v-model="pwData.site"
                label="Site"
                :rules="[v => !!v || 'Site name is required']"
                required
              />
              <v-text-field
                v-model="pwData.uri"
                label="URI"
                :rules="[v => !!v || 'Site URI is required']"
                required
              />
              <v-text-field
                v-model="pwData.userName"
                label="User Name"
                :rules="[v => !!v || 'User name is required']"
                required
              />
              <v-text-field
                v-model="pwData.password"
                :rules="[v => !!v || 'Password is required']"
                label="Password"
                required
              />
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
    </v-col>
  </v-row>
</template>
<script>
function Password (site, uri, userName, password) {
  this.name = site
  this.uri = uri
  this.username = userName
  this.password = password
}
export default {
  layout: 'dashboard',
  data () {
    return {
      dialog: false,
      overlay: true,
      snackbar: false,
      snackbarMsg: '',
      currentPass: '',
      pwList: [],
      pwData: {
        site: '',
        uri: '',
        userName: '',
        password: ''
      }
    }
  },
  computed: {
    disable () {
      if (this.pwData.site !== '' && this.pwData.password !== '') {
        return false
      } else { return true }
    }
  },
  async created () {
    this.pwList = await this.$client.passwords.list(this.$currentID.value)
    for (let i = 0; i < this.pwList.length; i++) {
      this.pwList[i].show = false
    }
    console.log(this.pwList)
    this.overlay = false
  },
  methods: {
    async create () {
      this.overlay = true
      const newPassword = new Password(this.pwData.site, this.pwData.uri, this.pwData.userName, this.pwData.password)
      try {
        const res = await this.$client.passwords.create(this.$currentID.value, newPassword)
        res.show = false
        this.pwList.push(res)
      } catch (error) {
        this.overlay = false
        this.snackbarMsg = error
        this.snackbar = true
      }
      this.overlay = false
      this.reset()
      this.dialog = false
    },
    reset () {
      this.$refs.form.reset()
    },
    cancel () {
      this.dialog = false
      this.reset()
    },
    editOn (id) {

    },
    createOn () {

    },
    edit () {
      // await
    },
    async deletePw (id) {
      this.overlay = true
      try {
        await this.$client.passwords.delete(id)
        this.pwList = await this.$client.passwords.list(this.$currentID.value)
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
  #th {
    font-size: 20px;
  }
  .icon {
    float: right;
    margin-left: 10px;
  }
</style>
