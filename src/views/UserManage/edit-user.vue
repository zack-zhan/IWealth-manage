<template>
  <div class="box">
    <a-form
      :form="form"
      @submit="handleSubmit"
    >
      <a-form-item
        label="账号名"
        :label-col="{ span: 6 }"
      :wrapper-col="{ span: 12 }"
      >
        <a-input
          v-decorator="[
            'name',
            {rules: [{ required: true, message: '请输入用户名' }],initialValue: details.name}
          ]"
        />
      </a-form-item>
      <a-form-item
        label="密码"
        :label-col="{ span: 6 }"
      >
        <a-input
          v-decorator="[
            'password',
            {rules: [{ required: true, message: '请输入密码' }]}
          ]"
          type="password"
        />
      </a-form-item>
      <a-form-item
        label="确认密码"
        :label-col="{ span: 6 }"
      >
        <a-input
          v-decorator="[
            'newPassword',
            {rules: [{ required: true, message: '请输入确认密码' }]}
          ]"
          type="password"
        />
      </a-form-item>
      <a-form-item
        :wrapper-col="{ offset: 6 }"
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
  </div>
</template>

<script>
import { AccountUpdate } from '@/api'
export default {
  props: {
    details: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this)
    }
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          const obj = {
            name: values.name,
            password: values.password,
            newPassword: values.newPassword,
            accountId: this.details.accountId,
            accountType: 2
          }
          AccountUpdate(obj)
            .then(res => {
              if (res.resultCode === '200') {
                this.$message.success('保存成功')
                this.$emit('success')
                this.form = this.$form.createForm(this)
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
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

<style scoped>
.box >>> .ant-input{
  width: 400px;
}
</style>
