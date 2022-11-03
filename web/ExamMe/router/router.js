import todoHeader from '../components/todoHeader.js'
import selectItems from '../components/selectItems.js'


export default new VueRouter({
    mode : 'history',
    routes : [
        // main이 필요없어졌다.
        // 이제 접속을하면 바로 boardList로..

        //todoHeader
         {
            path : '/',
            name : 'todoHeader',
            component : todoHeader
        },

        //selectItems
        {
            path : '/selectItems/:id',
            name : 'selectItems',
            component : selectItems
        },
    
        //default // 맨 마지막에
        {
            path : '*', // 이외에 전부
            redirect : '/'
        }
    ]
})