<!--  -->
<template>
  <h1 class="Hello-container">
    {{msg}}
  </h1>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Hello',
  props: {
    msg: String
  }
})
</script>

<style lang="scss" scoped>
.Hello-container {
  width: 100%;
}
</style>
