<template>
  <div>
      <h1>{{id ? '编辑':'新建'}}物品</h1>
      <el-form  label-width="120px" @submit.native.prevent="save">
          <el-form-item label="名称">
            <el-input v-model="model.name" placeholder="请输入新建物品的名称"></el-input>
          </el-form-item>
          <el-form-item label="图标">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="getAuthHeaders()"
              :show-file-list="false"
              :on-success="afterUpload">
              <img v-if="model.icon" :src="model.icon" class="avatar">
              <i v-else class="avatar-uploader-icon el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" native-type="submit">保存</el-button>
          </el-form-item>          
      </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data () {
    return {
      model: {}
    }
  },
  methods: {
    afterUpload (res) {
      console.log(res)

      this.$set(this.model, 'icon', res.url) // vue提供的使用方法，在开始定义的model中添加icon字段，并且赋值
      // this.model.icon = res.url
    },
    async save() {
      console.log("save");
      let res
      if(this.id) {
        res = await this.$http.put(`rest/items/${this.id}`, this.model)
      } else {
        res = await this.$http.post('rest/items', this.model)
      }
      this.$router.push('/items/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    async fetch() {
      const res = await this.$http.get(`rest/items/${this.id}`)
      this.model = res.data
    }
  },
  created () {
    this.id && this.fetch()
  }

}
</script>

<style>

</style>