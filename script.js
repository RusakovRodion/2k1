// Список элементов DOM по их ID
const uploadBackgroundButton = document.getElementById('uploadBackground');
const backgroundInput = document.getElementById('backgroundInput');
const uploadContestantsButton = document.getElementById('uploadContestants');
const contestantsInput = document.getElementById('contestantsInput');
const contestantList = document.getElementById('contestantList');
const styleSettings = document.getElementById('styleSettings');
const backgroundColorInput = document.getElementById('BackgroundColor');
const columnCountSlider = document.getElementById('columnCountSlider');
const columnCountSpan = document.getElementById('columnCount');
const contestantWidthSlider = document.getElementById('contestantWidth');
const contestantWidthSpan = document.getElementById('contestantWidthCount');
const contestantHeightSlider = document.getElementById('contestantHeight');
const contestantHeightSpan = document.getElementById('contestantHeightCount');
const contestantAngleSlider = document.getElementById('contestantAngle');
const contestantAngleSpan = document.getElementById('contestantAngleCount');
const contestantOpacitySlider = document.getElementById('contestantOpacity');
const contestantOpacitySpan = document.getElementById('contestantOpacityCount');
const contestantImageSizeSlider = document.getElementById('contestantImageSize');
const contestantImageSizeSpan = document.getElementById('contestantImageSizeCount');
const contestantNameSizeSlider = document.getElementById('contestantNameSize');
const contestantNameSizeSpan = document.getElementById('contestantNameSizeCount');
const contestantLivesSlider = document.getElementById('contestantLives');
const contestantLivesSpan = document.getElementById('contestantLivesCount');
const contestantLivesSizeSlider = document.getElementById('contestantLivesSize');
const contestantLivesSizeSpan = document.getElementById('contestantLivesSizeCount');
const contestantBackgroundColorInput = document.getElementById('contestantBackgroundColor');
const hideButton = document.getElementById('hide');
const containerDiv = document.getElementById('container');
const uploadContestantsBackgroundButton = document.getElementById('uploadContestantsBackground');
const uploadContestantsBackgroundInput = document.getElementById('uploadContestantsBackgroundInput');
const contestantBackgroundSizeSlider = document.getElementById('contestantBackgroundSize');
const contestantBackgroundSizeSpan = document.getElementById('contestantBackgroundSizeCount');


let background = '';
let contestants = [];
let contestantBackground = 'rgb(40, 40, 40)';
let contestantWidth = 100;
let contestantHeight = 100;
let contestantAngle = 0;
let contestantOpacity = 0;
let contestantImageSize = 0;
let contestantNameSize = 0;
let contestantLives = 3;
let contestantLivesSize = 0;
let heartPath = 'heart.png';
let markerPath = 'marker.png';




//--------- Обработка ФОНА ---------
// Обработчик для кнопки загрузки фона
uploadBackgroundButton.addEventListener('click', () => {
    backgroundInput.click();
});

// Обработчик для выбора файла фона
backgroundInput.addEventListener('change', () => {
    let file = backgroundInput.files[0];
    background = URL.createObjectURL(file);
    document.body.style.backgroundImage = `url(${background})`;
});


// Обработчик изменения цвета фона
backgroundColorInput.addEventListener('input', function() {
    let selectedColor = backgroundColorInput.value;
    document.body.style.backgroundColor = selectedColor;
});

// Обработчик клика по кнопке загрузки фона участника
uploadContestantsBackgroundButton.addEventListener('click', () => {
    uploadContestantsBackgroundInput.click();
});

// Обработчик события изменения файла фона участника
uploadContestantsBackgroundInput.addEventListener('change', () => {
    const file = uploadContestantsBackgroundInput.files[0];
    const contestantsDivs = document.querySelectorAll('.contestant');
    contestantsDivs.forEach((contestantDiv) => {
        contestantDiv.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
    });
});

// Обработчик события ползунка изменения размера заднего фона участника
contestantBackgroundSizeSlider.addEventListener('input', () => {
    let currentValue = parseInt(contestantBackgroundSizeSlider.value);
    contestantBackgroundSizeSpan.innerText = currentValue;
    
    let contestantsStyles = document.getElementsByClassName('contestant')
    for (let i = 0; i < contestantsStyles.length; i++) {
        contestantsStyles[i].style.backgroundSize = currentValue + 'em';
    }
});

//--------- Конец обработки ФОНА ---------


//--------- Обработка Ползунков ---------

// Обработчик изменения цвета фона
contestantBackgroundColorInput.addEventListener('input', function() {
    let selectedColor = contestantBackgroundColorInput.value;
    let contestantsStyles = document.getElementsByClassName('contestant')
    for (let i = 0; i < contestantsStyles.length; i++) {
        contestantsStyles[i].style.backgroundColor = selectedColor;
    }
});

// Обработчик ползунка столбцов
// columnCountSlider.addEventListener('input', () => {
//     let currentValue = parseInt(columnCountSlider.value);
//     columnCountSpan.innerText = currentValue;
//     columns = currentValue;
//     generateContestants();
// });


// Обработчик ползунка ширины поля участника
contestantWidthSlider.addEventListener('input', () => {
    let currentValue = parseInt(contestantWidthSlider.value);
    contestantWidthSpan.innerText = currentValue;
    contestantWidth = currentValue;
    let contestantsStyles = document.getElementsByClassName('contestant')
    for (let i = 0; i < contestantsStyles.length; i++) {
        contestantsStyles[i].style.width = currentValue + 'px';
    }
});

// Обработчик ползунка высоты поля участника
contestantHeightSlider.addEventListener('input', () => {
    let currentValue = parseInt(contestantHeightSlider.value);
    contestantHeightSpan.innerText = currentValue;
    contestantHeight = currentValue;
    let contestantsStyles = document.getElementsByClassName('contestant')
    for (let i = 0; i < contestantsStyles.length; i++) {
        contestantsStyles[i].style.height = currentValue + 'px';
    }
});

// Обработчик ползунка скругления поля участника
contestantAngleSlider.addEventListener('input', () => {
    let currentValue = parseInt(contestantAngleSlider.value);
    contestantAngleSpan.innerText = currentValue;
    contestantAngle = currentValue;
    let contestantsStyles = document.getElementsByClassName('contestant')
    for (let i = 0; i < contestantsStyles.length; i++) {
        contestantsStyles[i].style.borderRadius = currentValue + '%';
    }
});

// Обработчик ползунка прозрачности поля участника
contestantOpacitySlider.addEventListener('input', () => {
    let currentValue = parseInt(contestantOpacitySlider.value);
    contestantOpacitySpan.innerText = currentValue;
    contestantOpacity = 1-(currentValue * 0.01);
    let contestantsStyles = document.getElementsByClassName('contestant')
    for (let i = 0; i < contestantsStyles.length; i++) {
        selectedColor = contestantsStyles[i].style.backgroundColor;
        colors = selectedColor.split(',')
        parsed_color = colors[0]+', '+colors[1]+', '+colors[2].replace(')','')+', '+contestantOpacity+')';
        // parsed_color = selectedColor.replace(')', ', '+contestantOpacity+')');
        console.log(parsed_color);
        contestantsStyles[i].style.backgroundColor = parsed_color;
        
    }
});

// Обработчик ползунка размера фото участника
contestantImageSizeSlider.addEventListener('input', () => {
    let currentValue = parseInt(contestantImageSizeSlider.value);
    contestantImageSizeSpan.innerText = currentValue;
    contestantImageSize = currentValue;
    let photos = document.getElementsByClassName('photo')
    for (let i = 0; i < photos.length; i++) {
        photos[i].style.width = contestantImageSize + 'em';
        photos[i].style.height = contestantImageSize + 'em';
    }
});

// Обработчик ползунка размера имени участника
contestantNameSizeSlider.addEventListener('input', () => {
    let currentValue = parseInt(contestantNameSizeSlider.value);
    contestantNameSizeSpan.innerText = currentValue;
    contestantNameSize = currentValue;
    let names = document.getElementsByClassName('contestant-name')
    for (let i = 0; i < names.length; i++) {
        names[i].style.fontSize = currentValue*0.1 + 'em';
    }
});

// Обработчик ползунка количества жизней участника
contestantLivesSlider.addEventListener('input', () => {
    let currentValue = parseInt(contestantLivesSlider.value);
    contestantLivesSpan.innerText = currentValue;
    contestantLives = currentValue;

    generateContestants();

});

// Обработчик ползунка размера жизней участника
contestantLivesSizeSlider.addEventListener('input', () => {
    let currentValue = parseInt(contestantLivesSizeSlider.value);
    contestantLivesSizeSpan.innerText = currentValue;
    contestantLivesSize = currentValue*0.5;
    let hearts = document.getElementsByClassName('heart')
    for (let i = 0; i < hearts.length; i++) {
        hearts[i].style.width = contestantLivesSize + 'em';
        hearts[i].style.height = contestantLivesSize + 'em';
    }
    let markers = document.getElementsByClassName('marker')
    for (let i = 0; i < markers.length; i++) {
        markers[i].style.width = contestantLivesSize + 'em';
        markers[i].style.height = contestantLivesSize + 'em';
    }
});

//--------- Конец обработки Ползунков ---------

//--------- Скрытие Меню ---------

hideButton.addEventListener('click', () => {
    markers = document.getElementsByClassName('marker')
    for (let i = 0; i < markers.length; i++) {
        markers[i].style.display = 'none';
    }

    const elementsToHide = [
        styleSettings
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

//--------- Конец Скрытия Меню ---------


//--------- Генерация рамок участников -----------------------------------------------------------------------------------------------------------------




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

    generateContestants();
});


// МОЗГИ------------------------------------------
function generateContestants() {
    container.innerHTML = '';
    contestants.forEach((contestant, index) => {
        const contestantDiv = document.createElement('div');
        contestantDiv.className = 'contestant';
        
        // Генерация сердец
        let heartsHTML = '';
        for (let i = 0; i < contestantLives; i++) {
            heartsHTML += `<img class="heart" src="${heartPath}" alt="heart" data-clicked="false" />`;
        }

        contestantDiv.innerHTML = `
            <img class="photo" src="${URL.createObjectURL(contestant.img)}" alt="${contestant.name}" />
            <p class="contestant-name">${contestant.name}</p>
            <div class="hearts" data-index="${index}">
                ${heartsHTML}
            </div>
            <img class="marker" src="${markerPath}" alt="marker"/>
        `;

        container.appendChild(contestantDiv);

        // Добавляем обработчики событий для сердец
        // Находим все элементы сердец, маркер и имя участника
    const heartsContainer = contestantDiv.querySelector('.hearts');
    const hearts = heartsContainer.querySelectorAll('.heart');
    const marker = contestantDiv.querySelector('.marker');
    const contestantName = contestantDiv.querySelector('.contestant-name');

    // Добавляем обработчик кликов на сердца у текущего участника
    hearts.forEach((heart) => {
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
            const heartsClicked = heartsContainer.querySelectorAll('.heart[data-clicked="false"]');
            if (heartsClicked.length === 0) {
                marker.style.display = 'block';
                contestantDiv.style.opacity = '0.85';
                contestantDiv.style.backgroundColor = 'brown';
                contestantName.style.color = 'aliceblue';
            } else {
                marker.style.display = 'none';
                contestantDiv.style.opacity = '1';
                contestantDiv.style.backgroundColor = contestantBackground;
                contestantName.style.color = 'black';     
            }
        });
    });
        
    });
}







