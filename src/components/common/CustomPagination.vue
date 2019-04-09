<template>
  <v-layout row
            justify-center>
    <v-flex sm3
            xl1>
      <v-subheader class="pl-0 pr-0">每页显示</v-subheader>
    </v-flex>
    <v-flex sm3
            xl1>
      <v-select v-bind:items="pageSizes"
                v-model="currentPageSize"
                single-line
                hide-details
                menu-props="bottom"
                class="pagesizes"></v-select>
    </v-flex>
    <v-flex sm4
            xl3>
      <v-subheader class="pr-0 pl-0">
        <span>共 {{ pagination.total }} 条
          <span v-if="pagination.total > 0">, 当前 {{ startRow }} - {{ startRow + pagination.rowsPerPage > pagination.total ? pagination.total : startRow + pagination.rowsPerPage - 1}} 条&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </span>
        <span>
          <span v-bind:class="{arrow: pagination.page > 1}">
            <v-icon :disabled="left_disabled"
                    @click="subPage">keyboard_arrow_left</v-icon>
          </span>
          <span v-bind:class="{arrow: pagination.page * pagination.rowsPerPage < pagination.total}">
            <v-icon :disabled="right_disabled"
                    @click="addPage">keyboard_arrow_right</v-icon>
          </span>
        </span>
      </v-subheader>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: {
    pagination: {
      type: Object,
      default: () => Object.assign({}, { total: 0, page: 0, rowsPerPage: 0 })
    }
  },
  data () {
    return {
      pageSizes: [
        {
          text: '5条',
          value: 5
        },
        {
          text: '10条',
          value: 10
        },
        {
          text: '15条',
          value: 15
        },
        {
          text: '20条',
          value: 20
        },
        {
          text: '50条',
          value: 50
        }
      ],
      currentPageSize: null,
      right_disabled: false,
      left_disabled: true
    }
  },
  watch: {
    startRow: function (val) {
      this.left_disabled = !(val >= this.pagination.rowsPerPage)
      this.right_disabled = !(val + this.pagination.rowsPerPage <= this.pagination.total)
    },
    currentPageSize: function (val) {
      this.$emit('update:pagination', Object.assign(this.pagination, { rowsPerPage: val, page: 1 }))
    },
    'pagination.total': function () {
      this.left_disabled = !(this.startRow >= this.pagination.rowsPerPage)
      this.right_disabled = !(this.startRow + this.pagination.rowsPerPage <= this.pagination.total)
    },
    'pagination.rowsPerPage': function (val) {
      this.currentPageSize = val
      this.left_disabled = !(this.startRow >= this.pagination.rowsPerPage)
      this.right_disabled = !(this.startRow + this.pagination.rowsPerPage <= this.pagination.total)
    }
  },
  computed: {
    startRow: function () {
      return this.pagination.page === 1 ? 1 : (this.pagination.page - 1) * this.pagination.rowsPerPage + 1
    }
  },
  methods: {
    addPage () {
      if (this.pagination.page * this.pagination.rowsPerPage >= this.pagination.total) return
      this.$emit('update:pagination', Object.assign(this.pagination, { page: this.pagination.page + 1 }))
    },
    subPage () {
      if (this.pagination.page === 1) return
      this.$emit('update:pagination', Object.assign(this.pagination, { page: this.pagination.page - 1 }))
    }
  },
  created () {
    this.currentPageSize = this.pagination.rowsPerPage
  }
}
</script>

<style scoped>
.pagesizes {
  max-width: 80px;
  padding-top: 0px;
  margin-top: 3px;
}
.arrow {
  cursor: pointer;
}
</style>
