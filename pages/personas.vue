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
          <v-toolbar>
            <v-btn
              icon
              dark
              @click="dialog = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Persona information</v-toolbar-title>
            <v-spacer />
            <v-toolbar-items>
              <v-btn
                text
                @click="createPersona"
              >
                Create
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-form ref="form">
            <v-container>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="firstname"
                    label="First name"
                    dense
                    outlined
                    clearable
                  />
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="lastname"
                    label="Last name"
                    dense
                    outlined
                    clearable
                  />
                </v-col>
              </v-row>
              <v-row>
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
              <v-row>
                <v-col
                  cols="12"
                >
                  <v-text-field
                    v-model="addr1"
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
                    v-model="addr2"
                    label="Address Line 2"
                    dense
                    outlined
                    clearable
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="country"
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
                    v-model="state"
                    label="State/Province"
                    dense
                    outlined
                    clearable
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="city"
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
                    v-model="zipcode"
                    label="Zip code"
                    dense
                    outlined
                    clearable
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                >
                  <v-text-field
                    v-model="email"
                    label="Email"
                    hint="@persona.tk"
                    dense
                    outlined
                    clearable
                  />
                </v-col>
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
      dialog: false,
      firstname: '',
      lastname: '',
      select: null,
      gender: [
        'Male',
        'Female',
        'Non-Binary'
      ],
      activePicker: null,
      date: null,
      menu: false,
      addr1: '',
      addr2: '',
      country: '',
      state: '',
      city: '',
      zipcode: '',
      email: ''
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
      if (!this.firstname) {
        this.firstname = 'Tony'
      }
      if (!this.lastname) {
        this.lastname = 'Liu'
      }
      if (!this.select) {
        this.select = this.gender[0]
      }
      if (!this.date) {
        this.date = new Date(Date.now()).toISOString().substr(0, 10)
      }
      if (!this.email) {
        this.email = 'tonyliu'
      }
    },
    createPersona () {
      this.personas.push({ name: this.firstname, email: this.email + '@persona.tk' })
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
.v-row {
  padding-top: 0;
  padding-bottom: 0;
}
</style>
