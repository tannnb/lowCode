<template>
  <div class="file-upload">
    <div class="upload-area" @click="triggerUpload">
      <slot v-if="isUploading" name="loading">
        <button disabled>正在上传</button>
      </slot>
      <slot name="uploaded" v-else-if="lastFileData && lastFileData.loaded" :uploadedData="lastFileData.data">
        <button>点击上传</button>
      </slot>
      <slot v-else name="default">
        <button>点击上传</button>
      </slot>
    </div>
    <input
      style="display: none"
      ref="fileInput"
      type="file"
      @change="handleFileChange"
    />
    <ul>
      <li
        :class="`uploaded-file upload-${file.status}`"
        v-for="file in uploadedFiles"
        :key="file.uid">
        <span v-if="file.status === 'loading'" class="file-icon"><LoadingOutlined/></span>
        <span v-else class="file-icon"><FileOutlined/></span>
        <span class="fileName">{{file.name}}</span>
        <button class="delete-icon" @click="removeFile(file.uid)"><DeleteOutlined/></button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed, PropType } from 'vue'
import axios from 'axios'
import { last } from 'lodash-es'
import { DeleteOutlined, LoadingOutlined, FileOutlined } from '@ant-design/icons-vue'
import { v4 as uuidv4 } from 'uuid'
type UploadStatus = 'ready' | 'loading' | 'success' | 'error'
type CheckUpload = (file:File) => boolean | Promise<File>
export interface UploadFile {
  uid:string;
  size: number;
  name:string;
  status:UploadStatus;
  raw:File;
  resp?: any;
}

export default defineComponent({
  name: 'Uploader',
  components: {
    DeleteOutlined,
    LoadingOutlined,
    FileOutlined
  },
  props: {
    action: {
      type: String,
      required: true
    },
    beforeUpload: {
      type: Function as PropType<CheckUpload>
    }
  },
  setup (props) {
    const fileInput = ref<null | HTMLInputElement>(null)
    const fileStatus = ref<UploadStatus>('ready')
    const uploadedFiles = ref<UploadFile[]>([])

    const isUploading = computed(() => {
      return uploadedFiles.value.some(file => file.status === 'loading')
    })
    const lastFileData = computed(() => {
      const lastFile = last(uploadedFiles.value)
      if (lastFile) {
        return {
          loaded: lastFile.status === 'success',
          data: lastFile.resp
        }
      }
      return false
    })

    const removeFile = (uid:string) => {
      return uploadedFiles.value.filter(file => file.uid !== uid)
    }
    const triggerUpload = () => {
      if (fileInput.value) {
        fileInput.value.click()
      }
    }
    const postFile = (uploadFiles:UploadFile) => {
      const formData = new FormData()
      fileStatus.value = 'loading'
      formData.append(uploadFiles.name, uploadFiles)
      const fileObj = reactive<UploadFile>({
        uid: uuidv4(),
        size: uploadFiles.size,
        name: uploadFiles.name,
        status: 'loading',
        raw: uploadFiles
      })
      uploadedFiles.value.push(fileObj)
      axios.post(props.action, formData, {
        headers: {
          'Content-type': 'multipart/form-data'
        }
      }).then((resp) => {
        fileObj.status = 'success'
        fileObj.resp = resp.data
      }).catch(() => {
        fileObj.status = 'error'
      }).finally(() => {
        if (fileInput.value) {
          fileInput.value.value = ''
        }
      })
    }

    const handleFileChange = (e:Event) => {
      const target = e.target as HTMLInputElement
      const files = target.files
      if (files) {
        const uploadFiles = files[0]
        if (props.beforeUpload) {
          const result = props.beforeUpload(uploadFiles)
          if (result && result instanceof Promise) {
            result.then(processFile => {
              if (processFile instanceof File) {
                postFile(processFile)
              } else {
                throw new Error('beforeUpload Promise should return File object')
              }
            }).catch(e => {
              console.error(e)
            })
          } else if (result === true) {
            postFile(uploadFiles)
          }
        } else {
          postFile(uploadFiles)
        }
      }
    }

    return {
      fileInput,
      fileStatus,
      isUploading,
      uploadedFiles,
      lastFileData,
      triggerUpload,
      handleFileChange,
      removeFile
    }
  }
})
</script>

<style lang="less">
.upload-list {
  margin: 0;
  padding: 0;
  list-style-type: none;
}
.upload-list li {
  transition: all .5s cubic-bezier(.55,0,.1,1);
  font-size: 14px;
  line-height: 1.8;
  margin-top: 5px;
  box-sizing: border-box;
  border-radius: 4px;
  min-width: 200px;
  position: relative;
  &:first-child {
    margin-top: 10px;
  }
  .upload-list-thumbnail {
    vertical-align: middle;
    display: inline-block;
    width: 70px;
    height: 70px;
    position: relative;
    z-index: 1;
    background-color: #fff;
    object-fit: cover;
  }
  .file-icon {
    svg {
      margin-right: 5px;
      color: rgba(0, 0, 0, 0.45);
    }
  }
  .filename {
    margin-left: 5px;
    margin-right: 40px;
  }
  &.upload-error {
    color: #f5222d;
    svg {
      color: #f5222d;
    }
  }
  .file-status {
    display: block;
    position: absolute;
    right: 5px;
    top: 0;
    line-height: inherit;
  }
  .delete-icon {
    display: none;
    position: absolute;
    right: 7px;
    top: 0;
    line-height: inherit;
    cursor: pointer;
  }
  &:hover {
    background-color: #efefef;
    .file-status {
      display: none;
    }
    .delete-icon {
      display: block;
    }
  }
}
</style>
