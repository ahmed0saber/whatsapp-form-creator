let numberOfQuestions = 0

const addQuestion = () => {
    numberOfQuestions++
    let question = document.createElement("div")
    question.classList.add("question")
    question.innerHTML += `
        <div class="controls">
            <label for="field${numberOfQuestions}">Enter question ${numberOfQuestions}</label>
            <input type="text" id="field${numberOfQuestions}" class="inputFields" placeholder="Ex: Enter your favourite color"/>
        </div>
        <div class="delete-icon" onclick="deleteQuestion(this)">
            <i class="fa fa-ban"></i>
        </div>
    `
    document.getElementsByClassName("questions-container")[0].appendChild(question)
    window.scrollTo(0, document.body.scrollHeight)
}

const deleteQuestion = (el) => {
    el.parentNode.remove()
}

const validateForm = () => {
    let whatsappNumber = document.getElementsByClassName("whatsapp-input")[0].value
    let inputFields = document.getElementsByClassName("inputFields")
    if(!whatsappNumber.replace(/\s/g, '').length){
        console.log("Please enter your WhatsApp number.")
        return
    }else if(inputFields.length == 0){
        console.log("Add some questions.")
        return
    }
    for(let i=0; i<inputFields.length; i++){
        if(!inputFields[i].value.replace(/\s/g, '').length){
            console.log("Question number " + (i+1) + " is empty.")
            return
        }
    }
    generateUrl()
}

const generateUrl = () => {
    copyUrl()
}

const copyUrl = () => {
    console.log("Link to form copied successfully!", "Number of questions = " + numberOfQuestions)
}