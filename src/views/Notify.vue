<template>
  <v-card class="page-content"
          flat>
    <v-layout row
              pa-3
              pb-3>
      <v-flex xs8
              text-xs-center
              class="notifyedit">
        <v-layout row>
          <v-flex xs12
                  pa-3
                  class="notifylabel">发布通知公告</v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs1></v-flex>
          <v-flex xs10
                  class="notifycontainer">
            <v-form v-model="valid"
                    ref="form"
                    lazy-validation
                    autocomplete="off">
              <v-layout row
                        pa-2>
                <v-flex xs3
                        style="line-height: 40px;">标题</v-flex>
                <v-flex xs9>
                  <v-text-field label="请输入标题(50字以内)"
                                name="title"
                                single-line
                                v-model="notify.title"
                                :rules="rules.title"
                                maxlength="20"></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row
                        pa-2>
                <v-flex xs3
                        style="line-height: 60px;">类型</v-flex>
                <v-flex xs9>
                  <v-radio-group v-model="notify.type"
                                 row
                                 :rules="rules.required">
                    <v-radio label="通知"
                             single-line
                             value="notify"></v-radio>
                    <v-radio label="公告"
                             single-line
                             value="notice"></v-radio>
                  </v-radio-group>
                </v-flex>
              </v-layout>
              <v-layout row
                        pa-2>
                <v-flex xs3>内容</v-flex>
                <v-flex xs9>
                  <v-textarea name="content"
                              label="请输入文本内容(255字以内)"
                              single-line
                              :rules="rules.content"
                              v-model="notify.content"></v-textarea>
                </v-flex>
              </v-layout>
            </v-form>
            <v-layout row>
              <v-flex xs12>
                <v-btn color="primary"
                       @click="publishNotify">发布</v-btn>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs1></v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs4
              text-xs-center
              class="mobilelist">
        <div frameborder="0"
             style="width:320px;height:560px;box-shadow: 1px 1px 6px rgb(6, 105, 202);border-radius:8px;margin:auto;overflow:hidden;">
          <div class="notify-notice">
            <div class="notify-notice-title">通知</div>
            <template v-for="notify in filterNotifies('notify')">
              <v-layout row
                        :key="notify.id"
                        class="notify-item"
                        @click="showContent('notify', notify)"
                        @mouseover="setCurNotify(notify)">
                <v-flex xs8
                        class="notify-item-title">{{notify.title}}</v-flex>
                <v-flex xs3
                        class="notify-item-time">{{getFormtedTime(notify.createtime)}}</v-flex>
                <v-flex xs1
                        class="notify-item-delete">
                  <v-icon small
                          title="删除"
                          color="error"
                          class="delete-icon"
                          @click.native.stop="deleteNotice(notify)"
                          v-if="notify.id === curid">
                    delete
                  </v-icon>
                </v-flex>
              </v-layout>
            </template>
          </div>
          <div class="notify-notice">
            <div class="notify-notice-title">公告</div>
            <template v-for="notice in filterNotifies('notice')">
              <v-layout row
                        :key="notice.id"
                        class="notify-item"
                        @click="showContent('notice', notice)"
                        @mouseover="setCurNotify(notice)">
                <v-flex xs8
                        class="notify-item-title">{{notice.title}}</v-flex>
                <v-flex xs3
                        class="notify-item-time">{{getFormtedTime(notice.createtime)}}</v-flex>
                <v-flex xs1
                        class="notify-item-delete">
                  <v-icon small
                          title="删除"
                          color="error"
                          class="delete-icon"
                          @click.native.stop="deleteNotice(notice)"
                          v-if="notice.id === curid">
                    delete
                  </v-icon>
                </v-flex>
              </v-layout>
            </template>
          </div>
        </div>
      </v-flex>
    </v-layout>
    <v-modaldialog :isShow.sync="viewNotify"
                   :title="tmpnotifytitle"
                   :modalMaxWidth="680"
                   :bodyHeight="500"
                   :showCloseBtn="true">
      <div class="tmpnotifycontainer">
        <v-layout row>
          <v-flex xs3>标题：</v-flex>
          <v-flex xs9>{{tmpnotify.title}}</v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs3>发布时间：</v-flex>
          <v-flex xs9>{{getFormtedTime(tmpnotify.createtime)}}</v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs3>内容：</v-flex>
          <v-flex xs9>{{tmpnotify.content}}</v-flex>
        </v-layout>
      </div>
    </v-modaldialog>
  </v-card>
</template>

<script>
import { excuteApis } from '@/api'
import { parseTime } from '@/utils'

export default {
  data () {
    return {
      valid: true,
      notifies: [],
      tmpnotifytitle: '',
      viewNotify: false,
      curid: '',
      tmpnotify: {
        title: '',
        type: '',
        content: ''
      },
      notify: {
        title: '',
        type: '',
        content: ''
      },
      rules: {
        required: [
          (v) => !!v || '必填项'
        ],
        title: [
          (v) => !!v || '必填项',
          (v) => v.length <= 50 || '长度不超过50个汉字'
        ],
        content: [
          (v) => !!v || '必填项',
          (v) => v.length <= 255 || '长度不超过255个汉字'
        ]
      }
    }
  },
  watch: {},
  methods: {
    publishNotify () {
      if (this.$refs.form.validate()) {
        excuteApis(this.notify, global.config.adminApis, 'notify', 'add').then(response => {
          this.getNotifyList()
        })
      }
    },
    getNotifyList () {
      excuteApis({ page: 10 }, global.config.adminApis, 'notify', 'list').then(response => {
        let data = response.data
        if (!data.errno) {
          this.notifies = data.data
        }
      })
    },
    filterNotifies (type) {
      return this.notifies.filter(item => {
        return item.type === type
      })
    },
    getFormtedTime (time) {
      if (!time) {
        return '--'
      }
      return parseTime(time, 'yyyy-MM-dd')
    },
    showContent (type, item) {
      type === 'notify' ? (this.tmpnotifytitle = '通知详情') : (this.tmpnotifytitle = '公告详情')
      Object.assign(this.tmpnotify, item)
      this.viewNotify = true
    },
    deleteNotice (item) {
      excuteApis({ item: item }, global.config.adminApis, 'notify', 'delete').then(response => {
        let data = response.data
        if (!data.errno) {
          this.getNotifyList()
        }
      })
    },
    setCurNotify (item) {
      this.curid = item.id
    }
  },
  created () {
    this.getNotifyList()
  }
}
</script>

<style scoped>
.notifyedit {
  border: 1px solid #f4f4f4;
}
.notifylabel {
  background-color: rgb(244, 244, 244, 0.3);
}
.notifycontainer {
  margin-top: 10px;
  /* border: 1px solid #f4f4f4; */
}
.notify-notice {
  height: 50%;
  width: auto;
  text-align: left;
}
.notify-notice-title {
  margin: 10px 10px;
  border-bottom: 1px solid #1976d2 !important;
}
.notify-item {
  padding-left: 10px;
  padding-right: 10px;
}

.notify-item-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 10px;
  cursor: pointer;
}

.notify-item-time {
}

.delete-icon {
  cursor: pointer;
}
</style>
