
const modal = document.querySelector('.modal');
const openModalBtns = document.querySelectorAll('[data-modal]');
const closeModalBtn = document.querySelector('[data-close]');

const openModal = () => {
    modal.style.display = 'flex';
};

const closeModal = () => {
    modal.style.display = 'none';
};

openModalBtns.forEach(btn => {
    btn.addEventListener('click', openModal);
});

closeModalBtn.addEventListener('click', closeModal)



const slides = document.querySelectorAll('.offer__slide')
const prev = document.querySelector('.offer__slider-prev')
const next = document.querySelector('.offer__slider-next')
const current = document.querySelector('#current')
const total = document.querySelector('#total')
let slideIndex = 0

total.innerHTML = addZero(slides.length)

slideShow()

function slideShow(n) {
    if (n > slides.length - 1) {
        slideIndex = 0
    }

    if (n < 0) {
        slideIndex = slides.length - 1
    }

    slides.forEach(slides => slides.classList.add('hide', 'fade'))
    slides[slideIndex].classList.remove('hide')

    current.innerHTML = addZero(slideIndex + 1)
}

function addZero(n) {
    return n < 10 ? `${n}` : n
}


next.onclick = () => {
    slideShow(++slideIndex)
}

prev.onclick = () => {
    slideShow(--slideIndex)
}


const preview = document.querySelectorAll('.tabcontent');
const tabheaderItems = document.querySelectorAll('.tabheader__item');

preview.forEach(previe => previe.classList.add('hide'));
preview[0].classList.remove('hide');

tabheaderItems.forEach((item, index) => {
    item.onclick = () => {
        preview.forEach(previe => previe.classList.add('hide', 'fade')); 
        preview[index].classList.remove('hide');    
    };
});


const deadline = '2024-10-22 19:19'

function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
        days = Math.floor(t / (1000 * 60 * 60 * 24)),
        seconds = Math.floor((t / 1000) % 60),
        minutes = Math.floor((t / 1000 / 60) % 60),
        hours = Math.floor((t / (1000 * 60 * 60)) % 24)

    return {
        total: t,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
    }
}

function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
        days = timer.querySelector('#days'),
        hours = timer.querySelector('#hours'),
        minutes = timer.querySelector('#minutes'),
        seconds = timer.querySelector('#seconds'),
        timeInterval = setInterval(updateClock, 1000)

    function updateClock() {
        const t = getTimeRemaining(endtime)

        days.innerHTML = t.days
        hours.innerHTML = t.hours
        minutes.innerHTML = t.minutes
        seconds.innerHTML = t.seconds

        if (t.total <= 0) {
            clearInterval(timeInterval)
        }
    }
}


const  userData = {
    gender: "woman"
}
const genderBtns = document.querySelectorAll('#gender .calculating__choose-item')
const inps = document.querySelectorAll('.calculating__choose_medium input')
const inpss = document.querySelectorAll('input')

genderBtns.forEach(btn => {
    btn.onclick = () => {
        genderBtns.forEach(el => el.classList.remove('calculating__choose-item_active'))
        btn.classList.add('calculating__choose-item_active')

            userData.gender = btn.getAttribute('data-g')
    }
})

inps.forEach(inp => {
    inp.onkeyup = () => {
        userData[inp.id] = inp.value 
        console.log(inp.id, inp.value);
    }
})


const action = document.querySelectorAll('#action .calculating__choose-item')
const inp = document.querySelectorAll('.calculating__choose_medium input')

action.forEach(btn => {
    btn.onclick = () => {
        action.forEach(el => el.classList.remove('calculating__choose-item_active'))
        btn.classList.add('calculating__choose-item_active')

    }
})



    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    const ageInput = document.getElementById('age');
    const resultSpan = document.querySelector('.calculating__result span');

    let gender = 'woman'; 
    let activityLevel = 1.375; 


    document.querySelectorAll('[data-g]').forEach(el => {
        el.addEventListener('click', () => {
            gender = el.dataset.g;
            calculateCalories();
        });
    });

 
    document.querySelectorAll('[data-action]').forEach(el => {
        el.addEventListener('click', () => {
            activityLevel = parseFloat(el.dataset.action);
            calculateCalories();
        });
    });

  
    function calculateCalories() {
        const height = +heightInput.value;
        const weight = +weightInput.value;
        const age = +ageInput.value;

        if (height && weight && age) {
            const bmr = gender === 'woman'
                ? 10 * weight + 6.25 * height - 5 * age - 161
                : 10 * weight + 6.25 * height - 5 * age + 5;
                
            const dailyCalories = Math.round(bmr * activityLevel);
            resultSpan.textContent = dailyCalories;
        } 
        
    }


    [heightInput, weightInput, ageInput].forEach(input => {
        input.addEventListener('input', calculateCalories);
    });

