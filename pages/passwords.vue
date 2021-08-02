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
              <v-toolbar-title>Add a new password</v-toolbar-title>
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
              ref="formAdd"
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
export default {
  layout: 'dashboard',
  data () {
    return {
      dialog: false,
      dialogEdit: false,
      passwordEdit: '',
      pwList: [],
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
    },
    disableEdit () {
      if (this.password !== '') {
        return false
      } else { return true }
    }
  },
  async created () {
    this.pwList = await this.$client.passwords.list(this.$currentID.value)
    for (let i = 0; i < this.pwList.length; i++) {
      this.pwList[i].show = false
    }
    this.overlay = false
  },
  methods: {
    create () {
      // await
      this.pwList.push({ site: this.pwData.site, password: this.pwData.password })
      this.dialog = false
      for (let i = 0; i < this.pwList.length; i++) {
        this.pwList[i].show = false
      }
      this.resetAdd()
      // console.log(pwList)
    },
    resetAdd () {
      this.$refs.formAdd.reset()
    },
    resetEdit (pw) {
      pw.passwordEdit = ''
    },
    cancel () {
      this.dialog = false
      this.resetAdd()
    },
    cancelEdit () {
      this.dialogEdit = false
      // this.resetEdit()
    },
    edit (pw) {
      for (let i = 0; i < this.pwList.length; i++) {
        if (this.pwList[i].site === pw.site) {
          this.pwList[i].password = this.passwordEdit
        }
      }
      // await
    },
    deletePw () {
      //
      // await
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
