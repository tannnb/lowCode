<template>
  <div class="file-upload">
    <button @click="triggerUpload" :disabled="isUploading">
      <span v-if="isUploading">正在上传</span>
      <span v-else>点击上传</span>
    </button>
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
        <span class="fileName">{{file.name}}</span>
        <button class="delete-icon" @click="removeFile(file.uid)">Del</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed } from 'vue'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
type UploadStatus = 'ready' | 'loading' | 'success' | 'error'

export interface UploadFile {
  uid:string;
  size: number;
  name:string;
  status:UploadStatus;
  raw:File;
}

export default defineComponent({
  name: 'Uploader',
  props: {
    action: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const fileInput = ref<null | HTMLInputElement>(null)
    const fileStatus = ref<UploadStatus>('ready')
    const uploadedFiles = ref<UploadFile[]>([])
    const isUploading = computed(() => {
      return uploadedFiles.value.some(file => file.status === 'loading')
    })

    const removeFile = (uid:string) => {
      return uploadedFiles.value.filter(file => file.uid !== uid)
    }

    const triggerUpload = () => {
      if (fileInput.value) {
        fileInput.value.click()
      }
    }

    const handleFileChange = (e:Event) => {
      const target = e.target as HTMLInputElement
      const files = target.files
      if (files) {
        const uploadFiles = files[0]
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
        }).catch(() => {
          fileObj.status = 'error'
        }).finally(() => {
          if (fileInput.value) {
            fileInput.value.value = ''
          }
        })
      }
    }
    return {
      fileInput,
      fileStatus,
      isUploading,
      uploadedFiles,
      triggerUpload,
      handleFileChange,
      removeFile
    }
  }
})
</script>

<style scoped>

</style>
