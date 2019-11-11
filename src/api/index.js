import axios from 'axios'

// 全局基准路径
axios.defaults.baseURL = '//api.iwealthmanagement.net'

// 登录
export const AdminLogin = (obj) => axios.post('/api/Login/AdminLogin', obj).then(res => res.data)

// 获取用户信息
export const AccountList = () => axios.get('/api/Account/List').then(res => res.data)
// 添加账号
export const AccountAdd = (obj) => axios.post('/api/Account/Add', obj).then(res => res.data)
// 更新账号
export const AccountUpdate = (obj) => axios.post('/api/Account/Update', obj).then(res => res.data)
// 删除账号
export const AccountDelete = (obj) => axios.post('/api/Account/Delete', obj).then(res => res.data)

// 获取菜单列表
export const GetMenus = () => axios.get('/api/Menu/GetMenus').then(res => res.data)

// 获取信息列表
export const ContentList = () => axios.get('/api/Content/List').then(res => res.data)
export const ContentLists = (id) => axios.get('/api/Content/List?accountId=' + id).then(res => res.data)
// 获取信息列表
export const ContentGet = (obj) => axios.get(`/api/Content/Get?accountId=${obj.accountId}&contentId=${obj.contentId}`).then(res => res.data)

// 更新信息
export const ContentSave = (obj) => axios.post('/api/Content/Save', obj).then(res => res.data)
