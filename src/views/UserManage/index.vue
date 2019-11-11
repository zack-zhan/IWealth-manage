<template>
  <div>
    <div class="add">
      <a-button @click="addUserVisible = true">添加账户</a-button>
      <a-drawer
        title="添加账号"
        placement="right"
        width="600"
        :closable="false"
        :visible="addUserVisible"
      >
        <AddUser @success='success' @close='close'></AddUser>
      </a-drawer>
    </div>
    <a-table :columns="columns" :dataSource="data" rowKey='accountId'>
      <template slot="operation" slot-scope="text">
        <div class="operation">
          <a href="#" @click="edit(text)">编辑</a>
          <a-popconfirm title="您确定要删除吗?" @confirm="del(text)" okText="确定" cancelText="取消">
            <a href="#">删除</a>
          </a-popconfirm>
        </div>
      </template>
    </a-table>
    <a-drawer
      title="编辑账号"
      placement="right"
      width="600"
      :closable="false"
      :visible="editUserVisible"
    >
      <EditUser :details="details" @success='success' @close='close'></EditUser>
    </a-drawer>
  </div>
</template>

<script>
import AddUser from './add-user'
import EditUser from './edit-user'
import { AccountList, AccountDelete } from '@/api'
export default {
  data () {
    return {
      columns: [{
        title: '账号名',
        dataIndex: 'name',
        align: 'center'
      }, {
        title: '操作',
        scopedSlots: { customRender: 'operation' },
        align: 'center'
      }],
      data: [],

      addUserVisible: false,
      editUserVisible: false,

      details: {}
    }
  },
  components: {
    AddUser,
    EditUser
  },
  methods: {
    // 获取列表
    list () {
      AccountList()
        .then(res => {
          if (res.resultCode === '200') {
            this.data = res.data
          } else {
            this.$message.error(res.resultDesc)
          }
        })
    },
    edit (row) {
      this.details = row
      this.editUserVisible = true
    },
    del (row) {
      const obj = {
        id: row.accountId
      }
      AccountDelete(obj)
        .then(res => {
          if (res.resultCode === '200') {
            this.$message.success('删除成功')
            this.list()
          } else {
            this.$message.error(res.resultDesc)
          }
        })
    },

    // 成功操作
    success () {
      this.list()
      this.close()
    },
    // 关闭弹出框
    close () {
      this.addUserVisible = false
      this.editUserVisible = false
    }
  },
  mounted () {
    this.list()
  }
}
</script>

<style lang="scss" scoped>
.add{
  margin-bottom: 24px;
}
.operation{
  color: #1890FF;
  a{
    margin: 5px;
  }
}
</style>
