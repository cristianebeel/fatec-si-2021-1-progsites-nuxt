<template>
  <div id="page">
    <SideMenu :items="[
        {link: '/artigos', text:'Artigos'},
        {link: '/livros', text:'Livros'},
        {link: '/receitas', text:'Receitas'}
      ]"
      :isDark="clickCount%2===0"
    />
    <div>
      <PageTitle>Página Inicial</PageTitle>
      <p>Olá mundo!</p>
      <img :src="cartoonImage" alt="Exo" class="object-cover h-80">
      <div class="my-2 space-x-7">
        <button @click="increments"
                class="bg-gray-300 px-4 py-1 rounded">
          Clique-me
        </button>
        <input type="text" v-model="name" placeholder="Qual seu nome?">
      </div>
      <nuxt-link to="/sobre" :class="linkClasses">
        Saiba mais sobre nós
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  data(){ 
    return {
      name: '',
      clickCount: 0
    }
  },
  computed: {
    linkClasses() {
      if(this.name)
        return 'underline text-yellow-600'
      else
        return 'underline text-pink-400'
    },
    cartoonImage() {
      if(this.name)
        return require('~/assets/img/exo-4.jpg')
      else
        return require('~/assets/img/exo-0.jpg')
    }
  },
  methods: {
    increments() {
      this.clickCount++
    }
  }
}
</script>