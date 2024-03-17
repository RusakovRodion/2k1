const contestantsInput = document.getElementById('contestantsInput');
const contestantList = document.getElementById('contestantList');
const uploadContestantsButton = document.getElementById('uploadContestants');
const backgroundInput = document.getElementById('backgroundInput');
const menuElements = document.getElementById('menuelements');
const uploadBackgroundButton = document.getElementById('uploadBackground');
const columnCountElement = document.getElementById('columnCount');
const increaseColumnsButton = document.getElementById('increaseColumns');
const decreaseColumnsButton = document.getElementById('decreaseColumns');
const generateButton = document.getElementById('generate');
const container = document.getElementById('container');
const heartsPath = 'heart.png';
const hideButton = document.getElementById('hide');
const menuBackground = document.getElementById('menubackground')



let contestants = [];
let background = '';
let columns = 2;


uploadContestantsButton.addEventListener('click', () => {
    contestantsInput.click();
});

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

uploadBackgroundButton.addEventListener('click', () => {
    backgroundInput.click();
});

backgroundInput.addEventListener('change', () => {
    const file = backgroundInput.files[0];
    background = URL.createObjectURL(file);
    document.body.style.backgroundImage = `url(${background})`;
});

increaseColumnsButton.addEventListener('click', () => {
    if (columns < 15) {
        columns++;
        columnCountElement.innerText = columns;
    }
});

decreaseColumnsButton.addEventListener('click', () => {
    if (columns > 3) {
        columns--;
        columnCountElement.innerText = columns;
    }
});

hideButton.addEventListener('click', () => {
    const elementsToHide = [
        uploadContestantsButton,
        contestantList,
        uploadBackgroundButton,
        menuElements,
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
    if (hideButton.style.opacity === '' || hideButton.style.opacity === '1') {
        hideButton.style.opacity = '0.1';
        menuBackground.style.opacity = '0';
        
    } else {
        hideButton.style.opacity = '1';
        menuBackground.style.opacity = '1';
    }
});


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