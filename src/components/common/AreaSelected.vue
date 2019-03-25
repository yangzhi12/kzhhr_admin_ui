<template>
  <div>
    <v-layout row text-align-center>
      <v-flex xs8>
        <v-text-field class="comboxselected"
                          label="请选择行政区划"
                          v-model="areas.defaultSelected.name"
                          hide-details
                          single-line
                          readonly
                          @click="showAreasSelect = !showAreasSelect"
                          append-icon="arrow_drop_down"></v-text-field>
      </v-flex>
      <v-flex xs4 pt-2>
        <v-btn outline color="blue" small @click="setDefaultArea">{{ setAreaFlag ? '取消默认' : '设为默认' }}</v-btn>
      </v-flex>
    </v-layout>
    <div class="areaSlected"
         v-if="showAreasSelect && areas.level2.codes.length > 0">
      <v-layout column>
        <v-flex>
          <v-combobox class="comboxselected areacombox"
                      v-model="areas.level2.code"
                      :items="areas.level2.codes"
                      item-text="name"
                      item-value="code"
                      hide-details
                      single-line
                      clearable
                      label="选择省"></v-combobox>
        </v-flex>
        <v-flex v-if="areas.level3.codes.length > 0 && showLevelNum > 1">
          <v-combobox class="comboxselected areacombox"
                      v-model="areas.level3.code"
                      :items="areas.level3.codes"
                      item-text="name"
                      item-value="code"
                      hide-details
                      single-line
                      clearable
                      label="选择市"></v-combobox>
        </v-flex>
        <v-flex v-if="areas.level4.codes.length > 0 && showLevelNum > 2">
          <v-combobox class="comboxselected areacombox"
                      v-model="areas.level4.code"
                      :items="areas.level4.codes"
                      item-text="name"
                      item-value="code"
                      hide-details
                      single-line
                      clearable
                      label="选择区(县)"></v-combobox>
        </v-flex>
        <v-flex v-if="areas.level5.codes.length > 0 && showLevelNum > 3">
          <v-combobox class="comboxselected areacombox"
                      v-model="areas.level5.code"
                      :items="areas.level5.codes"
                      item-text="name"
                      item-value="code"
                      hide-details
                      single-line
                      clearable
                      label="选择镇(乡)"></v-combobox>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12 text-xs-center>
          <v-btn small
                  color="primary"
                  @click="areaSelectedOk">确定</v-btn>
          <v-btn small
                  @click="areaSelectedCancel">
            取消
          </v-btn>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>
<script>
export default {
  name: 'area-selected',
  props: {
    selectedArea: {
      type: String,
      default: null
    },
    showLevelNum: {
      type: Number,
      default: 4
    }
  },
  data () {
    return {
      showAreasSelect: false,
      areas: {
        defaultSelected: {
          code: '530000000000',
          name: '云南省',
          level: 2
        },
        level2: {
          code: null,
          codes: []
        },
        level3: {
          code: null,
          codes: [],
        },
        level4: {
          code: null,
          codes: []
        },
        level5: {
          code: null,
          codes: []
        }
      },
      constAreaMap: null,
      setAreaFlag: false
    }
  },
  watch: {
    showAreasSelect: function (v) {
      if (v) window.console.log('显示行政区划选择')
    },
    'areas.level2.code': function (v) {
      if (!v) {
        Object.assign(this.areas.level5, { code: null, codes: [] })
        Object.assign(this.areas.level4, { code: null, codes: [] })
        Object.assign(this.areas.level3, { code: null, codes: [] })
        return
      }
      this.queryAreas(v.code)
    },
    'areas.level3.code': function (v) {
      if (!v) {
        Object.assign(this.areas.level5, { code: null, codes: [] })
        Object.assign(this.areas.level4, { code: null, codes: [] })
        return
      }
      this.queryAreas(v.code)
    },
    'areas.level4.code': function (v) {
      if (!v) {
        Object.assign(this.areas.level5, { code: null, codes: [] })
        return
      }
      this.queryAreas(v.code)
    },
    selectedArea: function (v) {
      window.console.log(v)
      let level = this.getAreaCodeLevel(v)
      if (level) {
        window.console.log(this.areas[level])
        let codeArray = this.areas[level].codes.filter(item => {
          return item.code === v
        })
        window.console.log(codeArray[0])
        this.areas[level].code = codeArray[0]
      }
    }
  },
  created () {
    this.getDefaultArea()
  },
  methods: {
    // 查询行政区划
    queryAreas (parentid) {
      let defaultArea = this.$store.state.defaultArea
      if (!parentid) {
        parentid = '100000000000'
        this.areas.defaultSelected = defaultArea
      }
      this.areaLevelConstructor(defaultArea)
      parentid.length < 24 ? (parentid = parentid + parentid) : parentid
      global.mongo.db('iss').collection('base.area').aggregate([
        { $match: { parent: { $oid: parentid } } }
      ]).then(res => {
        if (res && res.length > 0) {
          let level = res[0].level
          this.areas['level' + level].codes = res
          this.areas['level' + level].code = null
          if (this.constAreaMap['level' + level] && this.constAreaMap['level' + level].parentcode
            && (this.constAreaMap['level' + level].parentcode === parentid)) {
            let code = res.filter(item => {
              return item.code === this.constAreaMap['level' + level].code
            })[0]
            this.areas['level' + level].code = code
          }
          let i = 5
          while (i > level) {
            this.areas['level' + i].code = null
            this.areas['level' + i].codes = []
            i--
          }
        }
      })
    },
    // 测试混入接口
    getDefaultArea () {
      global.mongo.db('est').collection('sys.default_value').aggregate([{
        $match: {
          type: 'area'
        }
      }]).then(res => {
        this.$store.dispatch('initDefaultArea', res[0].value).then(() => {
          this.areas.defaultSelected = this.$store.state['defaultArea']
          if (this.areas.defaultSelected.level !== 1) {
            this.setAreaFlag = true
          }
          this.queryAreas()
        })
      })
    },
    // 行政区划选择确定
    areaSelectedOk () {
      this.areas.defaultSelected = this.areas.level5.code || this.areas.level4.code || this.areas.level3.code || this.areas.level2.code
      let level = this.areas.defaultSelected.level
      let i = 2
      let detailname = ''
      while (i <= level) {
        detailname += this.areas['level' + i].code.name
        i++
      }
      Object.assign(this.areas.defaultSelected, { detailname: detailname })
      this.$emit('update:selectedArea', this.areas.defaultSelected.code)
      this.areaLevelConstructor(this.areas.defaultSelected)
      this.showAreasSelect = false
    },
    // 行政划选择取消
    areaSelectedCancel () {
      this.showAreasSelect = false
    },
    // 解析各级别默认行政区
    areaLevelConstructor (defaultArea) {
      let i = 2
      this.constAreaMap = {}
      while (i <= defaultArea.level) {
        let currentCode = defaultArea.code
        let codeSlice = i < 5 ? currentCode.substr(0, (i - 1) * 2) : currentCode.substr(0, (i - 4) * 3 + 6)
        while (codeSlice.length < 12) {
          codeSlice += '0'
        }
        this.constAreaMap['level' + i] = { code: codeSlice, parentcode: i === 2 ? '100000000000100000000000' : (this.constAreaMap['level' + (i - 1)].code + this.constAreaMap['level' + (i - 1)].code) }
        i++
      }
    },
    // 设置默认行政区
    setDefaultArea () {
      this.setAreaFlag = !this.setAreaFlag
      let selectedArea = this.areas.defaultSelected
      let level = selectedArea.level
      let i = 2
      let detailname = ''
      while (i <= level) {
        detailname += this.areas['level' + i].code.name
        i++
      }
      Object.assign(selectedArea, { detailname: detailname })
      let defaultvalue = this.setAreaFlag
        ? Object.assign({}, { filter: { type: 'area' }, update: { $set: { value: selectedArea } } })
        : Object.assign({}, { filter: { type: 'area' }, update: { $set: { value: this.$store.state['initArea'] } } })
      // window.console.log(JSON.stringify(selectedArea))
      this.$store.dispatch('initDefaultArea', selectedArea).then(() => {
        // 将默认值存储到数据库，以便退出后登录时再次使用
        global.mongo.db('est').collection('sys.default_value').update(defaultvalue)
      })
    },
    // 根据行政区划代码判断其对应的level
    getAreaCodeLevel (code) {
      let level = code.substr(0, 2) === '00' ? 'level1' : (code.substr(2, 2) === '00' ? 'level2' : (code.substr(4, 2) === '00' ? 'level3' : (code.substr(6, 3) === '000' ? 'level4' : (code.substr(9, 3) === '000' ? 'level5' : null))))
      return level
    }
  }
}
</script>
<style scoped lang="scss">
.areaSlected {
  position: absolute;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  z-index: 9999;
  background-color: #ffffff;
  border: 1px solid #c4c2c2;
}
</style>
