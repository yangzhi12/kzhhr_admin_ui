<template>
  <div>
    <v-modaldialog :isShow.sync="authViewDialog"
                   :title="authViewTitle"
                   :modalMaxWidth="450"
                   :bodyHeight="300"
                   :showCloseBtn="true">
      <div>
        <div class="baseInfo">
          <div class="baseInfoContent">
            <v-layout row
                      wrap>
              <v-flex xs12>
                <span class="infolabel">姓名: </span>
                <span>{{ auth.username }}</span>
              </v-flex>
              <v-flex xs12>
                <span class="infolabel">手机号码: </span>
                <span>{{ auth.mobile }}</span>
              </v-flex>
              <v-flex xs12>
                <span class="infolabel">所属分组: </span>
                <span>{{ auth.rolename }}</span>
              </v-flex>
            </v-layout>
          </div>
        </div>
      </div>
    </v-modaldialog>
  </div>
</template>

<script>
import auth from './Auth.js'

export default {
  name: 'v-auth-info-view',
  mixins: [auth],
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    authid: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      authViewTitle: '',
      authViewDialog: false
    }
  },
  computed: {},
  mounted () { },
  watch: {
    authViewDialog: function (v) {
      this.$emit('update:visible', v)
    },
    visible: function (v) {
      v ? this.disposeDialog(this.authid) : null
      this.authViewDialog = v
    },
    title: function (v) {
      this.authViewTitle = v
    }
  },
  methods: {
    save () {
      this.authViewDialog = false
    },
    cancel () {
      this.authViewDialog = false
    },
    disposeDialog () {
      // 根据会员ID获取会员详情
      if (!this.authid) return
      this.getAuthInfoById(this.authid).then(() => { })
    },
    acceptauthInfo () {
      this.auth.accepted().then(() => {
        this.authViewDialog = false
      })
    },
    rejectauthInfo () {
      this.auth.rejected().then(() => {
        this.authViewDialog = false
      })
    }
  },
  created () {
    this.authViewDialog = this.visible
    this.authViewTitle = this.title
  },
  components: {

  }
}
</script>
<style scoped>
.titlelabel {
  position: absolute;
  right: 60px;
  top: 20px;
  z-index: 1000;
}
.hiddentips {
  word-wrap: break-word;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 450px;
}
.baseInfo {
  margin-bottom: 15px;
}
.baseInfoTitle {
  /* padding: 10px; */
  height: 40px;
  line-height: 40px;
  color: rgba(0, 0, 0, 0.87);
  background-color: #f5f5f5;
}
.titleInner {
  margin-left: 15px;
}
.infolabel {
  margin-right: 10px;
  /* color: #bbb7b7; */
}
</style>
