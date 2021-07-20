<template>
  <v-row>
    <v-col>
      <div class="pagetitle">
        <span>Personas</span>
      </div>
      <v-list>
        <v-list-item
          v-for="(persona, p) in personas"
          :key="p"
          router
          exact
          @click="toMailbox"
        >
          <v-list-item-avatar>
            <v-icon>mdi-account</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-text="persona.name" />
            <v-list-item-subtitle v-text="persona.email" />
          </v-list-item-content>
          <v-list-item-icon>
            <v-badge
              :content="mail"
              :value="mail"
              overlap
            >
              <v-icon>mdi-email</v-icon>
            </v-badge>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
      <p v-if="personas.length" class="bottom-text">
        Select an existing persona, or create a new persona.
      </p>
      <p v-else class="bottom-text">
        Create your first persona.
      </p>
      <v-row justify="center">
        <v-dialog
          v-model="dialog"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
          class="text-center"
        >
          <template
            #activator="{ on, attrs }"
          >
            <v-btn
              v-bind="attrs"
              v-on="on"
            >
              Create New
            </v-btn>
          </template>
          <v-card>
            <v-toolbar elevation="0">
              <v-btn
                icon
                @click="dialog = false"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>Persona information</v-toolbar-title>
              <v-spacer />
              <v-toolbar-items>
                <v-btn
                  text
                  :disabled="isDisable"
                  @click="createPersona"
                >
                  Create
                </v-btn>
              </v-toolbar-items>
            </v-toolbar>
            <v-form ref="form" class="form">
              <v-container>
                <v-row dense>
                  <v-col>
                    <v-text-field
                      v-model="info.firstName"
                      label="First name"
                      dense
                      outlined
                      clearable
                    />
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="info.lastName"
                      label="Last name"
                      dense
                      outlined
                      clearable
                    />
                  </v-col>
                </v-row>
                <v-row dense>
                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-select
                      v-model="select"
                      :items="gender"
                      label="Gender"
                      dense
                      outlined
                      clearable
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template #activator="{ on, attrs }">
                        <v-text-field
                          v-model="date"
                          label="Birthdate"
                          readonly
                          v-bind="attrs"
                          dense
                          outlined
                          clearable
                          v-on="on"
                        />
                      </template>
                      <v-date-picker
                        v-model="date"
                        :active-picker.sync="activePicker"
                        :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                        min="1950-01-01"
                        @change="save"
                      />
                    </v-menu>
                  </v-col>
                </v-row>
                <v-row dense>
                  <v-col
                    cols="12"
                  >
                    <v-text-field
                      v-model="info.address.line1"
                      label="Address Line 1"
                      dense
                      outlined
                      clearable
                    />
                  </v-col>
                  <v-col
                    cols="12"
                  >
                    <v-text-field
                      v-model="info.address.line2"
                      label="Address Line 2"
                      dense
                      outlined
                      clearable
                    />
                  </v-col>
                </v-row>
                <v-row dense>
                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-text-field
                      v-model="info.address.country"
                      label="Country"
                      dense
                      outlined
                      clearable
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-text-field
                      v-model="info.address.state"
                      label="State/Province"
                      dense
                      outlined
                      clearable
                    />
                  </v-col>
                </v-row>
                <v-row dense>
                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-text-field
                      v-model="info.address.city"
                      label="City"
                      dense
                      outlined
                      clearable
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-text-field
                      v-model="info.address.zipCode"
                      label="Zip code"
                      dense
                      outlined
                      clearable
                    />
                  </v-col>
                </v-row>
                <v-row dense>
                  <v-col
                    cols="8"
                  >
                    <v-text-field
                      v-model="info.email"
                      label="Email"
                      hint="This cannot be changed later!"
                      dense
                      outlined
                      clearable
                    />
                  </v-col>
                  <v-col class="email-tail">
                    <h4>@persona.tk</h4>
                  </v-col>
                </v-row>
                <v-row dense>
                  <v-col
                    cols="2"
                  >
                    <v-btn
                      text
                      outlined
                      @click="autoForm"
                    >
                      Autofill
                    </v-btn>
                  </v-col>
                  <v-col
                    cols="2"
                  >
                    <v-btn
                      text
                      @click="reset"
                    >
                      Clear
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
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
      // personas: [
      //   {
      //     name: 'Lucy',
      //     email: 'lucyzhong@sfu.ca'
      //   },
      //   {
      //     name: 'Abby',
      //     email: 'abby@sfu.ca'
      //   },
      //   {
      //     name: 'Cole',
      //     email: 'cole@sfu.ca'
      //   }
      // ],
      info: {
        firstName: '',
        lastName: '',
        address: {
          line1: '',
          line2: '',
          country: '',
          state: '',
          city: '',
          zipCode: ''
        },
        email: ''
      },
      dialog: false,
      activePicker: null,
      menu: false,
      select: null,
      gender: [
        'Male',
        'Female',
        'Non-Binary'
      ],
      date: null,
      mail: 3
    }
  },
  computed: {
    isDisable () {
      let result = false
      for (const item in this.info) {
        if (!this.info[item]) {
          result = true
        }
      }
      return result
    },
    personas () {
      const personas = this.getPersonaList()
      console.log(personas)
      return personas
    }
  },
  watch: {
    menu (val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    }
  },
  methods: {
    async getPersonaList () {
      await this.$client.personas.list()
    },
    toMailbox () {
      this.$router.push('/mailbox')
    },
    save (date) {
      this.$refs.menu.save(date)
    },
    reset () {
      this.$refs.form.reset()
    },
    autoForm () {
      for (const item in this.info) {
        if (this.info[item] === this.info.address) {
          for (const addr in this.info.address) {
            if (!this.info.address[addr]) {
              this.info.address[addr] = 'Filled'
            }
          }
        }
        if (!this.info[item]) {
          this.info[item] = 'Filled'
        }
      }
      if (!this.select) {
        this.select = this.gender[0]
      }
      if (!this.date) {
        this.date = new Date(Date.now()).toISOString().substr(0, 10)
      }
    },
    async createPersona () {
      // this.personas.push({ name: this.info.firstName, email: this.info.email + '@persona.tk' })
      await this.$client.create(this.info)
      this.reset()
      this.dialog = false
    }
  }
}
</script>
<style scoped>
.pagetitle {
  font-size: 3rem;
  font-weight: bold;
}
.bottom-text {
  text-align: center;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.form {
  padding-top: 3rem;
  padding-bottom: 3rem;
}
.email-tail {
  align-self: center;
  padding-bottom: 2rem;
}
</style>
