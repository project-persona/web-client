<template>
  <v-row justify="center" align="center" class="my-auto">
    <v-col cols="12" sm="8" md="6">
      <v-card class="py-4 d-flex justify-center" color="rgb(255, 0, 0, 0)">
        <Logo-no-bg />
      </v-card>
      <v-card style="max-width:70%" class="mx-auto mt-3" color="rgb(255, 0, 0, 0)">
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
            nuxt
            to="/personas"
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
            nuxt
            to="/"
          >
            Continue using
            <v-icon>mdi-google</v-icon>
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
      emailRules: [v => /.+@.+/.test(v) || 'E-mail must be valid'],
      pwdRules: [v => v.length >= 6 || 'Min 6 characters']
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
