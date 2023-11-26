const questionsContainer = document.querySelector(".questions-container")
let numberOfQuestions = 0

const addQuestion = () => {
    const question = document.createElement("div")
    question.classList.add("question")
    question.innerHTML += `
        <div class="controls">
            <label for="field${++numberOfQuestions}">Enter question ${numberOfQuestions}</label>
            <input type="text" id="field${numberOfQuestions}" class="inputFields" placeholder="Ex: Enter your favourite color"/>
        </div>
        <div class="delete-icon" onclick="deleteQuestion(this)">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </div>
    `
    questionsContainer.appendChild(question)
    question.querySelector(".inputFields").focus()
    window.scrollTo(0, document.body.scrollHeight)
}

const deleteQuestion = (el) => {
    el.closest(".question").remove()
    Swal.fire(
        'Question deleted !',
        "You can add another one if you want.",
        'error'
    )
}

const validateQuestions = () => {
    const inputFields = document.getElementsByClassName("inputFields")
    const whatsappNumber = document.querySelector(".whatsapp-input")

    if (whatsappNumber.value.trim() === "") {
        Swal.fire(
            'WhatsApp number missing !',
            "Please enter your WhatsApp number.",
            'info'
        )
        whatsappNumber.focus()

        return
    }

    if (inputFields.length === 0) {
        Swal.fire(
            'Questions missing !',
            "Add some questions.",
            'info'
        )

        return
    }

    for (let i = 0; i < inputFields.length; i++) {
        if (inputFields[i].value.trim() === "") {
            Swal.fire(
                'Question missing !',
                "Question number " + (i + 1) + " is empty.",
                'info'
            )
            inputFields[i].focus()

            return
        }
    }

    const encodedWhatsAppNumber = encodeWhatsappNumber(whatsappNumber.value)
    const generatedShareUrl = generateShareUrl(encodedWhatsAppNumber, inputFields)
    copyUrl(generatedShareUrl)
}

const encodeWhatsappNumber = (whatsappNumber) => {
    const numberEncoder = {
        "+": "a",
        "0": "b",
        "1": "c",
        "2": "d",
        "3": "e",
        "4": "f",
        "5": "g",
        "6": "h",
        "7": "i",
        "8": "j",
        "9": "k"
    }

    const encodedWhatsappNumber = Array.from(whatsappNumber).map(char => numberEncoder[char]).join("")

    return encodedWhatsappNumber
}

const generateShareUrl = (whatsapp, inputs) => {
    const questions = Array.from(inputs).map(input => input.value)
    const stringfiedQuestions = questions.join("#123#")
    const urlAsString = `${window.location.origin}/view/?w=${whatsapp}&qs=${encodeURIComponent(stringfiedQuestions)}`

    return urlAsString
}

const copyUrl = (text) => {
    navigator.clipboard.writeText(text)
    Swal.fire(
        'Link to form copied successfully!',
        "You can share it with others.",
        'success'
    )
}

const initCreatePage = () => {
    document.querySelector(".btn-add-question").addEventListener("click", addQuestion)
    document.querySelector(".btn-share").addEventListener("click", validateQuestions)
}
initCreatePage()
