window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const header = document.getElementsByTagName('header')[0]
    if (scrollPosition < 28) {
        header.style.backgroundColor = 'transparent'
    } else {
        header.style.backgroundColor = 'rgba(1, 1, 1, 1)'
    }

    const scrambleElements = document.querySelectorAll(".anime")

    scrambleElements.forEach(element => {
        if (isElementInViewport(element) && !element.classList.contains("scrambled")) {
            scrambleText(element, "XO", 80)
            element.classList.add("scrambled")
        }
    })
})

function isElementInViewport(element) {
    const rect = element.getBoundingClientRect()
    return (rect.top >= 0 && rect.bottom <= window.innerHeight)
}

function scrambleText(element, chars, speed) {
    let originalText = element.innerText
    let targetLength = originalText.length

    function scrambleStep() {
        let scrambled = ''
        for (let i = 0; i < targetLength; i++) {
            scrambled += chars.charAt(Math.floor(Math.random() * chars.length))
        }
        element.innerText = scrambled
    }

    function replaceText() {
        let textArray = element.innerText.split('')
        let targetArray = originalText.split('')
        for (let i = 0; i < targetLength; i++) {
            setTimeout(() => {
                textArray[i] = targetArray[i]
                element.innerText = textArray.join('')
            }, i * speed)
        }
    }

    let scrambleInterval = setInterval(scrambleStep, 10)

    setTimeout(() => {
        clearInterval(scrambleInterval)
        replaceText()
    }, 1500);
}

