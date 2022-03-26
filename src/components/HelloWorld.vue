<!--  -->
<template>
  <div class="HelloWorld-container">
    <h1>HelloWorld大标题</h1>
    <button @click="hanldeClick">{{btnRef}}</button>
    <input type="text" v-model="todo">
    <button class="addTodo" @click="addTodo">addTodo</button>
    <ul>
      <li v-for="(todo,index) in todos" :key="index">{{todo}}</li>
    </ul>
    <Hello msg="123" />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import Hello from './Hello.vue'

export default defineComponent({
  name: 'HelloWorld',
  components: { Hello },
  props: {
    msg: String
  },
  emits: ['send'],
  setup (props, context) {
    const btnRef = ref(100)
    function hanldeClick () {
      btnRef.value += 1
    }

    const todo = ref('')
    const todos = ref([])
    const addTodo = () => {
      if (todo.value) {
        todos.value.push(todo.value)
        context.emit('send', todo.value)
      }
    }

    return {
      hanldeClick,
      btnRef,
      todo,
      addTodo,
      todos
    }
  }
})
</script>

<style lang="scss" scoped>
.HelloWorld-container {
  width: 100%;
}
</style>
