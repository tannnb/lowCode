<template>
  <div class="work-detail-container">
    <a-row type="flex" justify="center" v-if="template">
      <a-col :span="8" class="cover-img">
        <img :src="template.coverImg" alt="">
      </a-col>
      <a-col :span="8">
        <h2>{{template.title}}</h2>
        <p>{{template.title}}</p>
        <div class="author">
          <a-avatar>V</a-avatar>该模版 <b>{{template.author}}</b>创作
        </div>
        <div class="bar-code-area" >
          <span>扫一扫，手机预览</span>
          <div ref="container"></div>
        </div>
        <div class="use-button">
          <router-link to="/editor">
            <a-button type="primary" size="large">使用模版</a-button>
          </router-link>
          <a-button size="large">下载图片海报</a-button>
          <input type="file" @change="handleFileChange">
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store'
import axios from 'axios'

export default defineComponent({
  name: 'TemplateDetail',
  setup () {
    const route = useRoute()
    const store = useStore<GlobalDataProps>()
    const currentId = route.params.id as string
    const template = computed(() => store.getters.getTemplateById(parseFloat(currentId)))
    const handleFileChange = (e:Event) => {
      const target = e.target as HTMLInputElement
      const files = target.files
      if (files) {
        const uploadedFile = files[0]
        const formData = new FormData()
        formData.append(uploadedFile.name, uploadedFile)
        console.log('formData:', formData)
        axios.post('http://www.upload.com/upload', formData, {
          headers: {
            'Content-type': 'multipart/form-data'
          }
        }).then(resp => {
          console.log(resp.data)
        })
      }
    }
    return {
      route,
      template,
      handleFileChange
    }
  }
})
</script>

<style lang="less" scoped>
.work-detail-container {
  margin-top:50px;
  .cover-img {
    margin-right: 30px;
    img {
      width: 100%;
    }
  }
  .use-button {
    margin: 30px 0;
  }
  .ant-avatar {
    margin-right: 10px;
  }
  .bar-code-area {
    margin: 20px 0;
  }
}
</style>
