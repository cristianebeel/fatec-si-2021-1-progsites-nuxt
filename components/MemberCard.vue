<template>
    <nuxt-link :to="path">
        <article class="rounded-2xl shadow border-gray-800 bg-white w-auto h-auto">
            <img v-if="image" :src="image" :alt="name"
                class="rounded-t-2xl w-full">
            <div class="pt-3 pb-7 text-center">
                <h2 class="text-green-700 font-bold text-lg">{{ name }}</h2>
                <strong class="text-gray-800 text-base">{{ role }}</strong>
                <p class="text-sm">{{ year }}</p>
            </div>
        </article>
    </nuxt-link>
</template>

<script>
export default {
    name: 'MemberCard',
    props: {
        path:{
            type: String,
            default: ''
        },
        name: {
            type: String,
            default: ''
        },
        role: {
            type: String,
            default: ''
        },
        year: {
            type: Number,
            default: 0
        },
        image: {
            type: String,
            default: ''
        },
    }
}
</script>