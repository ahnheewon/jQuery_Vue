let template = `
    <div>
        <ul id="myUL">
            <template v-for="item in itemList" >
                <li  v-bind:key="item.no"
                     v-bind:class="{ checked : item.yn }"
                     v-on:click="checkedItem(item.no)">
                        {{ item.contents }}
                        <span class="close" v-on:click="deleteItem(item.no)">x</span>
                </li>
            </template>
        </ul>
    </div>`


export default {
    template: template,

    data: function () {
        return {
            items: [], // 서버에서 가져온 원본 데이터
            updateItem: {}, // 완료
        }
    },
    computed: { // 연산하는 녀셕..
        itemList: function () {
            // boolean 타입의 yn필드 추가 -> items 안의 객체의 todoyn
            let itemArray = [];
            for(let i=0; i < this.items.length; i++){
                let temp = this.items[i];
                temp.yn = temp.todoyn == 1 ? true: false;
                itemArray.push(temp);
            }       
            return itemArray;
        }
    },
    watch: {
        updateItem: function () {
            //실제로 서버와 통신을 해서 업데이트를 진행 

            let todoInfo = {
                'id' : 0,
                'no' : no,
                'contents' : this.title
            }
            const vueObject =this
            
            $.ajax({

                url : 'http://192.168.0.2:8081/myserver/todoUpdate', //필수
                data : todoInfo, // data는 무조건 object 형태로
                dataType : 'json',
                success : function(data){
                    if(data != null){ 
                        console.log(data);
                    } else {
                        alert('정상적으로 수정되지 않았습니다.')
                    }      
                }, 
                error : function(reject){ // reject:오류메세지(생략x)
                console.log(reject);
                }
            });
            
            // style="text-decoration:line-through double"

        }
    },
    created: function () {
        this.loadData();
        // 서버에 있는 데이터를 가지고 오는 것.

    },
    methods: {
        loadData: function () {
            const vueObject = this;
            $.ajax({
                url: 'http://192.168.0.2:8081/myserver/todoSelect',
                type: 'get',
                data: {
                    'id': 0
                },
                dataType: 'json',
                success: function (data) {
                    console.log(data);
                    vueObject.items = data;
                },
                error: function (reject) {
                    console.log(reject);
                }
            })

        },
        checkedItem: function (no) {
            // 해당 건의 스타일을 변경
            
            $(".1").css({
               textDecoration : "line-through double"
            });
            $(".0").css({
                textDecoration : "none"
             });
            // style="text-decoration:line-through double"
        },


        deleteItem: function (no) {
            // 서버에 삭제되는 정보를 전달하고 정상적으로 처리되면 그 때 데이터를 삭제
    
            let todoInfo = {
                'id' : 0,
                'no' : no,
                'contents' : this.title
            }
            const vueObject =this;
            
            $.ajax({

                url : 'http://192.168.0.2:8081/myserver/todoDelete', //필수
                data : todoInfo, // data는 무조건 object 형태로
                dataType : 'json',
                success : function(data){
                    if(data != null){
                        vueObject.$router.go(0); // 새로고침 자동으로 해줌.

                    } else {
                        alert('정상적으로 삭제되지 않았습니다.')
                    }      
                }, 
                error : function(reject){ // reject:오류메세지(생략x)
                console.log(reject);
                }
            });

            return false; // 이벤트가 전달되지 않도록

        }
    }
}