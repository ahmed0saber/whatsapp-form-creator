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
    document.getElementsByClassName("inputFields")[numberOfQuestions-1].focus()
    window.scrollTo(0, document.body.scrollHeight)
}

const deleteQuestion = (el) => {
    el.parentNode.remove()
    Swal.fire(
        'Question deleted !',
        "You can add another one if you want.",
        'error'
    )
}

const validateQuestions = () => {
    let whatsappNumber = document.getElementsByClassName("whatsapp-input")[0]
    let inputFields = document.getElementsByClassName("inputFields")
    if(!whatsappNumber.value.replace(/\s/g, '').length){
        Swal.fire(
            'WhatsApp number missing !',
            "Please enter your WhatsApp number.",
            'info'
        )
        whatsappNumber.focus()
        return
    }else if(inputFields.length == 0){
        Swal.fire(
            'Questions missing !',
            "Add some questions.",
            'info'
        )
        return
    }
    for(let i=0; i<inputFields.length; i++){
        if(!inputFields[i].value.replace(/\s/g, '').length){
            Swal.fire(
                'Question missing !',
                "Question number " + (i+1) + " is empty.",
                'info'
            )
            inputFields[i].focus()
            return
        }
    }
    generateUrl(encodeWhatsappNumber(whatsappNumber.value), inputFields)
}

const encodeWhatsappNumber = (w) => {
    let encodedWhatsappNumber = ""
    let numberEncoder = {
        "+" : "a",
        "0" : "b",
        "1" : "c",
        "2" : "d",
        "3" : "e",
        "4" : "f",
        "5" : "g",
        "6" : "h",
        "7" : "i",
        "8" : "j",
        "9" : "k"
    }
    for(let i=0; i<w.length; i++){
        encodedWhatsappNumber += numberEncoder[w[i]]
    }
    return encodedWhatsappNumber
}

const generateUrl = (whatsapp, inputs) => {
    let urlAsString = window.location.origin + "/view.html" + "?w=" + whatsapp + "&n=" + inputs.length
    for(let i=0; i<inputs.length; i++){
        urlAsString += "&q" + (i+1) + "=" + prepareUrlForShare(inputs[i].value)
    }
    copyUrl(urlAsString)
}

const copyUrl = (toCopy) => {
    navigator.clipboard.writeText(toCopy)
    Swal.fire(
        'Link to form copied successfully!',
        "You can share it with others.",
        'success'
    )
}

const getDataFromUrl = () => {
    let urlParams = new URLSearchParams(window.location.search)
    let whatsappNumber = urlParams.get('w')
    let questionsNumber = urlParams.get('n')
    let allQuestions = []
    for(let i=0; i<questionsNumber; i++){
        allQuestions.push(urlParams.get('q' + (i+1)))
    }
    buildForm(decodeWhatsappNumber(whatsappNumber), allQuestions)
}

const decodeWhatsappNumber = (w) => {
    let decodedWhatsappNumber = ""
    let numberDecoder = {
        "a" : "+",
        "b" : "0",
        "c" : "1",
        "d" : "2",
        "e" : "3",
        "f" : "4",
        "g" : "5",
        "h" : "6",
        "i" : "7",
        "j" : "8",
        "k" : "9"
    }
    for(let i=0; i<w.length; i++){
        decodedWhatsappNumber += numberDecoder[w[i]]
    }
    return decodedWhatsappNumber
}

var whatsappNumberFromUrl, questionsFromUrl
const buildForm = (w, q) => {
    whatsappNumberFromUrl = w
    questionsFromUrl = q
    for(let i=0; i<q.length; i++){
        let question = document.createElement("div")
        question.classList.add("question")
        question.innerHTML += `
            <div class="controls">
                <label for="field${i+1}">${q[i]}</label>
                <input pattern="^[a-zA-Z0-9_.-]*$" type="text" id="field${i+1}" class="inputFields" placeholder="Enter your answer here"/>
            </div>
        `
        document.getElementsByClassName("questions-container")[0].appendChild(question)
    }
}

const validateAnswers = () => {
    let inputFields = document.getElementsByClassName("inputFields")
    for(let i=0; i<inputFields.length; i++){
        if(!inputFields[i].value.replace(/\s/g, '').length){
            Swal.fire(
                'Answer missing !',
                "Answer number " + (i+1) + " is empty.",
                'info'
            )
            inputFields[i].focus()
            return
        }
    }
    sendToWhatsApp(whatsappNumberFromUrl, questionsFromUrl, inputFields)
}

const sendToWhatsApp = (whatsapp, questions, answers) => {
    let urlAsString = ""
    for(let i=0; i<answers.length; i++){
        if(i>0){
            urlAsString += " --- "
        }
        urlAsString += questions[i] + " => " + answers[i].value
    }
    urlAsString = "https://api.whatsapp.com/send?phone=" + whatsapp + "&text=" + prepareUrlForShare(urlAsString)
    window.open(urlAsString, '_blank')
}

const prepareUrlForShare = (url) => {
    let preparedUrl = ""
    for(let i=0; i<url.length; i++){
        if(url[i] == "?" || url[i] == "&" || url[i] == "#" || url[i] == "+"){
            preparedUrl += "*"
        }else{
            preparedUrl += url[i]
        }
    }
    return preparedUrl
}