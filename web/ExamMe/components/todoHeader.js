export default {

 template :
          `<div id="myDIV" class="header">
              <h2>My To Do List</h2>
              <input type="text" id="myInput" placeholder="Title...">
              <span onclick="newElement()" class="addBtn">Add</span>
          </div>
          `,
// props 필요가 없다
data : function(){ // component의 data는 함수형태
  return {
      title: '',
      content : ''
  }
},
methods : {
  todoInsert : function(){

  }
}        

}