<template>
    <aside class="flex flex-col rounded px-8 py-4"
        :class="{
        'bg-gray-600 text-white': isDark,
        'bg-gray-300 text-black': !isDark
    }">
        <PageTitle @action="onTitleClicked">Menu</PageTitle>
        {{ message }}
        <nuxt-link class="py-1 mx-auto"
            v-for="(item, index) of items"
            :key="index"
            :to="item.link"
        >
            {{ item.text }}
        </nuxt-link>
    </aside>
</template>

<script>
export default {
    name: 'SideMenu',
    props: {
        items: [],
        isDark: false
    },
    data() {
        return {
            message:''
        }
    },
    methods: {
        onTitleClicked() {
            this.message = 'Por favor, clique nas opções de menu!'
        }
    }
}
</script>
