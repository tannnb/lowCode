<!--  -->
<template>
  <div class="HelloWorld-container">
    <h1>HelloWorld大标题</h1>
    <button>按钮</button>
    <Hello msg="123" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Hello from './Hello.vue'

export default defineComponent({
  name: 'HelloWorld',
  components: { Hello },
  props: {
    msg: String
  }
})
</script>

<style lang="scss" scoped>
.HelloWorld-container {
  width: 100%;
}
</style>
