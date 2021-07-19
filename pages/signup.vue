<template>
  <v-row justify="center" align="center" class="my-auto">
    <v-col cols="12" sm="8" md="6">
      <v-card class="py-4 d-flex justify-center" color="rgb(255, 0, 0, 0)">
        <Logo-no-bg />
      </v-card>
      <v-card class="mx-auto mt-3" color="rgb(255, 0, 0, 0)">
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
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="pwdRules"
                  :type="show1 ? 'text' : 'password'"
                  hint="at least 6 characters"
                  counter
                  required
                  @click:append="show1 = !show1"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="confirmPwd"
                  label="Confirm Password"
                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="confirmRules"
                  :type="show2 ? 'text' : 'password'"
                  counter
                  required
                  @click:append="show2 = !show2"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="accent"
            @click="clear"
          >
            clear
          </v-btn>
          <v-btn
            color="primary"
            @click="submit"
          >
            Sign up
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
      show1: false,
      show2: false,
      valid: true,
      email: '',
      pwd: '',
      confirmPwd: '',
      emailRules: [v => /.+@.+/.test(v) || 'E-mail must be valid'],
      pwdRules: [v => v.length >= 6 || 'Min 6 characters'],
      confirmRules: [v => this.pwd === this.confirmPwd || 'Passwords not match']
    }
  },
  methods: {
    clear () {
      this.email = ''
      this.pwd = ''
      this.confirmPwd = ''
    },
    async submit () {
      this.valid = this.$refs.form.validate()
      if (this.valid) {
        const res = await this.$accountSignup(this.email, this.pwd)
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
