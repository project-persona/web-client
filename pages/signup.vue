<template>
  <v-row justify="center" align="center" class="my-auto">
    <v-col cols="12" sm="8" md="6">
      <v-card class="py-4 d-flex justify-center" color="rgb(255, 0, 0, 0)">
        <Logo-no-bg />
      </v-card>
      <v-card style="max-width:50%" class="mx-auto mt-3" color="rgb(255, 0, 0, 0)">
        <v-form>
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
            <v-row>
              <v-col>
                <v-text-field
                  v-model="confirmPwd"
                  label="Confirm Password"
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="confirmRules"
                  :type="show ? 'text' : 'password'"
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
            @click="clear"
          >
            clear
          </v-btn>
          <v-btn
            color="primary"
            nuxt
            to="/personas"
          >
            Sign up
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  layout: 'default',
  data () {
    return {
      show: false,
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
    }
  }
}
</script>
