<template>
    <nav>
      <Logo />
      <ul class="flex space-x-2 my-8 mx-5">
        <li>
          <nuxt-link to="/" class="p-2 rounded bg-indigo-200 hover:bg-purple-300 transition-all">Início</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/membros?page=1" class="p-2 rounded bg-indigo-200 hover:bg-purple-300 transition-all">Membros</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/tarefas" class="p-2 rounded bg-indigo-200 hover:bg-purple-300 transition-all">Tarefas</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/login" v-if="!isLogged" class="p-2 rounded bg-indigo-200 hover:bg-purple-300 transition-all">Login</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/sobre" class="p-2 rounded bg-indigo-200 hover:bg-purple-300 transition-all">Sobre</nuxt-link>
        </li>
      </ul>
    </nav>
</template>

<script>
export default {
  data (){
    return{
      currentUser: null
    }
  },
  computed: {
    isLogged(){
      return this.currentUser !== null
    }
  },
  async fetch() {
    try {
      this.$axios.setHeader('Authorization', `Bearer ${localStorage.getItem('token')}`)
      const result = await this.$axios.$get('http://localhost:8080/users/current')
      this.currentUser = result
    } catch {
      this.currentUser = null
    }
  },
  methods: {
    logout(){
      localStorage.setItem('token', undefined)
      this,currentUser = null
    }
  }
}
</script>