<template>
  <v-row>
    <v-col>
      <v-simple-table dark>
        <thead>
        <tr>
          <th class="table-header text-center" width="33%">
            SITE
          </th>
          <th class="table-header text-center" width="33%">
            PASSWORD
          </th>
          <th/>
        </tr>
        </thead>
        <tbody>
        <tr v-for="pw in pwList" :key="pw._id" align="center">
          <td>{{ pw.name }}</td>
          <td class="text-center">
            <template v-if="show.get(pw._id)">
              {{ pw.password }}
            </template>
            <template v-else>
              *******
            </template>
          </td>
          <td>
            <v-btn icon class="icon" @click.stop="toggleShow(pw._id)">
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
      <p/>
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
              Add a new password
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
              <v-toolbar-title
                v-if="forCreate"
              >
                Add a new password
              </v-toolbar-title>
              <v-toolbar-title
                v-else
              >
                Edit the Password
              </v-toolbar-title>
              <v-spacer/>
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
                  v-else
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
                v-model="pwData.name"
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
                v-model="pwData.username"
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
// function Password (site, uri, userName, password) {
//   this.name = site
//   this.uri = uri
//   this.username = userName
//   this.password = password
// }
export default {
  layout: 'dashboard',
  data () {
    return {
      forCreate: true,
      forEdit: false,
      dialog: false,
      overlay: true,
      snackbar: false,
      snackbarMsg: '',
      currentPass: '',
      pwList: [],
      pwData: {
        name: '',
        uri: '',
        username: '',
        password: ''
      },
      show: new Map()
    }
  },
  computed: {
    disable () {
      return !(this.pwData.name !== '' && this.pwData.password !== '' && this.pwData.uri !== '' && this.pwData.username !== '')
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

    this.pwList = await this.$client.passwords.list(this.$currentID.value)
    this.overlay = false
  },
  methods: {
    toggleShow (id) {
      this.show.set(id, !this.show.get(id))
      this.pwList.push(null)
      this.pwList.pop()
    },
    createOn () {
      this.forCreate = true
      this.forEdit = false
    },
    editOn (id) {
      this.forCreate = false
      this.forEdit = true
      this.currentPass = id
      const targetPass = this.pwList.find((item) => {
        return item._id === id
      })
      this.pwData.name = targetPass.name
      this.pwData.username = targetPass.username
      this.pwData.uri = targetPass.uri
      this.pwData.password = targetPass.password
      this.dialog = true
    },
    async create () {
      this.overlay = true
      try {
        const res = await this.$client.passwords.create(this.$currentID.value, this.pwData)
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
    async edit () {
      this.overlay = true
      try {
        const res = await this.$client.passwords.edit(this.currentPass, this.pwData)
        this.pwList = this.pwList.map(pw => pw._id === res._id ? res : pw)
      } catch (error) {
        this.snackbarMsg = error
        this.snackbar = true
      }
      this.overlay = false
      this.reset()
      this.dialog = false
    },
    async deletePw (id) {
      this.overlay = true
      try {
        await this.$client.passwords.delete(id)
        this.pwList = this.pwList.filter(pw => pw._id !== id)
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
.table-header {
  font-size: 20px;
}

.icon {
  float: right;
  margin-left: 10px;
}
</style>
