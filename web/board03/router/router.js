import main from '../components/main.js'
import myBoardList from '../components/myBoardList.js'
import myBoardRead from '../components/myBoardRead.js'
import myBoardWrite from '../components/myBoardWrite.js'




export default new VueRouter({
    mode : 'history',
    routes : [
        // main이 필요없어졌다.
        // 이제 접속을하면 바로 boardList로..

        //boardList
        {
            path : '/', // 이건 자기 마음대로 /boardList로 해도 된다.
                        // default -> redirect를 위해 '/'로 해둡시다.
            name : 'boardList',
            component : myBoardList
        },
        //boardRead
        {
            path : '/boardRead/:item',
            name : 'boardRead',
            component : myBoardRead,
            props: true
        },
        //boardWrite
        {
            path : '/boardWrite',
            name : 'boardWrite',
            component : myBoardWrite
        },
    
        //default // 맨 마지막에
        {
            path : '*', // 이외에 전부
            redirect : '/'
        }
    ]
})