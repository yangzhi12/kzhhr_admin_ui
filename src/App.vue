<template>
  <v-app>
    <v-toolbar>
      <v-avatar size="45"
                color="grey lighten-4">
        <img src="./assets/logo.png"
             alt="avatar">
      </v-avatar>
      <v-toolbar-title>昆自合伙人后台管理系统</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat
               @click="path('member')">合伙人管理</v-btn>
        <v-btn flat
               @click="path('contract')">合同管理</v-btn>
        <v-btn flat
               @click="path('dataaccess')">数据接入</v-btn>
        <v-btn flat
               @click="path('accounts')">收益结算</v-btn>
        <v-btn flat
               @click="path('report')">统计报表</v-btn>
        <v-menu open-on-hover
                top
                offset-y
                v-if="isLogined">
          <template v-slot:activator="{ on }">
            <v-btn small
                   flat
                   v-on="on">
              <v-icon dark>account_circle</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-tile v-for="(item, index) in items"
                         :key="index"
                         @click="triggerEvent(index)">
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-toolbar>
    <core-view />
  </v-app>
</template>

<script>
import CoreView from '@/components/core/View'
export default {
  name: 'App',
  data () {
    return {
      items: [
        { title: '个人中心' },
        { title: '用户管理' },
        { title: '退出系统' }
      ],
      isLogined: false
    }
  },
  watch: {
    $route: {
      handler: function (v) {
        if (v.name === 'login') {
          this.isLogined = false
        } else {
          this.isLogined = true
        }
      },
      deep: true
    }
  },
  methods: {
    path (pathname) {
      this.$router.push({ name: pathname })
    },
    triggerEvent (index) {
      switch (index) {
        case 0:
          this.$router.push({ name: 'personal' })
          break;
        case 1:
          this.$router.push({ name: 'auth' })
          break;
        case 2:
          this.$store.commit('setAuth', { user: {}, 'token': null })
          this.$router.push({ name: 'login' })
          break;
      }
    }
  },
  components: {
    CoreView
  }
}
</script>
<style>
html,
body {
  overflow-y: hidden;
}
</style>

