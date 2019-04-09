<template>
  <v-content>
    <v-fade-transition mode="out-in">
      <router-view />
    </v-fade-transition>
    <!-- <v-footer height="auto"
              class="white"
              fixed>
      <v-layout row
                wrap
                justify-center>
        <v-flex xs12
                py-3
                text-xs-center
                grey--text>
          昆明自动化成套设备股份有限公司&nbsp;&nbsp;&nbsp;&nbsp;@版权所有&nbsp;&nbsp;&nbsp;&nbsp;Ver0.3.0.190405
        </v-flex>
      </v-layout>
    </v-footer> -->
  </v-content>
</template>

<script>
export default {
  metaInfo () {
    return {}
  }
}
</script>

<style>
</style>
