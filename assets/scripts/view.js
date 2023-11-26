let urlData = null

const getDataFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.search)
    const whatsappNumber = urlParams.get('w')
    const decodedWhatsAppNumber = decodeWhatsappNumber(whatsappNumber)
    const questions = decodeURIComponent(urlParams.get('qs')).split("#123#")

    return {
        decodedWhatsAppNumber,
        questions
    }
}

const decodeWhatsappNumber = (whatsappNumber) => {
    const numberDecoder = {
        "a": "+",
        "b": "0",
        "c": "1",
        "d": "2",
        "e": "3",
        "f": "4",
        "g": "5",
        "h": "6",
        "i": "7",
        "j": "8",
        "k": "9"
    }

    const decodedWhatsappNumber = Array.from(whatsappNumber).map(char => numberDecoder[char]).join("")

    return decodedWhatsappNumber
}

const buildForm = () => {
    const questionsContainer = document.querySelector(".questions-container")

    for (let i = 0; i < urlData.questions.length; i++) {
        const question = document.createElement("div")
        question.classList.add("question")
        question.innerHTML += `
            <div class="controls">
                <label for="field${i + 1}">${urlData.questions[i]}</label>
                <input type="text" id="field${i + 1}" class="inputFields" placeholder="Enter your answer here"/>
            </div>
        `
        questionsContainer.appendChild(question)
    }
}

const validateAnswers = () => {
    const inputFields = document.querySelectorAll(".inputFields")

    for (let i = 0; i < inputFields.length; i++) {
        if (inputFields[i].value.trim() === "") {
            Swal.fire(
                'Answer missing !',
                "Answer number " + (i + 1) + " is empty.",
                'info'
            )
            inputFields[i].focus()

            return
        }
    }

    sendToWhatsApp(inputFields)
}

const sendToWhatsApp = (answers) => {
    let urlAsString = ""
    for (let i = 0; i < answers.length; i++) {
        if (i > 0) {
            urlAsString += "\n\n"
        }
        urlAsString += `Question${i + 1}: ${urlData.questions[i]}\nAnswer${i + 1}: ${answers[i].value}`
    }

    urlAsString = `https://api.whatsapp.com/send?phone=${urlData.decodedWhatsAppNumber}&text=${encodeURIComponent(urlAsString)}`
    window.open(urlAsString, '_blank')
}

const initViewPage = () => {
    urlData = getDataFromUrl()

    buildForm()

    document.querySelector(".btn-submit").addEventListener("click", validateAnswers)
}
initViewPage()
