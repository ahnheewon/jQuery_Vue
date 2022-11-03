
   let template = 
    `<div>
        <ul id="myUL">
            <template v-for="item in itemList" >
           
                <li v-bind:key = "item.no" v-bind:class="{ checked : item.yn }"  
                    v-on:click="checkedItem(item.no)">
                        {{ item.contents }}
                        <span class="close" v-on:click.self.stop="deleteItem(item.no)">x</span>
                </li>
            </template>
        </ul>
    </div>`
// template로 감싼이유? li 태그가 감싼 게 많아서 
// v-bind:key => v-for 쓰면 필수로 pk넣듯이 적기 
// v-bind:class = "{ 주고싶은 클래스명 : 제어수단 }
// <!-- v-on:click.(self).stop 자신이 발생시키는 event 버블링 차단 -->
// props 없음.

export default {
    template,
    data: function () {
        return {
            items: [], // 서버에서 가져온 원본 데이터
            updateItem: {}, // 완료
        }
    },
    computed: { // 연산하는 녀셕..
        itemList: function () {
           return $.map(this.items, function(obj, idx){
                        obj.yn =obj.todoyn ==1 ? true : false;
                        return obj;
           })
             
           /* // boolean 타입의 yn필드 추가 -> items 안의 객체의 todoyn
            let itemArray = [];
            for(let i=0; i < this.items.length; i++){
                let temp = this.items[i];
                temp.yn = temp.todoyn == 1 ? true: false;
                itemArray.push(temp);
            }       
            return itemArray;*/
        }
    },
    created : function(){  // 재사용 하는 녀석..
        
     this.loadData();
    
    },
    watch: {
        updateItem: function () {
            //실제로 서버와 통신을 해서 업데이트를 진행 
            const component = this;

            $.ajax({
                url: 'http://localhost:8081/myserver/todoUpdate',
                data: component.updateItem,
                success: function (data) {
                    if(data != null ){
                        alert('update success!');
                    }
                },
                error: function (reject) {
                    console.log(reject);
                }
            });

        }
    },
    created: function () {
        this.loadData();
        // 서버에 있는 데이터를 가지고 오는 것.

    },
    methods: { 
        loadData: function () {
            const component = this;
            $.ajax({
                url: 'http://localhost:8081/myserver/todoSelect',
                data: { id : 0 },
                success: function (data) {
                    if(data.length !=0 ){
                    component.items = $.map(data, function(obj,idx){
                                    obj.yn = obj.todoyn == 1 ? true : false;
                                    return obj;
                    })
                }
                },
                error: function (reject) {
                    console.log(reject);
                }
            })

        },

        checkedItem: function (no) {
            const component = this;

          $(this.items).each(function(index,item){
            if(item.no == no){
                // 바꿔줘야 할 것은 두 개
                //item.yn = !item.yn;
                item.todoyn = item.todoyn == 1 ? 0 : 1;
                component.updateItem = item;
            }
          })
        },


        deleteItem: function (no) {
            // 서버에 삭제되는 정보를 전달하고 정상적으로 처리되면 그 때 데이터를 삭제
            const component =this;
            /*
            let index = 0;
            $(this.items).each(function(idx,item){
                if(item.no == no){
                    index =idx;
                }
            })
            */

            $.ajax({

                url : 'http://localhost:8081/myserver/todoDelete', //필수
                data : { id : 0, no : no}, // data는 무조건 object 형태로
                dataType : 'json',
                success : function(data){
                    if(data != null){
                        component.items = $.grep(component.items, function(item){
                                                    return !(item.no == no);
                                                    // 제외하고 나머지 것으로 배열로 만들고 싶으니까
                                                    // 결과를 반전시키는 논리 부정
                                                });

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