
let template =
`<div>
    <table id="list">
        <tr>
            <th v-for="info in headerInfo">{{info}}</th>
        </tr>

     <!-- body -->
     <!-- tr : 한 사원에 대한 정보 -> v-for="empInfo in empList" 이용해서 꺼내오기 -->
     <!-- td : 한 사원이 갖고 있는 항목 -> v-for="info in empInfo" -->
     <!-- 그 항목 중에서 내가 원하는 값만 출력될 항목 -> v-for="info in headerInfo" -> empInfo[info] -->


        <template v-for="empInfo in empList">
            <router-link tag="tr" v-bind:to="{ name:'empRead', params:{empId:empInfo.employee_id }}">
                <td v-for="info in headerInfo">{{empInfo[info]}}</td>
            </router-link>
        </template>
    </table>

    <!-- 페이지 네이션 (페이징 기법)-->
    
    <router-link tag="button" v-bind:to="{name:'empWrite'}">직원등록</router-link>
</div>`

const empSelect = {
    template,
    data : function(){
        return{
        headerInfo : ['employee_id','first_name','last_name','email','job_id'],
        empList : []

        }
    },
    created : function(){
    //이 곳에 ajax
    
    const vueObject= this; 
    // *** ajax안에서 this호출하면 jQuery 객체가 되어버립니다..
    
    // js 또는 jQuery를 통해 ajax 통신
    $.ajax({

      url : 'http://192.168.0.2:8081/myserver/empSelect', //필수
   // type : // type default는 get (생략가능)
      dataType : 'json',
      success : function(data){
      console.log(data);

      if(data != null){
      vueObject.empList = data; // property명이 empList이므로 이번엔 empList를 사용.
      }
    }, 
  
      error : function(reject){ // reject:오류메세지(생략x)
      console.log(reject);
      }
  });

    }
}
// 이런 식으로 변수에 담아놓고 export 가능
export { empSelect }