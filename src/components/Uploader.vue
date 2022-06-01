<template>
  <div class="file-upload">
    <div class="upload-area"
         :class="{'is-dragover': drag && isDragOver }"
         v-on="events" >
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
        v-for="file in filesList"
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
    },
    drag: {
      type: Boolean,
      default: false
    },
    autoUpload: {
      type: Boolean,
      default: true
    }
  },
  setup (props) {
    const fileInput = ref<null | HTMLInputElement>(null)
    const fileStatus = ref<UploadStatus>('ready')
    const filesList = ref<UploadFile[]>([])
    const isDragOver = ref(false)

    const isUploading = computed(() => {
      return filesList.value.some(file => file.status === 'loading')
    })
    const lastFileData = computed(() => {
      const lastFile = last(filesList.value)
      if (lastFile) {
        return {
          loaded: lastFile.status === 'success',
          data: lastFile.resp
        }
      }
      return false
    })

    const removeFile = (uid:string) => {
      return filesList.value.filter(file => file.uid !== uid)
    }
    const triggerUpload = () => {
      if (fileInput.value) {
        fileInput.value.click()
      }
    }
    const postFile = (readyFile:UploadFile) => {
      const formData = new FormData()
      readyFile.status = 'loading'
      formData.append(readyFile.name, readyFile.raw)
      axios.post(props.action, formData, {
        headers: {
          'Content-type': 'multipart/form-data'
        }
      }).then((resp) => {
        readyFile.status = 'success'
        readyFile.resp = resp.data
      }).catch(() => {
        readyFile.status = 'error'
      }).finally(() => {
        if (fileInput.value) {
          fileInput.value.value = ''
        }
      })
    }
    const addFileToList = (uploadedFile:File) => {
      const fileObj = reactive<UploadFile>({
        uid: uuidv4(),
        size: uploadedFile.size,
        name: uploadedFile.name,
        status: 'loading',
        raw: uploadedFile
      })
      filesList.value.push(fileObj)
      if (props.autoUpload) {
        postFile(fileObj)
      }
    }
    const beforeUploadCheck = (files: null | FileList) => {
      if (files) {
        const uploadFiles = files[0]
        if (props.beforeUpload) {
          const result = props.beforeUpload(uploadFiles)
          if (result && result instanceof Promise) {
            result.then(processFile => {
              if (processFile instanceof File) {
                addFileToList(processFile)
              } else {
                throw new Error('beforeUpload Promise should return File object')
              }
            }).catch(e => {
              console.error(e)
            })
          } else if (result === true) {
            addFileToList(uploadFiles)
          }
        } else {
          addFileToList(uploadFiles)
        }
      }
    }

    const handleFileChange = (e:Event) => {
      const target = e.target as HTMLInputElement
      beforeUploadCheck(target.files)
    }
    const uploadFiles = () => {
      filesList.value.filter(file => file.status === 'ready').forEach(readyFile => postFile(readyFile))
    }
    let events :{[key:string]:(e:any) => void} = {
      click: triggerUpload
    }
    const handleDrag = (e:DragEvent, over:boolean) => {
      e.preventDefault()
      isDragOver.value = over
    }
    const handleDrop = (e:DragEvent) => {
      e.preventDefault()
      isDragOver.value = false
      if (e.dataTransfer) {
        handleFileChange(e.dataTransfer.files)
      }
    }

    if (props.drag) {
      events = {
        ...events,
        dragover: (e: DragEvent) => { handleDrag(e, true) },
        dragleave: (e: DragEvent) => { handleDrag(e, false) },
        drop: handleDrop
      }
    }

    return {
      fileInput,
      fileStatus,
      isUploading,
      filesList,
      lastFileData,
      isDragOver,
      events,
      triggerUpload,
      handleFileChange,
      removeFile,
      uploadFiles
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
