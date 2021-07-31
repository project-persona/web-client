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
            <td>{{ pw.site.toUpperCase() }}</td>
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
                @click="edit"
              >
                Edit
              </v-btn>
              <v-btn
                text
                outlined
                class="icon"
                @click="deletePw"
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
              <v-toolbar-title>Settings</v-toolbar-title>
              <v-spacer />
              <v-toolbar-items>
                <v-btn
                  dark
                  text
                  bottom
                  :disabled="disable"
                  @click="create"
                >
                  Save
                </v-btn>
              </v-toolbar-items>
            </v-toolbar>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
            >
              <v-text-field
                v-model="pwData.site"
                label="Site"
                :rules="[v => !!v || 'Site name is required']"
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
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
const pwList = [
  { site: 'Facebook', password: '123456' },
  { site: 'Google', password: '2453454' }
]
for (let i = 0; i < pwList.length; i++) {
  pwList[i].show = false
}
export default {
  layout: 'dashboard',
  data () {
    return {
      dialog: false,
      pwList,
      pwData: {
        site: '',
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
  methods: {
    create () {
      this.reset()
      // await
      this.pwList.push({ site: this.pwData.site, password: this.pwData.password })
      this.dialog = false
      for (let i = 0; i < pwList.length; i++) {
        pwList[i].show = false
      }
      // console.log(pwList)
    },
    reset () {
      this.$refs.form.reset()
    },
    cancel () {
      this.dialog = false
      this.reset()
    },
    edit () {
      //
    },
    deletePw () {
      //
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
