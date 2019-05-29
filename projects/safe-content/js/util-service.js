function makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function saveToStorage(key, value) {
    var strValue = JSON.stringify(value);
    localStorage.setItem(key, strValue);
}

function clearFromStorage(key) {
    localStorage.removeItem(key)
}

function loadFromStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}

function sortByName(items) {
    items.sort((a, b) => {
        var txtA = a['userName'].toUpperCase(); // ignore upper and lowercase
        var txtB = b['userName'].toUpperCase(); // ignore upper and lowercase
        if (txtA < txtB) return -1;
        if (txtA > txtB) return 1;
        return 0;
    });
}

function sortByDate(items) {
    items.sort(function (a, b) {
        return b['lastLogin'] - a['lastLogin'];
    });
}