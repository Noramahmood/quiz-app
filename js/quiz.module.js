export class Quiz{
    constructor(data){
        this.score = 0
        this.current = 0;
        this.data = data;
        this.totalQue = data.length;
        // console.log(this.data);
        document.getElementById('next').addEventListener('click',()=>{
            this.next()
        })
        document.getElementById('tryBtn').addEventListener('click',this.tryAgain)
        this.show()
    }

    show(){
        document.getElementById('currentQuestion').innerHTML = this.current + 1;
        document.getElementById('totalNumberOfQuestions').innerHTML = this.totalQue;
        document.getElementById('question').innerHTML = this.data[this.current].question;
        let answers = [this.data[this.current].correct_answer,...this.data[this.current].incorrect_answers]
        console.log(answers);
        this.randomizer(answers);
        console.log(answers);
        let answersContainer = ``
        for( let i = 0 ; i<answers.length ; i++){
            answersContainer+=` <label class="form-check-label mb-2">
            <input type="radio" class="form-check-input" name="answer" value="${answers[i]}">
                 ${answers[i]}
            </label>`
        }
        document.getElementById('rowAnswer').innerHTML = answersContainer;


    }


    next(){
        let userAnswer = Array.from(document.getElementsByName('answer')).find((item) =>{ return item.checked });

        if(userAnswer!=undefined){
            $('#alert').hide(0);
            userAnswer= userAnswer.value;
            let correctAnswer = this.data[this.current].correct_answer;
            this.current++;
            this.checkAnswer(userAnswer,correctAnswer);
            if(this.current<this.totalQue){
                this.show();
            }else{
                $('#quiz-finish').fadeIn(500);
                $('#quiz-page').fadeOut(0);
                document.getElementById('score').innerHTML = this.score;
            }
        }else{
            $('#alert').show(200);
        }

        // console.log(userAnswer);
       
       
    }

    checkAnswer(userAnswe , correctAnswer){
        if(userAnswe==correctAnswer){
            //some logic
            //$('#inCorrect').hide(0);
            //$('#Correct').hide(0);
            this.score++
            $('#Correct').show(1000).hide(200);
        }
        else{
            //some logic
            $('#inCorrect').show(1000).hide(200);
        }
    }

    randomizer(array){
        let current = array.length , random ; 
        while(current!=0){
            random = Math.floor(Math.random()*array.length);
            current --;
            [array[current],array[random]] = [array[random],array[current]]
        }   
    }
    
    tryAgain(){
        $('#quiz-app').fadeIn(500);
        $('#quiz-finish').fadeOut(0);
    }



}
