<template>
    <h1
        class="text-4xl font-bold text-purple-400 mt-1 mb-2"
        @click="$emit('action')"
    >
        <slot />
    </h1>
</template>