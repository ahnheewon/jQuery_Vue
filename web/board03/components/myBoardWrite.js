export default {

// 3) myBoardWrite : 게시판 글쓰기

    template : `<div>
                    <table id="list">
                        <tr>
                            <td>글제목</td>
                            <td><input type="text" style="width:90%;" v-model="title"></td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <textarea style="width:100%;" v-model="content"></textarea>
                            </td>
                        </tr>
                    </table>
                    <router-link tag="button" style="float:right;"
                                        v-bind:to="{name: 'boardList'}">목록</router-link>
                    <button style="float:right;" v-on:click="boardSave">저장</button>             
                </div>`,

    // props 필요가 없다
    data : function(){ // component의 data는 함수형태
        return {
            title: '',
            content : ''
        }
    },
    methods : {
        boardSave : function(){
   
            let boardInfo = {
                'id'  : 11,
                'title' : this.title,
                'post': this.content
    
            }

            // push를 할 필요가 없음. 통신만 일으키면 됨.
            const vueObject =this;

            $.ajax({

                url : 'http://192.168.0.2:8081/myserver/boardInsert', //필수
                type : 'post',
                data : boardInfo, // 위에 이미 선언한 -> boardInfo
                dataType : 'json',
                success : function(data){
                    if(data != null){
                        vueObject.$router.push({name:'boardList'});
                    }else {
                        alert("정상적으로 등록되지 않았습니다.");
                    }
                }, 
                error : function(reject){ // reject:오류메세지(생략x)
                console.log(reject);
                }
            });
        }
    }        
}

