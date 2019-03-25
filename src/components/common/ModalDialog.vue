<template>
  <v-layout row
            justify-center>
    <v-dialog v-if="isShow"
              v-model="isShow"
              persistent
              scrollable
              :max-width="modalMaxWidth + 'px'">
      <v-card class="card--flex-toolbar">
        <v-toolbar card
                   color="grey lighten-4"
                   v-if="showTitle">
          <v-toolbar-title>
            <div :style="hiddentips"
                 :title="title">{{ title }}</div>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <slot name="toolbarItem"></slot>
          <v-btn icon
                 flat
                 v-if="showCloseBtn"
                 @click="closeDialog">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text :style="{ height: bodyHeight + 'px' }">
          <slot>此为提示信息自定义内容</slot>
        </v-card-text>
        <slot name="btnActions"></slot>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '提示信息'
    },
    modalMaxWidth: {
      type: Number,
      default: 300
    },
    bodyHeight: {
      type: Number,
      default: 80
    },
    showCloseBtn: {
      type: Boolean,
      default: false
    },
    showTitle: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      hiddentips: {
        wordWrap: 'break-word',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        maxWidth: '300'
      }
    }
  },
  watch: {},
  methods: {
    closeDialog () {
      this.$emit('update:isShow', false)
    }
  },
  created () {
    this.$set(this.hiddentips, 'maxWidth', (this.modalMaxWidth - 200) + 'px')
  }
}
</script>

<style scoped>
.toolbar__content {
  height: 34px;
}
</style>
