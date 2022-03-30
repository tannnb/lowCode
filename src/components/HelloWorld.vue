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

    <button  class="loadUser" @click="loadUser">请求</button>
    <div v-if='user.loading' class="loading">Loading</div>
    <div v-else class="userName">{{user.data && user.data.username}}</div>
    <div v-if='user.error' class="loaderroring">error!</div>

  </div>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue'
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

    const getData = () => {
      return Promise.resolve(setTimeout({ data: { username: '张三' } }, 100))
    }

    const user = reactive({
      data: null,
      loading: false,
      error: false
    })

    const loadUser = () => {
      user.loading = true
      getData().then(resp => {
        console.log('resp')
        user.data = resp.data
      }).catch(() => {
        user.error = true
      }).finally(() => {
        user.loading = false
      })
    }

    return {
      hanldeClick,
      btnRef,
      todo,
      addTodo,
      todos,
      user,
      loadUser
    }
  }
})
</script>

<style lang="scss" scoped>
.HelloWorld-container {
  width: 100%;
}
</style>
