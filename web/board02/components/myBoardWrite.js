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
            let dataList = this.$parent.getParentData();

            let no = 1;
            if(dataList.length !=0){
                let idx = dataList.length - 1;
                no = parseInt(dataList[idx].no) + 1;
            }
            let boardInfo = {
                'no'  : no,
                'title' : this.title,
                'content': this.content,
                'view': 1
            }

            dataList.push(boardInfo);
            this.$parent.setParentData(dataList);
            this.$router.push({name:'boardList'});
        }
    }        
}

