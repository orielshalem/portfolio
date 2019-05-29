'use strict'
var gUsers = []
createUsers()

function checkLogin() {
    var user = (document.querySelector(".user-name").value)
    var password = +(document.querySelector(".user-password").value)
    if (!user || !password) return
    var currUser = gUsers.find(currUser => currUser['userName'] === user)
    if (currUser === -1) return
    if (currUser['userName'] === user && currUser['userPassword'] === password) {
        location = 'user.html';
        currUser['lastLogin'] = Date.now()
        saveUsers()
        saveToStorage('logged-user', currUser)
    }
}

function createUsers() {
    var users = loadFromStorage('users')
    if (!users || !users.length) {
        users = [
            createUser('sami', 1234, true),
            createUser('pami', 123544),
            createUser('tami', 12345)
        ]
    }
    gUsers = users;
    saveUsers();
}

function createUser(name, password, admin = false) {
    return {
        id: makeId(),
        userName: name,
        userPassword: password,
        isAdmin: admin,
        lastLogin: 0
    }
}

function saveUsers() {
    clearFromStorage('users')
    saveToStorage('users', gUsers)
}

function logout() {
    localStorage.removeItem('logged-user')
    location = 'index.html';

}

function checkIsAdmin() {
    var currUser = loadFromStorage('logged-user')
    return !(currUser === null || !currUser['isAdmin'])
}

function goAdminPage() {
    location = 'admin.html';
}

function setSort(condition) {
    if (condition === 'userName') sortByName(gUsers)
    if (condition === 'lastLogin') sortByDate(gUsers)
}

