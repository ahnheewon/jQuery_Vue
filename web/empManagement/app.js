import empHeader from './components/empHeader.js'
import router from './router/router.js'

// 이런 식으로 따로 따로 관리.

let template = 
`<div>
        <emp-header></emp-header>        
        <router-view></router-view>
</div>`

new Vue({ // server가 있으므로 vue는 data를 갖고 있을 필요가 없고 
          // 또한 header.js도 필요가 없어졌다.
    el: '#app',
    template, // template : template
    components : {
        empHeader // empHeader : empHeader
    },
    router // router : router
})