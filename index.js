const items_block = document.querySelector(".choose_category_items")
const withoutQuizSection = document.querySelector(".section_without_quiz")
const api_key = "BrTaSodVfLLSFTjkBX9lAYF7D7hRkptvbF7eLaho"
let current_question = 0
let count = 0
let quizData = []
let category;
const Categorys = ["Linux", "DevOps", "Networking", "Programming", "Cloud", "Docker", "Kubernetes",]

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const putCategorys = () => {
    let res = Categorys.map(el => {
        return `<li class="category_item" data-category = ${el}><span>${el}</span></li>`
    })
    items_block.innerHTML = res
}
putCategorys()

const nextQuestion = () =>{
    const li_items = document.querySelectorAll(".ul_quiz li input");
    let checked_answers = []
    let correct_answers = []
    for ( let i = 0; i < li_items.length; i++){
        if (li_items[i].checked){
            checked_answers.push(li_items[i])
        }
    }

    for ( let k in quizData[current_question]["correct_answers"] ){
        if (quizData[current_question]["correct_answers"][k] == "true"){
            correct_answers.push(k)
        }
    }
    checked_answers = checked_answers.map( el => el.id+'_correct')
    let the_same = correct_answers.length == checked_answers.length && checked_answers.every((el,index) => el == correct_answers[index])
    if (the_same){
        count++
    }
    if(current_question == quizData.length - 1){
        alert(`Вы угадали, ${count}/${quizData.length}`)
        location.reload()
    }else{
        current_question++
        btn.removeEventListener('click',nextQuestion)
        draw()

}
    }
const draw = () =>{
    let question = quizData[current_question].question
    let answers = quizData[current_question].answers
    let quiz_answers = []
    for (let answer in answers){
        if (!answers[answer]) continue
        quiz_answers.push(`<li><input type="checkbox" name="answer" id=${answer}><label for=${answer}>${answers[answer]}</label></li>`)
    }
    wrapper.innerHTML = `<div class="section_with_quiz">
            <div class="quiz_block">
                <div class="quiz_headline">Quiz tasks about <span>${category}</span></div>
                <div class="question">${question}</div>
                <div class="quiz_questions">
                    <ul class="ul_quiz">
                        ${quiz_answers}
                    </ul>
                    <button id="btn" type="submit">Next</button>
                </div>
            </div>
        </div>
        `
    btn.addEventListener('click',nextQuestion)

}
items_block.addEventListener("click", async (event) => {
    try {
        const item = event.target.closest(".category_item")
        category = item.dataset.category
        const res = await fetch(`https://quizapi.io/api/v1/questions?apiKey=${api_key}&category=${category}`)
        const data = await res.json()
        quizData = data
        let question = quizData[current_question].question
        let answers = quizData[current_question].answers
        let quiz_answers = []
        for (let answer in answers){
            if (!answers[answer]) continue
            quiz_answers.push(`<li><input type="checkbox" name="answer" id=${answer}><label for=${answer}>${answers[answer]}</label></li>`)
        }
        wrapper.innerHTML = `<div class="section_with_quiz">
            <div class="quiz_block">
                <div class="quiz_headline">Quiz tasks about <span>${category}</span></div>
                <div class="question">${question}</div>
                <div class="quiz_questions">
                    <ul class="ul_quiz">
                        ${quiz_answers}
                    </ul>
                    <button id="btn" type="submit">Next</button>
                </div>
            </div>
        </div>
        `
        btn.addEventListener('click',nextQuestion)

    } catch (e) {
        alert(e.message)
    }

})
random.addEventListener('click',async () =>{
    // category = Categorys[randomIntFromInterval(0,Categorys.length)]
    category = Categorys[0]
    const res = await fetch(`https://quizapi.io/api/v1/questions?apiKey=${api_key}&category=${category}`)
    const data = await res.json()
    quizData = data
    let question = quizData[current_question].question
    let answers = quizData[current_question].answers
    let quiz_answers = []
    for (let answer in answers){
        if (!answers[answer]) continue
        quiz_answers.push(`<li><input type="checkbox" name="answer" id=${answer}><label for=${answer}>${answers[answer]}</label></li>`)
    }
    wrapper.innerHTML = `<div class="section_with_quiz">
            <div class="quiz_block">
                <div class="quiz_headline">Quiz tasks about <span>${category}</span></div>
                <div class="question">${question}</div>
                <div class="quiz_questions">
                    <ul class="ul_quiz">
                        ${quiz_answers}
                    </ul>
                    <button id="btn" type="submit">Next</button>
                </div>
            </div>
        </div>
        `
    btn.addEventListener('click',nextQuestion)


})
