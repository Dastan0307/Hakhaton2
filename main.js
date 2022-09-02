let users = [
    {
    name: 'Dastan',
    password: 2003,
    age: 19,
    isLogin: true,
    }
];

let posts = [
    {
        id: 1,
        user: 'Dastan'
    }
]



let inSystem = '';
function changeInSystemUser(userName = '') {
    inSystem = userName;
    let h1 = document.querySelector('h1');
    inSystem ? h1.innerText = `Пользователь: ${inSystem} в системе` : h1.innerText = 'Пользователь не в системе!';
}



//create logic
function checkUniqueUserName(userName) {
    return users.some(item => item.name === userName);
};



function checkPassword(pass, passConfirm) {
    return pass === passConfirm;
};
function createUser() {
    while(true){
    let userName = prompt('Введите имя');
    if(checkUniqueUserName(userName)){
        alert('Пользователь уже существует!');
        return;
    };
    let pass = prompt('Введите пароль');
    let passConfirm = prompt('Введите подтверждение пароля');
    if(!checkPassword(pass, passConfirm)){
        alert('Пароли не совпадают');
        return;
    };
 let age = +prompt('Введите возраст');
    let userObj = {
        name: userName,
        password: pass,
        age: age,
        isLogin: false,
        id: Date.now()
    };
    users.push(userObj);
    alert('Успешно зарегистирован!');
    console.log(users);
    let decide = confirm('Выйти');
    if(decide){break;}
    }
};




function getUserObj(userName) {
    return users.find(item => item.name === userName);
};

function checkUserPassword(userName,pass) {
    let user = getUserObj(userName);
    return user.password === pass;
};

function loginUser() {
    let userName = prompt('Введите имя пользователя');
    if(!checkUniqueUserName(userName)){
        alert('Пользователь не найден');
        return;
    };
    let pass = prompt('Введите пароль');
    let user = getUserObj(userName);
    if(!checkPassword(user.password, pass)) {
        alert('Пароль не соответствует этой учетной записи');
        return;
    };
    user.isLogin = true;
    changeInSystemUser(userName);
};


function logoutUser() {
    let user = getUserObj(inSystem);
    // console.log(user);
    user.isLogin = false;
    inSystem = '';
    changeInSystemUser('');
};









function createPost() {
    if(!inSystem) {
        alert('Only authories users can create post');
        return;
    };
    let postObj = {
        id: Date.now(),
        user: inSystem,
    };
    posts.push(postObj);
    alert('Post successfully created');
    console.log(posts);
};



/////////////////////////////////////////////

function getPostObj(id) {
    return posts.find(item => item.id === id);
};


function cheeckMessage(obj) {
    return Object.keys(obj).some(item => item === 'сообщение');
}
function creatMessage() {
    if(!inSystem) {
        alert('Только авторизованные пользователи могут отпрасить сообщение!!!');
        return;
    };
    let postId = +prompt('ID');
    let postObj = getPostObj(postId);
    if(!postObj) {
        alert('Посты не найдены');
        return;
    };
    let messageContent = prompt('Коментарии');
    let messageObj = {
        id: 'сообщение от id -' + Date.now(),
        message: [messageContent],
        user:'От -> ' + inSystem
    };
    if(cheeckMessage(postObj)) {
        postObj.message.push(commentObj);
    }else {
        postObj.message = [messageObj, ];
    };
    alert('Сообщение успешно отправлен' );
    console.log(posts);
};


///////////////////////////
function getCommentObj(id) {
    let = message = [];
    let getMessage = posts.forEach(item => {
        if(item.message) {
            for(i of item.message) {
                message.push(i);
            }
        }
    });
    return message.find(item => item.id === id);
};


function checkOwnerComment(id) {
    let messageObj = getCommentObj(id);
    return messageObj && messageObj.user === inSystem;
};

function deleteComment() {
    if(!inSystem) {
        alert('Только авторизованные!!!');
        return;
    };
    let messageId = prompt('ID');
    if(!checkOwnerComment(messageId)) {
            alert('Сообщение нет!');
            return;
    };
    posts = posts.map(item => {
        if(item.message) {
            item.message = item.message.filter(message => message.id !== messageId);
        };
        return item;
    })
    alert('Удалено');
    console.log(posts);
};