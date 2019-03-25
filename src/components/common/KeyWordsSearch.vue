<template>
  <v-layout row style="">
    <v-flex xs12>
      <v-text-field
        append-icon="search"
        hide-details
        single-line
        clearable
        :placeholder="placeholder"
        @click:append="searchFn"
        v-model="value"
        ></v-text-field>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'key-words-search',
  props: {
    placeholder: {
      type: String,
      default: '请输入关键词检索'
    },
    keywords: {
      type: String,
      default: null
    },
    searchFn: {
      type: Function,
      default: () => { }
    }
  },
  data () {
    return {
      value: null
    }
  },
  watch: {
    value: function (v) {
      this.$emit('update:keywords', v)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
