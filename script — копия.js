// Получение элементов DOM
const contestantsInput = document.getElementById('contestantsInput');
const contestantList = document.getElementById('contestantList');
const uploadContestantsButton = document.getElementById('uploadContestants');
const backgroundInput = document.getElementById('backgroundInput');
const menu = document.getElementById('menu');
const uploadBackgroundButton = document.getElementById('uploadBackground');

const columnCountSlider = document.getElementById('columnCountSlider');
const columnCount = document.getElementById('columnCount');

const contestantWidthSlider = document.getElementById('containerWidth');
const contestantWidthCount = document.getElementById('containerWidthCount');

const contestantHeightSlider = document.getElementById('containerHeight');
const contestantHeightCount = document.getElementById('containerHeightCount');

const generateButton = document.getElementById('generate');
const container = document.getElementById('container');
const hideButton = document.getElementById('hide');

// Переменные для управления состоянием
let contestants = [];
let background = '';
let columns = 3;
let constestantWidth = 100;
let contestantHeight = 100;
const heartsPath = 'heart.png';

// Обработчики событий

// Обработчик для кнопки загрузки участников
uploadContestantsButton.addEventListener('click', () => {
    contestantsInput.click();
});

// Обработчик для выбора файлов с участниками
contestantsInput.addEventListener('change', () => {
    contestants = [];
    contestantList.innerHTML = '';
    const files = contestantsInput.files;
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        contestants.push({ name: file.name.split('.')[0], lives: 3, img: file, heartsLeft: 3 });
        contestantList.innerHTML += `<li>${file.name.split('.')[0]}</li>`;
    }
});

// Обработчик для кнопки загрузки фона
uploadBackgroundButton.addEventListener('click', () => {
    backgroundInput.click();
});

// Обработчик для выбора файла фона
backgroundInput.addEventListener('change', () => {
    const file = backgroundInput.files[0];
    background = URL.createObjectURL(file);
    document.body.style.backgroundImage = `url(${background})`;
});

// Обработчик ползунка колличества участников
columnCountSlider.addEventListener('input', () => {
    let currentValue = parseInt(columnCountSlider.value);
    columnCount.innerText = currentValue;
    columns = currentValue;
});

// Обработчик ползунка ширины поля участника
contestantWidthSlider.addEventListener('input', () => {
    let contestants = document.getElementsByClassName('contestant');
    let currentValue = parseInt(contestantWidthSlider.value);
    contestantWidthCount.innerText = currentValue;
    contestantWidth = currentValue;
    
    // Проходимся по каждому элементу коллекции и устанавливаем ширину
    for (let i = 0; i < contestants.length; i++) {
        contestants[i].style.width = currentValue + 'px';
    }
});

// Обработчик ползунка высоты поля участника
contestantHeightSlider.addEventListener('input', () => {
    let contestants = document.getElementsByClassName('contestant');
    let currentValue = parseInt(contestantHeightSlider.value);
    contestantHeightCount.innerText = currentValue;
    contestantHeight = currentValue;
    
    // Проходимся по каждому элементу коллекции и устанавливаем высоту
    for (let i = 0; i < contestants.length; i++) {
        contestants[i].style.height = currentValue + 'px';
    }
});

// Обработчик для кнопки скрытия элементов
hideButton.addEventListener('click', () => {
    const elementsToHide = [
        uploadBackgroundButton,
        uploadContestantsButton,
        contestantList,
        columnControls,
        generateButton
    ];

    elementsToHide.forEach((element) => {
        if (element.style.display !== 'none') {
            element.style.display = 'none';
        } else {
            element.style.display = ''; // Восстанавливаем отображение элемента
        }
    });

    // Изменяем прозрачность кнопки "Скрыть" для обратного отображения
    if (menu.style.opacity === '' || menu.style.opacity === '1') {
        menu.style.opacity = '0'
        
    } else {
        menu.style.opacity = '1'
    }
});

// Генерация элементов для участников и обработка кликов на сердечках
generateButton.addEventListener('click', () => {
    container.innerHTML = '';
    contestants.forEach((contestant, index) => {
        const contestantDiv = document.createElement('div');
        contestantDiv.className = 'contestant';
        contestantDiv.style.flexBasis = `calc(100% / ${columns})`;
        contestantDiv.innerHTML = `
            <img src="${URL.createObjectURL(contestant.img)}" alt="${contestant.name}" />
            <p class="contestant-name">${contestant.name}</p>
            <div class="hearts" data-index="${index}">
                <img class="heart" src="${heartsPath}" alt="heart" data-clicked="false" />
                <img class="heart" src="${heartsPath}" alt="heart" data-clicked="false" />
                <img class="heart" src="${heartsPath}" alt="heart" data-clicked="false" />
                <div class="cross" data-index="${index}"></div>
            </div>
        `;
        container.appendChild(contestantDiv);

        // Добавляем обработчики событий для сердец
        const hearts = contestantDiv.querySelectorAll('.heart');
        const cross = contestantDiv.querySelector('.cross');
        const contestantName = contestantDiv.querySelector('.contestant-name')
        hearts.forEach((heart, heartIndex) => {
            heart.addEventListener('click', () => {
                const isClicked = JSON.parse(heart.getAttribute('data-clicked'));
                if (isClicked && contestant.heartsLeft > 0) {
                    contestant.heartsLeft--;
                    heart.style.filter = 'none';
                    heart.setAttribute('data-clicked', 'false');
                } else if (!isClicked) {
                    contestant.heartsLeft++;
                    heart.style.filter = 'grayscale(100%)';
                    heart.setAttribute('data-clicked', 'true');
                }

                // Проверяем, если все сердца нажаты и затем возвращены, скрываем крестик
                const heartsClicked = contestantDiv.querySelectorAll('.heart[data-clicked="true"]');
                if (heartsClicked.length > 2) {
                    cross.style.display = 'block';
                    contestantDiv.style.opacity = '0.85';
                    contestantDiv.style.backgroundColor = 'brown';
                    contestantName.style.color = 'aliceblue'
                } else {
                    cross.style.display = 'none';
                    contestantDiv.style.opacity = '1';
                    contestantDiv.style.backgroundColor = 'aliceblue';
                    contestantName.style.color = 'black'
                    
                }
            });
        });
    });
});
