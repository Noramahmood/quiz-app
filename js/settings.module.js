import { Quiz } from "./quiz.module.js";

export class Setting{

    constructor(){
        $('#quiz-finish').slideUp(0);
        $('#quiz-page').slideUp(0);
        $('#alert1').hide(0);
        $('#alert2').hide(0);
        $('#inCorrect').hide(0);
        $('#Correct').hide(0);
        this.category = document.getElementById('category');
        this.difficulty = document.getElementsByName('difficulty');
        this.numQue = document.getElementById('numberOfQuestions');
        document.getElementById('startBtn').addEventListener('click',()=>{
            this.start()
        })
    }


    async start(){
        // console.log(this);
        let category = this.category.value;
        // console.log(category);
        let difficulty = Array.from(this.difficulty).find((item) =>{ return item.checked }).value;
        // console.log(difficulty);
        let numQue = this.numQue.value;
        // console.log(numQue);
        if(category&&difficulty&&numQue){
        
            if(numQue < 45){ 
                $('#alert1').hide(0); 
                $('#alert2').hide(0); 
                let api = `https://opentdb.com/api.php?amount=${numQue}&category=${category}&difficulty=${difficulty}`
                let data = await this.fetchData(api);
                // console.log(data);
                if(data.length>0){
                    $('#quiz-page').fadeIn(500);
                    $('#quiz-app').fadeOut(0);
                    let quiz = new Quiz(data);
                }else{
                    console.log("Data error");
                } 
            }else{
                $('#alert1').hide(0); 
                $('#alert2').show(500);  
            }
        }else{
            $('#alert1').show(500);
        }

    }

    async fetchData(api){
        let data  = await fetch(api);
        data = await data.json();
        return data.results
    }



}
