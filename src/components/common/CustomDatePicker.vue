<template>
  <v-layout row>
    <v-flex v-bind:class="{'xs6': timePickerShow}">
      <v-menu :ref="datePickerMenu"
              lazy
              :close-on-content-click="false"
              v-model="menu"
              transition="scale-transition"
              offset-y
              full-width
              :nudge-right="40"
              min-width="290px"
              :return-value.sync="currentDate">
        <v-text-field slot="activator"
                      :label="pickerLabel"
                      v-model="currentDate"
                      append-icon="event"
                      :single-line="singleLine"
                      readonly
                      :rules="rules"></v-text-field>
        <v-date-picker locale="zh-CN"
                       v-model="currentDate"
                       :allowed-dates="allowedDates"
                       @input="$refs[datePickerMenu].save(currentDate)"></v-date-picker>
      </v-menu>
    </v-flex>
    <v-flex xs6
            v-if="timePickerShow"
            class="ml-1">
      <v-menu :ref="timePickerMenu"
              lazy
              :close-on-content-click="false"
              v-model="timeMenu"
              transition="scale-transition"
              offset-y
              full-width
              :nudge-right="40"
              min-width="290px"
              :return-value.sync="currentTime">
        <v-text-field slot="activator"
                      :label="timePickerLabel"
                      v-model="currentTime"
                      append-icon="access_time"
                      :single-line="singleLine"
                      readonly
                      :rules="rules"></v-text-field>
        <v-time-picker locale="zh-CN"
                       v-model="currentTime"
                       :allowed-hours="allowedHours"
                       :allowed-minutes="allowedMinutes"
                       format="24hr"
                       @change="$refs[timePickerMenu].save(currentTime)"></v-time-picker>
      </v-menu>
    </v-flex>
  </v-layout>
</template>

<script>
// import { parseTime } from '@/utils'

export default {
  props: {
    datePickerMenu: {
      type: String,
      default: 'datemenu'
    },
    pickerLabel: {
      type: String,
      default: '点击选择日期'
    },
    selectedDate: {
      type: String,
      default: ''
    },
    allowedDates: {
      type: Function,
      default: () => { return true }
    },
    rules: {
      type: Array,
      default: () => { return [] }
    },
    timePickerShow: {
      type: Boolean,
      default: false
    },
    timePickerMenu: {
      type: String,
      default: 'timemenu'
    },
    timePickerLabel: {
      type: String,
      default: '点击选择时间'
    },
    selectedTime: {
      type: String,
      default: null
    },
    allowedHours: {
      type: Function,
      default: () => { return true }
    },
    allowedMinutes: {
      type: Function,
      default: () => { return true }
    },
    rulesTime: {
      type: Array,
      default: () => { return [] }
    },
    singleLine: {
      type: Boolean,
      require: true,
      default: true
    }
  },
  data () {
    return {
      currentDate: null,
      currentTime: null,
      menu: false,
      timeMenu: false
    }
  },
  watch: {
    selectedDate (v) {
      this.currentDate = v
    },
    currentDate (v) {
      this.$emit('update:selectedDate', v)
    },
    selectedTime (v) {
      this.currentTime = v
    },
    currentTime (v) {
      this.$emit('update:selectedTime', v)
    }
  },
  methods: {},
  created () {
    //此处不需要默认选中当前日期
    // let date = new Date()
    // this.currentDate = parseTime(date, 'yyyy-MM-dd')
  }
}
</script>

<style scoped></style>
