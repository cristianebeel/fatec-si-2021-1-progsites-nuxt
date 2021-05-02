<template>
  <div>
    <Menu />
    <div class="my-4 mx-7"><Nuxt /></div>
  </div>
</template>

<style>
body{
  @apply bg-gradient-to-b;
  @apply from-gray-50;
  @apply via-purple-50;
  @apply to-indigo-100;
}

#page{
  @apply flex;
  @apply space-x-12;
}

img{
  animation: 1s appear;
}

@keyframes appear {
  0% {
    opacity: 0;
  }
}
</style>