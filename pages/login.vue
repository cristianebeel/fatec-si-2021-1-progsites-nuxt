<template>
    <form>
        <input type="email" v-model="email" placeholder="Digite seu e-mail">
        <input type="text" v-model="password" placeholder="Digite sua senha">
    </form>
</template>

<script>
export default {
    data(){
        return{
            waiting: false,
            email: '',
            password: ''
        }
    },

    methods: {
        async login(){
            try{
                const loginData = {
                    email: this.email,
                    password: this.password
                }
                
                const resultado = await this.$axios.$post('http://localhost:8080/users/login', loginData)

                localstorage.setItem('token', result.token)
                this.$router.push('/')
            }catch{
                alert('Login inválido!')
            }
        }
    }
}
</script>