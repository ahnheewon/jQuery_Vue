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
                    <button style="float:right;" v-on:click="boardList">목록</button>
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
        boardList : function(){
            this.$emit('board-list');
        },
        boardSave : function(){
            this.$emit('board-save',this.title,this.content); // this.title,
                                                              // this.content -> 매개변수
        }
    }        
}

