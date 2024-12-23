// Буквы
const letters = "abcdefghijklmnopqrstuvwxyz";

// Делаем массив из букв
let lettersArray = Array.from(letters);

// Создаем контейнер для букв
let lettersContainer = document.querySelector(".letters");

// Перебираем массив
lettersArray.forEach(letter => {

    // И создаем строковой контейнер span
    let span = document.createElement("span");

    // Создает текст к документу
    let theLetter = document.createTextNode(letter);

    // Добавляем theLetter как последний дочерний элемент элемента
    span.appendChild(theLetter);

    // Даем название
    span.className = 'letter-box';

    // Добавляем span как последний дочерний элемент lettersContainer
    lettersContainer.appendChild(span);

});

// Слова
const words = {
    Языки: ["javascript", "python", "java", "sql", "php", "kotlin", "ruby", "swift", "typescript"],
    Сортировки: ["selection", "bubble", "insertion", "merge", "quick", "bucket", "radix", "heap"],
    CSS: ["flex", "padding", "margin", "color", "border", "position", "display", "height", "width", "font-size"],
    HTML: ["div", "button", "span", "script", "link", "style", "title", "form", "table"]
}

// console.log(allKeys[2]); 
// Возвращает массив всех ключей words

let allKeys = Object.keys(words);

// Random Number Depends On Keys Length //  Рандом Индекс, зависящий от length words
let randomPropNumber = Math.floor(Math.random() * allKeys.length);

// Получаем название массива
let randomPropName = allKeys[randomPropNumber];

// Значения массива
let randomPropValue = words[randomPropName];

// Выбираем рандом слово из значений массива
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);

// Присваеваем это слово и категорию
let randomValueValue = randomPropValue[randomValueNumber];

// Устанавливаем категорию
document.querySelector(".game-info .category span").innerHTML = randomPropName;

let lettersGuessContainer = document.querySelector(".letters-guess");

// Превращаем слово в массив букв
let lettersAndSpace = Array.from(randomValueValue);
// Создаем див попыток
let wrongAttemptsContainer = document.createElement("div");
wrongAttemptsContainer.className = "wrong-attempts";
wrongAttemptsContainer.innerHTML = "Ошибок: 0";
document.querySelector(".container").prepend(wrongAttemptsContainer);

// Проходимся по массиву
lettersAndSpace.forEach(letter => {

    // И создаем строковой контейнер на каждую букву
    let emptySpan = document.createElement("span");

    // Если слово с пробелом
    if (letter === ' ') {

        // То создается отдельный класс 'with-space'
        emptySpan.className = 'with-space';

    }

    // Добавляем этот класс в lettersGuessContainer
    lettersGuessContainer.appendChild(emptySpan);

});

let guessSpans = document.querySelectorAll(".letters-guess span");

// Устанавливаем количество попыток, угаданных букв и максимальное число попыток
let wrongTries = 0;
let correctGuesses = 0;
const maxWrongTries = 8;

let theDraw = document.querySelector(".hangman-draw");

// Добавляем обработчик событий по всему документу
document.addEventListener("click", (e) => {

    // Добавляем статус правильной/неправильной нажатой букву
    let theStatus = false;
    // Проверяем если нажали на буквы
    if (e.target.classList.contains("letter-box")) {
        // 
        e.target.classList.add("clicked");

        // Получаем нажатую букву
        let theClickedLetter = e.target.innerHTML.toLowerCase();

        // Создаем переменную и помещаем туда массив букв из рандомного слова
        let theChosenWord = Array.from(randomValueValue.toLowerCase());

        theChosenWord.forEach((wordLetter, WordIndex) => {

            // Проверяем если нажатая буква равна индексу(букве) слова
            if (theClickedLetter == wordLetter) {

                // Если правильно нажали на букву, то прибавляем счетчик 
                theStatus = true;
                correctGuesses++;

                // Перебираем все элементы span 
                guessSpans.forEach((span, spanIndex) => {
                    // Если индекс текущей буквы в загаданном слове совпадает с индексом span
                    if (WordIndex === spanIndex) {
                        // То, theClickedLetter добавляем в соотвестувующий span. Далее будет отображаться угаданная буква.
                        span.innerHTML = theClickedLetter;

                    }
                });

            }

        });


        // Если буква не та
        if (!theStatus) {

            // Прибавляем к счетчику
            wrongTries++;

            wrongAttemptsContainer.innerHTML = `Ошибок: ${wrongTries}`;

            // Добавляем неправильные попытки к theDraw классу
            theDraw.classList.add(`wrong-${wrongTries}`);;

            // Если неправильных попыток 8

            if (wrongTries === maxWrongTries) {
                endGame(false);

                // Блокируем клики на буквы
                lettersContainer.classList.add("finished");

            }
        }
        // Если мы нажали на все правильные буквы(не считая пробел), то игра завершается
        if (correctGuesses === lettersAndSpace.filter(letter => letter != ' ').length) {
            endGame(true);
        }
    }

});

// Функция завершения игры. Принимает Boolean значение
function endGame(isWin) {
    // Создаем popup
    let div = document.createElement("div");
    let divText = isWin ?
        // Создаем узел содержащий текст:
        document.createTextNode("Вы выиграли! ") :
        document.createTextNode(`Вы проиграли, загаданное слово - ${randomValueValue}`);
    div.appendChild(divText);
    div.className = 'popup';
    document.body.appendChild(div);

    // Блокируем клики на буквы
    lettersContainer.classList.add("finished");

    // Перезагрузка игры через 3 секунды
    setTimeout(() => {
        location.reload();
    }, 3000);
}