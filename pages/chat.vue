<template>
    <div>
        <span v-if="waiting" class="mt-6">Aguarde...</span>
        <template v-else>
            <div class="flex flex-row w-full max-w-screen mt-3 gap-4 justify-center">
                <input type="text" v-model="username" placeholder="Digite seu username"
                    class="w-2/5 p-2 border border-gray-500 rounded outline-none
                    hover:border-blue-300 focus:ring focus:ring-blue-200">
            </div>
            <div class="flex flex-col mx-auto mt-6 w-3/5 p-4 space-y-4
                        overflow-y-auto h-64 bg-gray-50 rounded">
                <p v-for="msg of sortedMessages" :key="msg._id"
                    class="flex justify-end items-center px-4 py-2 w-full bg-gray-100 rounded-2xl hover:bg-gray-200 gap-5">
                    <span class="text-gray-700 text-sm">{{ msg.author }}:</span>
                    <span class="flex-1 text-gray-900 text-base">{{ msg.text }}</span>
                    <small class="text-xs text-gray-500">{{ msg.createdAt | dateToString }}</small>
                    <button @click.left="deleteMsg(msg)" class="text-xs text-red-400 cursor-pointer hover:text-red-500">excluir</button>
                </p>
            </div>
            <form @submit.prevent="addMessage" class="flex flex-col mx-auto w-3/5 mt-7 gap-3">
                <textarea v-model="newMessage" type="text" placeholder="Digite sua mensagem"
                    class="w-full border border-gray-500 rounded px-2 py-1 outline-none
                    hover:border-blue-300 focus:ring focus:ring-blue-200"></textarea>
                <div class="flex justify-end gap-4 m-3">
                    <button type="reset" class="px-5 py-1 bg-red-300 rounded transition-all
                    hover:bg-red-400 focus:bg-red-500">Limpar</button>
                    <button class="px-3 py-1 bg-green-300 rounded transition-all
                    hover:bg-green-400 focus:bg-green-500">
                    Adicionar
                </button>
                </div>
            </form>
        </template>
    </div>
</template>

<script>
import io from 'socket.io-client'

export default {
    data(){
        return{
            waiting: false,
            newMessage: '',
            author: '',
            messages: []
        }
    },

    mounted(){
        const socket = io('http://localhost:8080')

        socket.on('chat-created', created => {
            this.messages.push(created)
        }),

        socket.on('chat-removed', removed => {
            this.messages = this.messages.filter(msg => msg._id !== removed._id)
        })
    },

    async fetch(){
        try{
            this.waiting = true
            this.messages = await this.$axios.$get('http://localhost:8080/chat')
            this.messages.forEach(t => t.createdAt = new Date(t.createdAt))
        }catch{
            alert('Ops! Parece que deu erro...')
        }finally{
            this.waiting = false
        }
    },

    filters: {
        dateToString(value){
            if(typeof value === 'string') value = new Date(value)
                return value.toLocaleString('pt-BR')
        }
    },
    
    computed: {
        sortedMessages(){
            return this.messages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        }
    },

    methods: {
        getUsername(){
            if(!this.username)
                alert("Por favor, digite um nome de usuário")
            else
                this.username 
        },

        async addMessage(){
            if(this.newMessage){
                try{
                    this.waiting = true
                    const msg = { author: this.username, text: this.newMessage }
                    const author = this.username
                    await this.$axios.$post('http://localhost:8080/chat', msg)
                    this.newMessage = ''
                }
                catch{
                    alert('Erro ao enviar mensagem.')
                }finally{
                    this.waiting = false
                }
            }else{
                alert('Por favor, digite sua mensagem')
            }
        },

        async deleteMsg(msg){
            try{
                this.waiting = true
                await this.$axios.$delete(`http://localhost:8080/chat/${msg._id}`)
            }catch{
                alert('Erro ao excluir mensagem')
            }finally{
                this.waiting = false
            }
        }
    }
}
</script>