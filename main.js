let category = 'all';

document.querySelector('.category').addEventListener('click', (e) => {
    category = e.target.dataset.cat;
    document.querySelectorAll('.category span').forEach((ele) => {
        ele.classList.remove('active');
    });
    e.target.classList.add('active');
    generateRows();
});

document.querySelector('.input-row .check').addEventListener('click', () => {
    if(document.querySelector('.input-row .check').parentNode.classList.contains('completed')){
        document.querySelector('.input-row .check').parentNode.classList.remove('completed');
    }
    else{
        document.querySelector('.input-row .check').parentNode.classList.add('completed');
    }
});

document.getElementById('clear').addEventListener('click', () => {
    document.querySelectorAll('.row.completed').forEach((ele) => {
        window.localStorage.removeItem(ele.id);
    });
    generateRows();
});

const generateRows = () => {
    document.querySelector('.rows').innerHTML = '';
    let elements = [];
    Object.keys(window.localStorage).forEach( element => {
        let state = '';
        if(JSON.parse(window.localStorage.getItem(element)).state === 'completed') {
            state = 'completed';
        }
        elements.push(
            `<div class="row ${state}" id="${element}">
                <div class="check"></div>
                <div class="task">${JSON.parse(window.localStorage.getItem(element)).task}</div>
                <div class="cross"></div>
            </div>`
        );
    });
    for (let row in elements) {
        document.querySelector('.rows').innerHTML += elements[row];
    }

    if(category === 'completed'){
        document.querySelectorAll('.row:not(.row.completed)').forEach((ele) => {
            ele.style.display = 'none';
        });
    }
    else if(category ==='not completed'){
        document.querySelectorAll('.row.completed').forEach((ele) => {
            ele.style.display = 'none';
        });
    }

    document.getElementById('left').textContent = document.querySelectorAll('.row:not(.row.completed)').length;

    document.querySelectorAll('.task').forEach((ele) => {
        ele.addEventListener('click', () => {
            if(ele.parentNode.classList.contains('completed')){
                let obj = {"task" : ele.textContent, "state" : "not completed"};
                window.localStorage.setItem(ele.parentNode.id, JSON.stringify(obj));
            }
            else{
                let obj = {"task" : ele.textContent, "state" : "completed"};
                window.localStorage.setItem(ele.parentNode.id, JSON.stringify(obj));
            }
            generateRows();
        });
        ele.addEventListener('mouseover', () => {
            ele.previousElementSibling.classList.add('hovered');
        });
        ele.addEventListener('mouseout', () => {
            ele.previousElementSibling.classList.remove('hovered');
        });
    });
    
    document.querySelectorAll('.row').forEach((ele) => {
        ele.addEventListener('mouseover', () => {
            ele.lastElementChild.style.display = 'block';
        });
        ele.addEventListener('mouseout', () => {
            ele.lastElementChild.style.display = 'none';
        });
    });
    
    document.querySelectorAll('.check:not(.input-row .check)').forEach((ele) => {
        ele.addEventListener('click', () => {
            if(ele.parentNode.classList.contains('completed')){
                let obj = {"task" : ele.nextElementSibling.textContent, "state" : "not completed"};
                window.localStorage.setItem(ele.parentNode.id, JSON.stringify(obj));
            }
            else{
                let obj = {"task" : ele.nextElementSibling.textContent, "state" : "completed"};
                window.localStorage.setItem(ele.parentNode.id, JSON.stringify(obj));
            }
            generateRows();
        });    
    });

    document.querySelectorAll('.cross').forEach((ele) => {
        ele.addEventListener('click', (e) => {
            window.localStorage.removeItem(ele.parentNode.id);
            generateRows();
        });
    });
}

generateRows();

document.getElementById('add').addEventListener('keypress', (e) => {
    if(document.getElementById('add').value.length !== 0){
        if(e.key === 'Enter'){
            let num = 1;
            while(window.localStorage.getItem(String(num)) !== null){
                num++;
            }
            let state;
            document.getElementById('add').parentElement.classList.contains('completed') ? state = 'completed' : state = 'not completed';
            let obj = {"task": document.getElementById('add').value, "state": state}
            window.localStorage.setItem(String(num), JSON.stringify(obj));
            document.getElementById('add').value = '';
        }
        generateRows();
    }
});

document.querySelector('.toggle').addEventListener('click', () => {
    if(document.body.classList.contains('dark')){
        document.body.classList.remove('dark');
        document.querySelector('.toggle').src = 'images/icon-moon.svg';
    }else{
        document.body.classList.add('dark');
        document.querySelector('.toggle').src = 'images/icon-sun.svg';
    }
});