<template>
  <div>
    <a-table :columns="columns" :dataSource="data" rowKey='relationId'>
      <template slot="operation" slot-scope="text">
        <div class="operation">
          <a href="javascript:;" @click="edit(text)">编辑</a>
        </div>
      </template>
    </a-table>
    <a-drawer
      title="内容编辑"
      placement="right"
      width="600"
      :closable="false"
      :visible="editNewVisible"
    >
      <EditNew @success='success' @close='editNewVisible = false' :details="details" :visible="editNewVisible"></EditNew>
    </a-drawer>
  </div>
</template>

<script>
import EditNew from './edit-new'
import { ContentLists } from '@/api'
export default {
  data () {
    return {
      columns: [{
        title: '用户名',
        dataIndex: 'accountName',
        align: 'center'
      }, {
        title: '菜单',
        dataIndex: 'menuName',
        align: 'center'
      }, {
        title: '标题',
        dataIndex: 'contentTitle',
        align: 'center'
      }, {
        title: '操作',
        scopedSlots: { customRender: 'operation' },
        align: 'center'
      }],
      data: [],

      editNewVisible: false,
      details: {}
    }
  },
  components: {
    EditNew
  },
  methods: {
    // 获取列表
    list (id) {
      ContentLists(id)
        .then(res => {
          if (res.resultCode === '200') {
            this.data = res.data
          } else {
            this.$message.error(res.resultDesc)
          }
        })
    },
    // 编辑
    edit (row) {
      this.details = row
      this.editNewVisible = true
    },

    // 成功操作
    success () {
      this.list()
      this.editNewVisible = false
    }
  },
  mounted () {
    this.list(this.$route.query.id)
  },
  watch: {
    $route () {
      this.list(this.$route.query.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.operation{
  color: #1890FF;
  a{
    margin: 5px;
  }
}
</style>
