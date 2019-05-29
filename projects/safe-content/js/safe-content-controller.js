'use strict'

function onCheckLogin() {
    
    checkLogin()
}

function onInit() {
    renderHeader()
}

function onAdminInit() {
    if (!checkIsAdmin()) location = 'index.html'
    renderUsers()
}

function renderUsers() {
    var strHtmls=[];
        strHtmls.push(`<table border="1"><thead><tr><td>id</td><td>user name</td><td>password</td><td>is admin</td></tr>`)
        strHtmls.push(...gUsers.map(user => {
            return `<tr><td>${user['id']}</td><td>${user['userName']}
            </td><td>${user['userPassword']}</td><td>${user['isAdmin']}</td></tr>`
        }))
        strHtmls.push(`</thead></table>`)
        document.querySelector('.article').innerHTML = strHtmls.join('')
    }


function renderHeader() {
    var strHTML = `<h1>hello ${loadFromStorage('logged-user')['userName']}</h1><button onclick="onLogOut()">Logout</button>`
    if (checkIsAdmin()) strHTML+= `</h1><button onclick="onGoAdminPage()">Admin page</button>`
    document.querySelector('.greet').innerHTML = strHTML
}

function onLogOut() {
    logout()
}

function onGoAdminPage() {
    goAdminPage()
}

function onSetSort(condition) {
    setSort(condition);
    renderUsers();
}