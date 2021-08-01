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
            <v-list-item-title v-text="persona.firstName + ' ' + persona.lastName" />
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
            <v-form ref="form" class="form" @submit.prevent="submit">
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
                      label="Postal Code"
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
                    <h4>@mypersona.tk</h4>
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
function Persona (lastName, firstName, birthday, gender, email, address) {
  this.lastName = lastName
  this.firstName = firstName
  this.birthday = birthday
  this.gender = gender
  this.email = email
  this.address = address
}
export default {
  layout: 'dashboard',
  data () {
    return {
      overlay: true,
      snackbar: false,
      snackbarMsg: '',
      personas: [],
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
    }
    // personas () {
    //   const personas = this.getPersonaList()
    //   return personas
    // }
  },
  watch: {
    menu (val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    }
  },
  async created () {
    this.personas = await this.$client.personas.list()
    this.overlay = false
  },
  methods: {
    // async getPersonaList () {
    //   await this.$client.personas.list()
    // },
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
      if (!this.info.firstName) {
        this.info.firstName = this.$faker.name.firstName()
      }
      if (!this.info.lastName) {
        this.info.lastName = this.$faker.name.lastName()
      }
      if (!this.info.address.line1) {
        this.info.address.line1 = this.$faker.address.streetAddress()
      }
      if (!this.info.address.line2) {
        this.info.address.line2 = this.$faker.address.secondaryAddress()
      }
      if (!this.info.address.state) {
        this.info.address.state = this.$faker.address.state()
      }
      if (!this.info.address.zipCode) {
        this.info.address.zipCode = this.$faker.address.zipCode()
      }
      if (!this.info.address.city) {
        this.info.address.city = this.$faker.address.city()
      }
      if (!this.info.address.country) {
        this.info.address.country = 'Canada'
      }
      if (!this.info.email) {
        this.info.email = this.$faker.lorem.word() + this.$faker.lorem.word()
      }
      if (!this.select) {
        this.select = this.gender[Math.floor(Math.random() * 3)]
      }
      if (!this.date) {
        this.date = this.$faker.date.between(new Date(1950, 0, 0, 0, 0, 0, 0), new Date(2000, 0, 0, 0, 0, 0, 0)).toISOString().substr(0, 10)
      }
    },
    async createPersona () {
      const newPersona = new Persona(this.info.lastName, this.info.firstName, this.date, this.select, this.info.email + '@mypersona.tk', this.info.address)
      try {
        const res = await this.$client.personas.create(newPersona)
        this.personas.push(res)
      } catch (error) {
        this.snackbarMsg = error
        this.snackbar = true
      }
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
