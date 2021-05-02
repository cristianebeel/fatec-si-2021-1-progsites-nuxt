<template>
    <div id="page" class="flex-col">
        <div>
            <PageTitle>Membros</PageTitle>
            <div class="grid grid-flow-row gap-6 px-4 mx-auto w-full sm:grid-cols-2 md:grid-flow-col md:grid-cols-3 md:w-11/12 xl:max-w-screen-xl">
                <MemberCard
                    v-for="member of currentMembers"
                    :key="member.id"
                    :path="member.path"
                    :name="member.name"
                    :role="member.role"
                    :year=member.year
                    :image="member.image"
                />
            </div>
        </div>
        <nav class="text-center p-6">
            <!-- <a href="#1" @click.prevent="goToPage(1)">1</a>
            <a href="#2" @click.prevent="goToPage(2)">2</a>
            <a href="#3" @click.prevent="goToPage(3)">3</a> -->
            <nuxt-link v-for="n in totalPages" :key="n" :to="`?page=${n}`">
                {{ n }}
            </nuxt-link>
            <!-- O ? é do HTML, é assim que ele identifica que ainda é o mesmo endereço mas com uma informação a mais -->
        </nav>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'Integrantes',

    data() {
        return{
            currentPage: 1
        }
    },

    computed: {
        ...mapState({
            integrantes: state => state.integrantes.membros
        }),

        totalPages(){
            return Math.ceil(this.integrantes.length / 3)
        },

        currentMembers() {
            return this.integrantes.slice(
                (this.currentPage - 1) * 3,
                (this.currentPage - 1) * 3 + 3
            )
        }
    },

    watch: {
        '$route.query': {
            immediate: true,

            handler(query) {
                this.currentPage = query.page
            }
        }
    }
    /* methods: {
        goToPage(n) {
            this.currentPage = n
        }
    } */
}
</script>