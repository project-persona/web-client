<template>
  <v-row>
    <v-col>
      <h1>Personas</h1>
      <v-card
        v-for="(persona, p) in personas"
        :key="p"
        shaped
        outlined
        class="card"
      >
        <v-card-title v-text="persona.name" />
        <v-card-subtitle v-text="persona.email" />
      </v-card>
      <p v-if="personas.length">
        Select an existing persona, or create a new persona.
      </p>
      <p v-else>
        Create your first persona.
      </p>
      <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <template #activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
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
                    v-model="info.firstname"
                    label="First name"
                    dense
                    outlined
                    clearable
                  />
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="info.lastname"
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
                    v-model="info.addr1"
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
                    v-model="info.addr2"
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
                    v-model="info.country"
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
                    v-model="info.state"
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
                    v-model="info.city"
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
                    v-model="info.zipcode"
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
    </v-col>
  </v-row>
</template>
<script>
export default {
  layout: 'dashboard',
  data () {
    return {
      personas: [
        {
          name: 'Lucy',
          email: 'lucyzhong@sfu.ca'
        },
        {
          name: 'Abby',
          email: 'abby@sfu.ca'
        },
        {
          name: 'Cole',
          email: 'cole@sfu.ca'
        }
      ],
      info: {
        firstname: '',
        lastname: '',
        addr1: '',
        addr2: '',
        country: '',
        state: '',
        city: '',
        zipcode: '',
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
      date: null
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
  },
  watch: {
    menu (val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    }
  },
  methods: {
    save (date) {
      this.$refs.menu.save(date)
    },
    reset () {
      this.$refs.form.reset()
    },
    autoForm () {
      for (const item in this.info) {
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
    createPersona () {
      this.personas.push({ name: this.info.firstname, email: this.info.email + '@persona.tk' })
      this.reset()
      this.dialog = false
    }
  }
}
</script>
<style scoped>
.card {
  margin: 20px;
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
