<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider
      :trigger="null"
      collapsible
      width = "256"
      v-model="collapsed"
    >
      <div class="logo">
        i wealth
      </div>
      <a-menu theme="dark" mode="inline">
        <a-menu-item key="1">
          <router-link to="/user">
            <a-icon type="user" />
            <span>账号管理</span>
          </router-link>
        </a-menu-item>
        <a-sub-menu key="2">
        <span slot="title"><a-icon type="setting" /><span> 内容管理</span></span>
          <a-menu-item v-for="(item,index) in data" :key="index">
            <router-link :to="{name:'New',query:{id:item.accountId}}">
              <span>&nbsp;{{item.name}}</span>
            </router-link>
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="()=> collapsed = !collapsed"
        />
        <div id="components-popover-demo-placement" class="user">
          <div :style="{ marginLeft: `${buttonWidth}px`, clear: 'both', whiteSpace: 'nowrap' }">
            <a-popover placement="bottomRight">
              <template slot="content">
                <a href="#" @click="quit">退出登录</a>
              </template>
              <a href="#">admin</a>
            </a-popover>
          </div>
        </div>
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import { AccountList } from '@/api'
export default {
  data () {
    return {
      collapsed: false,

      buttonWidth: 70,
      data: []
    }
  },
  methods: {
    // 退出
    quit () {
      localStorage.removeItem('name')
      this.$router.push('/login')
    }
  },
  mounted () {
    AccountList()
      .then(res => {
        if (res.resultCode === '200') {
          this.data = res.data
        } else {
          this.$message.error(res.resultDesc)
        }
      })
  }
}
</script>

<style>
#components-layout-demo-custom-trigger{
  height: 100vh;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color .3s;
}
.user{
  float: right;
  padding-right: 50px;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  line-height: 32px;
  background: rgba(255,255,255,.2);
  margin: 16px;
  text-align: center;
  color: #fff;
}

#components-layout-demo-custom-trigger .ant-layout-sider {
  float: left;
  height: 100%;
}
</style>
