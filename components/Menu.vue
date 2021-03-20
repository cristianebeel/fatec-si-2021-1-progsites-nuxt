<template>
    <nav>
      <Logo />
      <ul>
        <li>
          <nuxt-link to="/">Início</nuxt-link>
        </li>
        <!-- <li>
          <nuxt-link to="/produtos">Produtos</nuxt-link>
        </li> -->
        <li>
          <nuxt-link to="/sobre">Sobre</nuxt-link>
        </li>
      </ul>
    </nav>
</template>

<style scoped>
ul{
    display: flex;
}

li{
    @apply pr-3;
}
</style>