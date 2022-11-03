let template =
`<div>
    <form id="info" onsubmit="return false">
        <template v-for="info in infos">
            <div>
                <label v-bind:for="info">{{ info }}</label>
                <input type="text" v-bind:id="info" v-bind:name="info"
                                                    v-model="empInfo[info]">
            </div>
        </template>
    </form>

    <div>
        <button v-on:click="updateMode ? updateContent() : uploadContent()">저장</button>
     <!-- updateMode가 true면 updateContent(), false면 uploadContent() 호출해서 처리 -->
        <router-link tag="button" v-bind:to="{ name : 'empSelect' }">취소</router-link>
    </div>

</div>`

export default {

    template,
    props : ['empId'], // 경로에 설정된 파람이랑 여기 설정된 파람 명은 같아야 한다.
    data : function() {
        return {
            infos : ['employee_id','first_name','last_name','email','job_id'],
            // 등록 시 두 개의 값이 필요하다.
            empInfo : {
                employee_id : '',
                first_name : '',
                last_name : '',
                email : '',
                job_id : ''
            },
            // 모드 전환용 정보 (쓰기.수정 둘 다 가능)
            updateMode : false // 수정인 경우 true

        }
    },
    created : function(){ 
        // 경로를 통해 들어오는 empId 값을 통해서 접근을 할 겁니다.
        // 항상 작동하면 안됩니다. empId > 0, not null (조건문)
        
        if(this.empId > 0){
        const component= this; 
        // *** ajax안에서 this호출하면 jQuery 객체가 되어버립니다..
        
        // js 또는 jQuery를 통해 ajax 통신
        $.ajax({
          url : 'http://192.168.0.2:8081/myserver/empFind', //필수
       // type : // type default는 get (생략가능)
          data : { employee_id : component.empId }, // props : ['empId'] 사용
          dataType : 'json',
          success : function(data){
          console.log(data);
    
          if(data != null){
            component.empInfo = data; // property명이 empList이므로 이번엔 empList를 사용.
            component.updateMode = true;
        }
        }, 
      
          error : function(reject){ // reject:오류메세지(생략x)
          console.log(reject);
          }
      });
    }
    },

    methods : {
        uploadContent : function(){
            const component =this;

        $.ajax({

            url : 'http://192.168.0.2:8081/myserver/empInsert', //필수
            type : 'post',
            data : component.empInfo, // 입력한 모든 데이터
            dataType : 'json',
            success : function(data){
                if(data != null){
                    component.$router.push({name:'empSelect'}); // 다시 목록 페이지로 돌아간다
                }else {
                    alert("정상적으로 등록되지 않았습니다.");
                }
            }, 
            error : function(reject){ // reject:오류메세지(생략x)
            console.log(reject);
            }
        });
        },


        updateContent : function(){

            const component =this;

            $.ajax({
    
                url : 'http://192.168.0.2:8081/myserver/empUpdate', //필수
                type : 'post',
                data : component.empInfo,//{ employee_id : component.empId }, // props : ['empId'] 사용
                dataType : 'json',
                success : function(data){
                    if(data != null){
                        component.$router.push({name:'empSelect'});
                    }else {
                        alert("정상적으로 수정되지 않았습니다.");
                    }
                }, 
                error : function(reject){ // reject:오류메세지(생략x)
                console.log(reject);
                }
            });
        }
    }
}