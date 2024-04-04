// 1.Сделать верстку
// 2.Получать значение из инпутов
// - очищать значение инпутов
// 3.Данные сохранять в виде массива
// - Добавлять в значение в инпутов в нужный массив
// 4.Сделать кнопку добавление и удаления, перемещение между колоннами
// 5.Данные должны хранятся в локальным хранилище и выводится на экран
// 6.Постараться разделить все на функций что не Босс не ругался

document.addEventListener('DOMContentLoaded', () => {
    let toDoArray = [];
    let inProgressArray = [];
    let doneArray = [];
    let countID = 0;
    const textInput = document.querySelector('#text');
    const btnAdd = document.querySelector('#btn__add');
    const cardToDo = document.querySelector('.card__to-do');
    const cardInProgress = document.querySelector('.card__in-progress');
    const cardDone = document.querySelector('.card__done');

    const makePost = () => {
        return {
            text: textInput.value,
        };
    };

    const drawPost = () => {
        drawToDo();
        drawInProgress();
        drawDone();
    };

    const drawToDo = () => {
        let tasksHTML = '';
        toDoArray.forEach((task, index) => {
            tasksHTML += createTaskHTML(task, index, 'toDo');
        });
        cardToDo.innerHTML = tasksHTML;
    };

    const drawInProgress = () => {
        let tasksHTML = '';
        inProgressArray.forEach((task, index) => {
            tasksHTML += createTaskHTML(task, index, 'inProgress');
        });
        cardInProgress.innerHTML = tasksHTML;
    };

    const drawDone = () => {
        let tasksHTML = '';
        doneArray.forEach((task, index) => {
            tasksHTML += createTaskHTML(task, index, 'done');
        });
        cardDone.innerHTML = tasksHTML;
    };

    const createTaskHTML = (task, index, column) => {
        return `
        <div class="cards__nav">
        <div class="cards__nav-task"><h4>TASK</h4></div>
            <div class="cards__info">
                <p><span>${task.text}</span></p>
                <button class="btn-remove" data-index="${index}" data-column="${column}">X</button>
            </div>
            <div>
                <button class="next" data-index="${index}" data-column="${column}">Next</button>
            </div>
        </div>
        `;
    };

    const savePostsLocal = () => {
        localStorage.setItem('toDoArray', JSON.stringify(toDoArray));
        localStorage.setItem('inProgressArray', JSON.stringify(inProgressArray));
        localStorage.setItem('doneArray', JSON.stringify(doneArray));
    };

    const restoreTasksFromLocal = () => {
        if (localStorage.getItem('toDoArray')) {
            toDoArray = JSON.parse(localStorage.getItem('toDoArray'));
        }
        if (localStorage.getItem('inProgressArray')) {
            inProgressArray = JSON.parse(localStorage.getItem('inProgressArray'));
        }
        if (localStorage.getItem('doneArray')) {
            doneArray = JSON.parse(localStorage.getItem('doneArray'));
        }
        drawPost();
    };

    btnAdd.addEventListener('click', () => {
        const taskText = textInput.value;
        if (taskText !== '') {
            const Task = makePost(taskText);
            toDoArray.push(Task);
            savePostsLocal();
            drawPost();
            textInput.value = '';
        }
    });

    const moveTask = (index, fromCol, toCol) => {
        const task = fromCol.splice(index, 1)[0];
        toCol.push(task);
        savePostsLocal();
        drawPost();
    };

    document.addEventListener('click', (e) => {
        const target = e.target;
        if (target.classList.contains('btn-remove')) {
            const index = parseInt(target.getAttribute('data-index'));
            const column = target.getAttribute('data-column');
            if (column === 'toDo') {
                toDoArray.splice(index, 1);
            } else if (column === 'inProgress') {
                inProgressArray.splice(index, 1);
            } else if (column === 'done') {
                doneArray.splice(index, 1);
            }
            savePostsLocal();
            drawPost();
        } else if (target.classList.contains('next')) {
            const index = parseInt(target.getAttribute('data-index'));
            const column = target.getAttribute('data-column');
            if (column === 'toDo') {
                moveTask(index, toDoArray, inProgressArray);
            } else if (column === 'inProgress') {
                moveTask(index, inProgressArray, doneArray);
            } else if (column === 'done') {
                const index = parseInt(target.getAttribute('data-index'));
                doneArray.splice(index, 1);
                savePostsLocal();
                drawPost();
            }
        }
    });
    restoreTasksFromLocal();
});

