<template>
  <div class="box">
    <div class="title">标题：<a-input v-model="title"/></div>
    <div class="content">内容：<a-textarea v-model="content" autosize/></div>
  </div>
</template>

<script>
export default {
  props: {
    tableText: {
      type: Object,
      default: function () {
        return {}
      }
    },
    // tableIndex: {
    //   type: Number,
    //   required: true
    // },
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
  mounted () {
    this.title = this.tableText.headerContent
    this.content = this.tableText.bodyContent
    this.$emit('editTitle', this.title)
    this.$emit('editContent', this.content)
  },
  watch: {
    visible (val) {
      this.title = this.tableText.headerContent
      this.content = this.tableText.bodyContent
      if (!val) {
        this.title = ''
        this.content = ''
      }
    },
    title (val) {
      this.$emit('editTitle', val)
    },
    content (val) {
      this.$emit('editContent', val)
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
