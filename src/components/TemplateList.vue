<template>
<div class="template-list-component">
  <a-row :gutter="16">
    <a-col :span="6" v-for="item in list" :key="item.id" class="poster-item">

      <router-link :to="{ name: 'template', params: { id: item.id }}">
        <a-card hoverable>
          <template v-slot:cover>
            <img :src="item.coverImg"  v-if="item.coverImg" />
            <img src="http://typescript-vue.oss-cn-beijing.aliyuncs.com/vue-marker/5f81cca3f3bf7a0e1ebaf885.png"  v-else />
            <div class="hover-item">
              <a-button size="large" type="primary">使用该模版创建</a-button>
            </div>
          </template>
          <a-card-meta :title="item.title">
            <template v-slot:description>
              <div class="description-detail">
                <span>作者：{{item.author}}</span>
                <span class="user-number">{{item.copiedCount}}</span>
              </div>
            </template>
          </a-card-meta>
        </a-card>
      </router-link>

      </a-col>
  </a-row>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'TemplateList',
  props: {
    list: {
      type: Array,
      required: true
    }
  }
})
</script>

<style lang="less" scoped>
.poster-item {
  position: relative;
  margin-bottom: 20px;
  .ant-card {
    border-radius: 12px;
  }
  .ant-card-cover {
    height: 390px;
    > img {
      width: 100%;
    }
  }
  .ant-card-hoverable {
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
  }
  .ant-card-body {
    padding: 0
  }
  .ant-card-meta {
    margin: 0;
  }
  .ant-card-meta-title {
    color: #333;
    padding: 10px 12px;
    border-bottom: 1px solid #f2f2f2;
    margin-bottom: 0 !important;
  }
  .description-detail {
    display: flex;
    justify-content: space-between;
    padding: 13px 12px;
    color: #999;
  }
  .user-number {
    font-weight: bold;
  }
  .poster-title {
    height: 70px;
    h2 {
      margin-bottom: 0px;
    }
  }

  .ant-card-cover {
    position: relative;
    overflow: hidden;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    .hover-item {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      display: none;
      background: rgba(0, 0, 0, .8);
      align-items: center;
      justify-content: center;
      border-top-left-radius: 12px;
      border-top-right-radius: 12px;
    }
    img {
      transition: all ease-in .2s;
    }
  }

  &:hover {
    .hover-item {
      display: flex;
    }
    img {
      transform: scale(1.25);
    }
  }
  .barcode-container img {
    border-radius: 0;
  }
}
</style>
