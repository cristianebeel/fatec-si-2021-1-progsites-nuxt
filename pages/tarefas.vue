<template>
    <div>
        <span v-if="waiting" class="mt-6">Aguarde...</span>
        <template v-else>
            <form @submit.prevent="addTask" class="flex w-full max-w-screen-xl mt-3 gap-3">
                <input v-model="inputText" type="text" placeholder="O que precisa ser feito?"
                    class="w-full border border-gray-500 rounded px-2 py-1 outline-none
                    focus:ring-blue-500 hover:border-blue-500 focus:ring focus:ring-blue-50">
                <button class="px-3 py-1 bg-blue-300 rounded transition-all
                    hover:bg-blue-400 focus:bg-blue-500"
                >
                    Adicionar
                </button>
            </form>
            <ul v-if="taskList.length"
                class="mt-6 w-full max-w-screen-xl border border-gray-500
                    rounded-lg p-4 divide-y divide-gray-300 bg-gray-100"
            >
                <li v-for="task of sortedTasks"
                    :key="task._id"
                    class="flex items-center px-2 py-1 cursor-pointer hover:bg-blue-200"
                    @click.left="toggleTask(task)"
                    @click.right="deleteTask(task)"
                    :class="{
                        'line-through': task.done
                    }"
                >
                    <span class="flex-1">{{ task.text }}</span>
                    <small class="text-gray-600">{{ task.createdAt | dateToString }}</small>
                </li>
            </ul>
        </template>
    </div>
</template>

<script>
import io from 'socket.io-client'

export default {
    data(){
        return{
            waiting: false,
            inputText: '',
            taskList: []
        }
    },

    mounted(){
        const socket = io('http://localhost:8080')

        socket.on('todo-created', created => {
            this.taskList.push(created)
        })

        socket.on('todo-updated', update => {
            const task = this.taskList.find(t => t._id === updated._id)
            task.done = updated.done
        })

        socket.on('todo-removed', removed =>{
            this.taskList = this.taskList.filter(t => t._id !== removed._id)
        })
    },

    async fetch(){
        try{
            this.waiting = true
            this.taskList = await this.$axios.$get('http://localhost:8080/todos')
            this.taskList.forEach(t => t.createdAt = new Date(t.createdAt))
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
        sortedTasks(){
            // Ordem alfabética
            //return this.taskList.sort((a, b) => a.text.localeCompare(b.text))

            //Ordem de data de criação
            return this.taskList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        }
    },

    methods: {
        async addTask(){
            try{
                this.waiting = true
                const task = { text: this.inputText }

                await this.$axios.$post('http://localhost:8080/todos', task)
                this.inputText = ''
            }
            catch{
                alert('Erro ao criar tarefa.')
            }finally{
                this.waiting = false
            }
        },

        async toggleTask(task){
            try{
                this.waiting = true
                await this.$axios.$put(`http://localhost:8080/todos/${task._id}`, {
                    text: task.text,
                    createdAt: task.createdAt,
                    updatedAt: new Date(),
                    done: !task.done
                })
            }catch{
                alert('Erro ao atualizar')
            }finally{
                this.waiting = false
            }
        },

        async deleteTask(task){
            try{
                this.waiting = true
                await this.$axios.$delete(`http://localhost:8080/todos/${task._id}`)
            }catch{
                alert('Erro na exclusão')
            }finally{
                this.waiting = false
            }
        }
    }
}
</script>