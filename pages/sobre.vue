<template>
    <div id="page">
        <SideMenu :items="[
            {link: '/historia', text:'História'},
            {link: '/visao', text:'Visão'},
            {link: '/missao', text:'Missão'},
            {link: '/valores', text:'Valores'},
        ]" />
        <div>
            <PageTitle>Sobre</PageTitle>
            <p>Quem somos nós.</p>
            <nuxt-link to="/"
            class="underline text-blue-500">
                Voltar para o início
            </nuxt-link>
        </div>
    </div>
</template>