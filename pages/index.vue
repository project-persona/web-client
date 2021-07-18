<template>
  <v-row justify="center" align="center" class="my-auto">
    <v-col cols="12" sm="8" md="6">
      <v-card class="py-4 d-flex justify-center" color="rgb(255, 0, 0, 0)">
        <Logo-no-bg />
      </v-card>
      <v-card>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            nuxt
            to="/personas"
          >
            Login
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  layout: 'default'
}
</script>
