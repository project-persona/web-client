<template>
  <v-row justify="center" align="center" class="my-auto">
    <v-col cols="12" sm="8" md="6">
      <v-card class="py-4 d-flex justify-center" color="rgb(255, 0, 0, 0)">
        <Logo-no-bg />
      </v-card>
      <v-card style="max-width:70%" class="mx-auto mt-3" color="rgb(255, 0, 0, 0)">
        <v-form
          ref="form"
          v-model="valid"
        >
          <v-container>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="E-mail"
                  required
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="pwd"
                  label="Password"
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="pwdRules"
                  :type="show ? 'text' : 'password'"
                  hint="at least 6 characters"
                  counter
                  required
                  @click:append="show = !show"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="accent"
            nuxt
            to="/signup"
          >
            Sign up
          </v-btn>
          <v-btn
            color="primary"
            @click="submit"
          >
            Sign in
          </v-btn>
        </v-card-actions>
        <h3 class="seperate font-weight-light">
          <span>OR</span>
        </h3>
        <v-card-actions>
          <v-btn
            color="secondary"
            class="mx-auto"
            nuxt
            to="/"
          >
            Continue using
            <v-icon class="ml-1">
              mdi-google
            </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
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
    </v-col>
  </v-row>
</template>
<script>
export default {
  layout: 'default',
  data () {
    return {
      snackbar: false,
      snackbarMsg: '',
      valid: true,
      show: false,
      email: '',
      pwd: '',
      emailRules: [v => /.+@.+/.test(v) || 'E-mail must be valid'],
      pwdRules: [v => v.length >= 6 || 'Min 6 characters']
    }
  },
  methods: {
    clear () {
      this.email = ''
      this.pwd = ''
    },
    async submit () {
      this.valid = this.$refs.form.validate()
      if (this.valid) {
        const res = await this.$accountLogin(this.email, this.pwd)
        if (res.success) {
          this.$router.push({ path: '/personas' })
        } else {
          this.snackbarMsg = res.msg
          this.snackbar = true
        }
      }
    }
  }
}
</script>
<style scoped>
.seperate {
   width: 100%;
   text-align: center;
   border-bottom: 1px solid #FFF;
   line-height: 0.1em;
   margin: 10px 0 20px;
}

.seperate span {
    background:#000;
    padding:0 10px;
}
</style>
