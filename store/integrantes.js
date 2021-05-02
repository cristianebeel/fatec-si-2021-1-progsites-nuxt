export const state = () => ({
    membros: [
        {id: 1, path: '/integrantes/suho',      name: 'Kim Junmyeon',   role: 'Líder',  year: 1989, image: require('~/assets/img/suho.jpg')},
        {id: 2, path: '/integrantes/xiumin',    name: 'Kim Minseok',    role: 'Vocal',  year: 1990, image: require('~/assets/img/xiumin.jpg')},
        {id: 3, path: '/integrantes/lay',       name: 'Zhang Yixing',   role: 'Dancer', year: 1991, image: require('~/assets/img/lay.jpg')},
        {id: 4, path: '/integrantes/baekhyun',  name: 'Byun Baekhyun',  role: 'Vocal',  year: 1992, image: require('~/assets/img/baekhyun.jpg')},
        {id: 5, path: '/integrantes/chen',      name: 'Kim Jongdae',    role: 'Vocal',  year: 1992, image: require('~/assets/img/chen.jpg')},
        {id: 6, path: '/integrantes/chanyeol',  name: 'Park Chanyeol',  role: 'Rapper', year: 1992, image: require('~/assets/img/chanyeol.jpg')},
        {id: 7, path: '/integrantes/do',        name: 'Do Kyungsoo',    role: 'Vocal',  year: 1993, image: require('~/assets/img/kyungsoo.jpg')},
        {id: 8, path: '/integrantes/kai',       name: 'Kim Jongin',     role: 'Dancer', year: 1994, image: require('~/assets/img/kai.jpg')},
        {id: 9, path: '/integrantes/sehun',     name: 'Oh Sehun',       role: 'Dancer', year: 1994, image: require('~/assets/img/sehun.jpg')}
    ]
})

export const mutations = {
    addMember(state, membro){
        state.membros.push(membro)
    }
}