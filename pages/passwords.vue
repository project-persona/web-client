<template>
  <v-simple-table dark>
    <template #default>
      <thead>
        <tr>
          <th id="th" class="text-center">
            SITE
          </th>
          <th id="th" class="text-center">
            PASSWORD
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="pw in pwList" :key="pw.site" align="center">
          <td>{{ pw.site.toUpperCase() }}</td>
          <td
            class="text-center"
          >
            {{ pw.show ? pw.password : '#######' }} <v-btn icon class="icon" @click="pw.show = !pw.show">
              <v-icon>
                {{ pw.show ? 'mdi-eye' : 'mdi-eye-off' }}
              </v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>
<script>
const pwList = [
  { password: '123456', site: 'Facebook' },
  { password: '2453454', site: 'Google' }
]
for (let i = 0; i < pwList.length; i++) {
  pwList[i].show = false
}
export default {
  layout: 'dashboard',
  data () {
    return {
      pwList
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
  }
</style>
