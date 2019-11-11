<template>
  <div class="box">
    <div class="title">标题：<a-input v-model="title"/></div>
    <div class="content">内容：<a-textarea v-model="content" autosize/></div>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      title: '',
      content: ''
    }
  },
  watch: {
    title (val) {
      this.$emit('title', val)
    },
    content (val) {
      this.$emit('content', val)
    },
    visible (val) {
      this.title = ''
      this.content = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.title,.content{
  line-height: 32px;
}
.title{
  margin-bottom: 10px;
}
</style>
