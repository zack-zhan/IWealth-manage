<template>
  <div class="box">
    <div class="line">
      名称：<a-input v-model="name"/>
      <a-upload
        :customRequest="customRequest"
        :showUploadList="false"
        :data="dataObj"
      >
        <a-button>上传</a-button>
      </a-upload>
    </div>
  </div>
</template>

<script>
import { upload } from '@/utils/ossclient'
export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      name: '',
      url: '',

      dataObj: {}
    }
  },
  watch: {
    name (val) {
      this.$emit('name', val)
    },
    visible (val) {
      this.name = ''
      this.url = ''
    }
  },
  methods: {
    customRequest (request) {
      upload(request.file, p => console.log(p)).then(res => {
        const tmpcnt = request.file.name.lastIndexOf('.')
        const ext = request.file.name.substring(tmpcnt + 1)
        if (ext === 'pdf') {
          this.$emit('url', res.url)
        } else {
          this.$message.error('文件格式上传错误')
        }
      })
    }
  }
}
</script>

<style scoped>
.box >>> .ant-input{
  width: 320px;
}
</style>
