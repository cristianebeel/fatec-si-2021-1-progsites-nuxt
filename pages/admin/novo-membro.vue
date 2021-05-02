<template>
<form class="p-8 flex flex-col gap-3" @submit.prevent="onSubmit">
    <input v-model="name" type="text" placeholder="Nome">
    <input v-model="role" type="text" placeholder="Posição">
    <input v-model="year" type="number" placeholder="Ano">
    <select v-model="image">
        <option value=""></option>
        <option value="exo-0.jpg">Cartoon</option>
    </select>
    <button class="bg-green-200 hover:bg-green-500">Salvar</button>
</form>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
    name: 'NovoMembro',

    data(){
        return{
            name: '',
            role: '',
            year: '',
            image: ''
        }
    },

    methods: {
        onSubmit(){
            const id = Math.random() * 1000
            const membro = {
                id: id,
                path: `/integrantes/${id}`,
                name: this.name,
                role: this.role,
                year: this.year,
                image: require(`~/assets/img/${this.image}`)
            }
            
            this.$store.commit('integrantes/addMember', membro)
            
            this.name = '',
            this.role = '',
            this.year = '',
            this.image = ''
        }
    }
}
</script>