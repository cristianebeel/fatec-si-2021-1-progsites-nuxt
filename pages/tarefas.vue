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
                <li v-for="task of taskList"
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
export default {
    data(){
        return{
            inputText: '',
            taskList: [],
            waiting: false
        }
    },

    async fetch(){
        try{
            this.waiting = true
            this.taskList = await this.$axios.$get('http://localhost:8080/todos')
            this.taskList.forEach(i => i.createdAt = new Date(i.createdAt))
            for(let i of this.taskList){
                // i.createdAt = i.createdAt.substr(0,10) pega somente a data
                i.createdAt = new Date(i.createdAt) //transforma em dara pq o axios salva como string
            }
        }catch{
            alert('Ops! Parece que deu erro...')
        }finally{
            this.waiting = false
        }
    },

    filters: {
        dateToString(value){
            //return value.toISOString()
            return value.toLocaleString('pt-BR')
        }
    },

    methods: {
        async addTask(){
            try{
                /*await fetch({
                    url: 'http://localhost:8080/todos',
                    method: 'POST',
                    body: {
                        text: this.inputText,
                        createdAt: new Date()
                    }
                })*/

                const task = {
                    text: this.inputText,
                    createdAt: new Date()
                }

                await this.$axios.$post('http://localhost:8080/todos', task)
                
                this.$fetch()
                this.inputText = ''
            }
            catch{
                alert('Erro ao criar tarefa.')
            }
        },

        async toggleTask(task){
            await this.$axios.$put(`http://localhost:8080/todos/${task._id}`, {
                text: task.text,
                createdAt: task.createdAt,
                updatedAt: new Date(),
                done: !task.done
            })
            this.$fetch()
        },

        async deleteTask(task){
            try{
                await this.$axios.$delete(`http://localhost:8080/todos/${task._id}`)
                this.$fetch()
            }catch{
                alert('Erro na exclusão')
            }finally{
                this.waiting = false
            }
        }
    }
}
</script>