let template =
    `<div id="myDIV" class="header">
        <h2 style="margin:5px">My To Do List</h2>
        <input type="text" v-model="title" placeholder="Title...">
        <span v-on:click="addItem" class="addBtn">Add</span>
    </div>`

export default {
    
    template,
    data : function(){
        return {
            title : ''
        }
    },

    methods : {
        addItem : function(){ 
            // 등록
            // 프로퍼티 title에 있는 값을 본인 id랑 같이 서버에 전송
            let todoInfo = {
                'id' : 0,
                'contents' : this.title
            }
    
            const vueObject =this;

            $.ajax({

                url : 'http://192.168.0.2:8081/myserver/todoInsert', //필수
                data : todoInfo,
                success : function(data){
                    if(data != null){
                        vueObject.$router.go(0); // 새로고침 자동으로 해줌.
        
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