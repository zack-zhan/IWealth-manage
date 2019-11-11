<template>
  <div class="box">
    <a-form
      :form="form"
      @submit="handleSubmit"
    >
      <a-form-item
        label="账号"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }"
      >
        <a-select
          v-decorator="[
            'user',
            {initialValue: details.accountId}
          ]"
          placeholder="请选择账号"
          @change="userChange"
          :disabled="true"
        >
          <a-select-option v-for="item in userData" :key="item.accountId">{{item.name}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="菜单"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }"
      >
        <a-select
          v-decorator="[
            'menu',
            {initialValue: details.menuId}
          ]"
          placeholder="请选择菜单"
          @change="menuChange"
          :disabled="true"
        >
          <a-select-option v-for="item in menuData" :key="item.id">{{item.name}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="标题"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }"
      >
        <a-input
          v-decorator="[
            'title',
            {initialValue: contentTitle}
          ]"
        />
      </a-form-item>

      <a-form-item
        label="内容"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }"
        v-if="editorShow"
      >
        <a href="javascript:void(0)" style="color: #1890FF;" @click="editorVisible = true">内容编辑</a>
      </a-form-item>

      <a-form-item
        label="表格列表"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }"
        v-if="tableShow"
      >
        <a href="javascript:void(0)" style="color: #1890FF;" @click="addTableVisible = true">添加表格</a>
      </a-form-item>
      <a-table :columns="columns" :dataSource="tableData" rowKey='headerContent' v-if="tableShow">
        <template slot="operation" slot-scope="text, record,index">
          <div class="operation">
            <a href="#" @click="editTable(text,record,index)">编辑</a>
            <a-popconfirm title="您确定要删除吗?" @confirm="delTable(text)" okText="确定" cancelText="取消">
              <a href="#">删除</a>
            </a-popconfirm>
          </div>
        </template>
      </a-table>

      <a-form-item
        label="文件上传"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }"
        v-if="uploadShow"
      >
        <div v-for="(item,index) in this.$store.state.upload" :key="index" class="case">
          <span>{{item.fileName}}</span>
          <a href="javascript:void(0)" @click="delUpload(item)">×</a>
        </div>
        <a href="javascript:void(0)" style="color: #1890FF;" @click="uploadVisible = true">上传编辑</a>
      </a-form-item>

      <a-form-item
        :wrapper-col="{ span: 12, offset: 5 }"
      >
        <a-button
          type="primary"
          html-type="submit"
        >
          确 认
        </a-button>
        <a-button style="margin-left:20px;" @click="cancel">取消</a-button>
      </a-form-item>
    </a-form>

    <a-modal
      title="内容编辑"
      v-model="editorVisible"
      @ok="editorOk"
      cancelText="取 消"
      okText="确 认"
      width="1000px"
    >
      <Editor @text="text" :visible="editorVisible"></Editor>
    </a-modal>
    <a-modal
      title="表格添加"
      v-model="addTableVisible"
      @ok="addTableOk"
      cancelText="取 消"
      okText="确 认"
    >
      <AddTable @title="tableTitle" @content="tableContent" :visible="addTableVisible"></AddTable>
    </a-modal>
    <a-modal
      title="表格编辑"
      v-model="editTableVisible"
      @ok="editTableOk"
      cancelText="取 消"
      okText="确 认"
    >
      <EditTable :table-text="tableText" @editTitle="editTableTitle" @editContent="editTableContent" :visible="editTableVisible"></EditTable>
    </a-modal>
    <a-modal
      title="上传编辑"
      v-model="uploadVisible"
      @ok="uploadOk"
      cancelText="取 消"
      okText="确 认"
    >
      <Upload @name="uploadName" @url="uploadUrl" :visible="uploadVisible"></Upload>
    </a-modal>
  </div>
</template>

<script>
import Editor from '@/components/editor'
import AddTable from '@/components/add-table'
import EditTable from '@/components/edit-table'
import Upload from '@/components/upload'
import { AccountList, GetMenus, ContentGet, ContentSave } from '@/api'
export default {
  props: {
    details: {
      type: Object,
      default: function () {
        return {}
      }
    },
    visible: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this),

      contentTitle: '',

      userData: [],
      userId: '',

      menuData: [],
      menuId: '',

      editorShow: false,
      uploadShow: false,
      tableShow: false,

      editorVisible: false,
      tinymceHtml: '',
      textContent: '',

      addTableVisible: false,
      columns: [{
        title: '标题',
        dataIndex: 'headerContent',
        align: 'center',
        width: 100
      }, {
        title: '内容',
        dataIndex: 'bodyContent',
        align: 'center',
        width: 300
      }, {
        title: '操作',
        align: 'center',
        scopedSlots: { customRender: 'operation' }
      }],
      tableData: [],
      title: '',
      contant: '',
      editTableVisible: false,
      tableText: '',
      tableIndex: '',

      uploadVisible: false,
      name: '',
      url: ''
    }
  },
  components: {
    Editor,
    AddTable,
    EditTable,
    Upload
  },
  methods: {
    // 获取用户列表
    userList () {
      AccountList()
        .then(res => {
          if (res.resultCode === '200') {
            this.userData = res.data
          } else {
            this.$message.error(res.resultDesc)
          }
        })
    },
    // 选择账号
    userChange (value) {
      this.userId = value
    },
    // 获取菜单列表
    menuList () {
      GetMenus()
        .then(res => {
          if (res.resultCode === '200') {
            this.menuData = res.data
          } else {
            this.$message.error(res.resultDesc)
          }
        })
    },
    // 选择菜单
    menuChange (value) {
      this.menuId = value
    },

    // 获取内容和文件列表
    contentList () {
      const obj = {
        accountId: this.details.accountId,
        contentId: this.details.contentId
      }
      ContentGet(obj)
        .then(res => {
          if (res.resultCode === '200') {
            this.contentTitle = res.data.title
            if (res.data.texts.length > 0) {
              this.textContent = res.data.texts[0].textContent
              this.$store.commit('setTinymceHtml', res.data.texts[0].textContent)
            }
            if (res.data.tables) {
              res.data.tables.map(item => {
                this.$store.commit('setTable', item)
              })
              this.tableData = this.$store.state.Table
            }
            if (res.data.files) {
              res.data.files.map(item => {
                this.$store.commit('setUpload', item)
              })
            }
            if (res.data.type === 1) {
              this.editorShow = true
              this.tableShow = false
              this.uploadShow = false
            } else if (res.data.type === 3) {
              this.editorShow = false
              this.tableShow = true
              this.uploadShow = false
            } else {
              this.editorShow = false
              this.tableShow = false
              this.uploadShow = true
            }
          } else {
            this.$message.error(res.resultDesc)
          }
        })
    },

    text (val) {
      this.tinymceHtml = val
    },
    // 富文本弹框确定按钮
    editorOk () {
      this.$store.commit('setTinymceHtml', this.tinymceHtml)
      this.editorVisible = false
    },

    tableTitle (val) {
      this.title = val
    },
    tableContent (val) {
      this.content = val
    },
    // 添加表格弹框确定按钮
    addTableOk () {
      if (!this.title || !this.content) {
        this.$message.error('请输入标题和内容')
      } else {
        const obj = {
          tableId: 0,
          headerContent: this.title,
          bodyContent: this.content
        }
        this.$store.commit('setTable', obj)
        this.addTableVisible = false
        this.title = ''
        this.contant = ''
        this.$message.success('添加成功')
      }
    },

    // 删除表格
    delTable (item) {
      const index = this.$store.state.Table.findIndex(e => item.headerContent === e.headerContent)
      console.log(index, 'index')
      this.$store.state.Table.splice(index, 1)
    },

    editTableTitle (val) {
      this.editTitle = val
    },
    editTableContent (val) {
      this.editContent = val
    },
    // 编辑表格
    editTable (text, record, index) {
      this.editTableVisible = true
      this.tableText = text
      this.tableIndex = index
    },
    // 编辑表格弹框确定按钮
    editTableOk () {
      this.editTableVisible = false
      const item = this.$store.state.Table.splice(this.tableIndex, 1)[0]

      item.headerContent = this.editTitle
      item.bodyContent = this.editContent
      this.tableData.splice(this.tableIndex, 0, item)
      console.log(this.tableIndex, 'index')
    },

    uploadName (val) {
      this.name = val
    },
    uploadUrl (val) {
      this.url = val
    },
    // 文件上传确定按钮
    uploadOk () {
      if (!this.name || !this.url) {
        this.$message.error('请输入名称和上传的文件')
      } else {
        const obj = {
          fileName: this.name,
          fileUrl: this.url,
          fileId: 0
        }
        this.$store.commit('setUpload', obj)
        this.uploadVisible = false
        this.name = ''
        this.url = ''
        this.$message.success('上传成功')
      }
    },
    // 删除单个文件
    delUpload (item) {
      const index = this.$store.state.upload.findIndex(e => item.fileName === e.fileName)
      console.log(index, 'index')
      this.$store.state.upload.splice(index, 1)
    },

    // 保存
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          const obj = {
            title: values.title,
            accountId: this.details.accountId,
            contentId: this.details.contentId,
            text: this.$store.state.tinymceHtml,
            files: this.$store.state.upload,
            tables: this.$store.state.Table
          }
          ContentSave(obj)
            .then(res => {
              if (res.resultCode === '200') {
                this.$message.success('编辑成功')
                this.$emit('success')
                this.$store.commit('setTinymceHtml', '')
                this.$store.commit('clearUpload')
                this.$store.commit('clearTable')
              } else {
                this.$message.error(res.resultDesc)
              }
            })
        }
      })
    },

    // 取消
    cancel () {
      this.$emit('close')
      this.$store.commit('setTinymceHtml', '')
      this.$store.commit('clearUpload')
      this.$store.commit('clearTable')
    }
  },
  mounted () {
    this.userList()
    this.menuList()
    this.contentList()
    this.$store.commit('setTinymceHtml', '')
    this.$store.commit('clearUpload')
    this.$store.commit('clearTable')
  },
  watch: {
    visible (val) {
      if (val) {
        this.form = this.$form.createForm(this)
        this.userList()
        this.menuList()
        this.contentList()
        this.$store.commit('setTinymceHtml', '')
        this.$store.commit('clearUpload')
        this.$store.commit('clearTable')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.case{
  display: inline-block;
  height: 30px;
  line-height: 30px;
  padding: 0 5px;
  background: #f3f3f3;
  border-radius: 5px;
  margin-right: 10px;
}
.operation{
  color: #1890FF;
  a{
    margin: 5px;
  }
}
</style>

<style scoped>
.box >>> .ant-input{
  width: 400px;
}
.box >>> .ant-table-wrapper{
  margin-bottom: 24px;
}
</style>
