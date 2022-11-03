import selectItems from '../components/selectItems.js'


export default new VueRouter({ // default는 이름 없이 기본으로 보내겠다는 소리.
    mode : 'hash',  // default는 hash모드
                    // 새로고침 때문에 hash 를 쓴다.
                    // history와 hash 차이는???
    routes : [
       
         {
            path : '/',
            name : 'todoList',
            component : selectItems
        },

        {
            path : '*',
            redirect : '/' //무조건 redirect로 처리할 필요는 없습니다.
            //component : errorPage
        },
    
    ]
})