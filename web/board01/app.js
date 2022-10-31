import myHeader from './components/header.js';
import myBoardList from './components/myBoardList.js';
import myBoardWrite from './components/myBoardWrite.js';
import myBoardRead from './components/myBoardRead.js';
// 이런 식으로 따로 따로 관리.

let template = 
`<div>
        <my-header v-bind:parentData.sync="this.$data"></my-header>

        <my-board-list v-if="listOk"
                       v-bind:object="dataArray['board']"
                       v-on:board-read="boardRead"
                       v-on:board-write="boardWrite"
                       v-on:board-delete="boardDelete"></my-board-list>
        <!-- props에 있던 objedct가 property -> dataArray Vue의 data -->


        <my-board-read v-if="readOk"
                       v-bind:object="boardInfo"
                       v-on:board-list="boardList" ></my-board-read>
        <!-- props에 있던 objedct가 property -> boardInfo Vue의 data -->

        <my-board-write v-if="writeOk"
                        v-on:board-list="boardList"
                        v-on:board-save="boardSave"></my-board-write>
</div>`

new Vue({
    el: '#app',
    template : template,
    data : {
        listOk : false, // 기본값 -> v-if 생성 안됨.
        readOk : false, // 기본값
        writeOk : false, // 기본값
        dataArray: {}, // 파일에서 읽은 데이터
        boardInfo : {} // 선택된 게시글 정보
    },
    components : {
        'my-header' : myHeader,
        'my-board-list' : myBoardList,
        'my-board-read' : myBoardRead,
        'my-board-write' : myBoardWrite
    },

    methods : {
        boardList : function(){ // 게시판 목록 조회
            this.listOk =true; // list만 보여라
            this.readOk =false;
            this.writeOk =false;
        },
        boardWrite : function(){ // 게시판 글쓰기
            this.listOk =false; 
            this.readOk =false;  // write만 보여라
            this.writeOk =true;
        },
        boardRead : function(info){ // 게시판 글 조회
            this.listOk = false;
            this.readOk =true; // read만 보여라
            this.writeOk =false;

            //게시판 글 상세조회
            this.boardInfo=info;

            //해당 글 조회수 증가
            for(let i=0; i<this.dataArray['board'].length; i++){
                if(this.dataArray['board'][i].no==info.no){
                    this.dataArray['board'][i].view 
                    = parseInt(this.dataArray['board'][i].view) + 1;
                    // json 객체 내용물은 text 형태로 있는 경우가 많아서
                    // 문자열 합이 될까봐 혹시나해서 타입변환까지 해줍니다.
                }
            }
        },
        boardSave : function(title, content){ // 게시글 저장
            // 매개변수 두 개를 emit으로 전달받음.

            let no =1; // 디폴트 값 (null처리 불가)
            if(this.dataArray['board'].length != 0){
                let index = this.dataArray['board'].length-1;
                no = parseInt(this.dataArray['board'][index].no)+1;
                // json 객체 내용물은 text 형태로 있는 경우가 많아서
                // 문자열 합이 될까봐 혹시나해서 타입변환까지 해줍니다.
            }

            let boardInfo = {
                'no' : no,
                'title' : title,
                'content' :content,
                'view' : '1'
            }

            this.dataArray['board'].push(boardInfo);
            // index를 이용하면 vue가 인식못합니다!!!

            this.boardList();
        },
        boardDelete : function(no){ // 게시글 삭제 
            for(let i=0; i<this.dataArray['board'].length; i++){
                if(this.dataArray['board'][i].no == no){
                    this.dataArray['board'].splice(i , 1);
                }
            }
        }

    }
})