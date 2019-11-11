const mutations = {
  setTinymceHtml: (state, value) => {
    state.tinymceHtml = value
  },

  setUpload: (state, obj) => {
    state.upload.push(obj)
  },
  clearUpload: state => {
    state.upload = []
  },

  setTable: (state, obj) => {
    state.Table.push(obj)
  },
  clearTable: state => {
    state.Table = []
  }
}

export default mutations
