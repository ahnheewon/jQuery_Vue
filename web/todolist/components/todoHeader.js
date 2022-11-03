let template = 
    `<div id="myDIV" class="header">
        <h2>My To Do List</h2>
        <input type="text" v-model="title" placeholder="Title...">
        <span v-on:click="addItem" class="addBtn">Add</span>
    </div>`

export default {
    template : template, 

    data : function(){ // component의 data는 함수형태
        return {
            title : ''
        }
    },

    methods : {
        addItem : function(){
            // 프로퍼티 타이틀에 있는 값을 id랑 같이 전송

            const component = this;
// 태그에 대한 직접적인 접근이 최소화 되는 것이 vue이다 v-model, v-bind 이용.

                $.ajax ({
                url : 'http://localhost:8081/myserver/todoInsert',
                type : 'post',
                data : JSON.stringify({'id' : 0, 'contents' : component.title}),  // data 형태는 무조건 object, v-model에 연결된 title
                // post로 등록할 때는 이렇게 데이터를 JSON.stringify()로 감싸줍니다.
                contentType: 'application/json',
                /*  JSON.stringify()로 감싸고 나서 contentType: 'application/json',
                    안적으면 json객체가 아니라 text로 알고 데이터 못받아 옵니다. */
                dataType : 'json',
                success : function(data) {
                    if(data != null) {
                  //  component.$router.go(0); //새로고침 하는 법
                   console.log(data);
                    console.log('result : '+data.result);
                    console.log('count : '+data.count);
                    }
                },
                error : function(reject) {
                    console.log(reject);
                }
            })
        }
    }
}