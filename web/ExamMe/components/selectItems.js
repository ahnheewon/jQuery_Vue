export default{
    template : 
    `<div>
    <!-- DATA LIST -->
    <ul v-for="item in object" v-bind:key="item.id">
       <router-link tag="li" >
       {{item.contents}}</router-link>
        <li><button v-on:click="boardDelete(item.no)">삭제</button></li>
    </ul>
    </div>`,
 // props 없음.

    data : function(){
        return {
            object : []
            ,
            // infos : ['id','no','contents','todoyn'],
            // empInfo : {
            //     id : '',
            //     no : '',
            //     contents : '',
            //     todoyn : ''
            // }
        }
    },
    created : function(){
        const vueObject= this;
    
      //  this.object = this.$parent.getParentData();
      // 이제 server와 직접 통신하면 돼서 필요가 없다.

      // js 또는 jQuery를 통해 ajax 통신
      $.ajax({

        url : 'http://192.168.0.2:8081/myserver/todoSelect', //필수
     // type : // type default는 get (생략가능)
        data : { 'id' : 0 }, // data는 무조건 object 형태로
        dataType : 'json',
        success : function(data){
        console.log(data);
        vueObject.object = data;

        }, 
    
        error : function(reject){ // reject:오류메세지(생략x)
        console.log(reject);
        }
    });

    },
    methods : {
       boardDelete : function(no){
       
            let index = 0;

            for(let i = 0; i< this.object.length; i++){
                if(this.object[i].no==no){
                   index = i;
                   break;
                }
            }

            const vueObject =this;
            
            $.ajax({

                url : 'http://192.168.0.2:8081/myserver/todoDelete', //필수
                type : 'post',
                data : { 'id' : 11, 'no' : no }, // data는 무조건 object 형태로
                dataType : 'json',
                success : function(data){
                    if(data != null){
                        vueObject.object.splice(index,1);
                    } else {
                        alert('정상적으로 삭제되지 않았습니다.')
                    }      
                }, 
                error : function(reject){ // reject:오류메세지(생략x)
                console.log(reject);
                }
            });
       }
    }  

}