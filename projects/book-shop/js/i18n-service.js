var gTrans = {
    title: {
        en: 'Welcome to my book store',
        he: 'ברוך הבא לחנות הספרים שלי'
    },
    'btn-new-book': {
        en: 'Create new button',
        he: 'צור ספר חדש'
    },
    'thead-id': {
        en: 'id',
        he: 'מזהה'
    },
    'thead-title': {
        en: 'Title',
        he: 'כותר'
    },
    'thead-rate': {
        en:'Rating',
        he:'דירוג'
    },
    'thead-action': {
        en: 'Action',
        he: 'פעולות'
    },
    'thead-price': {
        en:'Price',
        he:'מחיר'
    },
    'btn-read': {
        en:'Read',
        he:'קרא'
    },
    'btn-update': {
        en:'Update',
        he:'עדכן'
    },
    'btn-delete': {
        en:'Delete',
        he:'מחק'
    },
}

var gCurrLang = 'en';

function doTrans() {
    var els = document.querySelectorAll('[data-trans]');
    
    for (var i = 0; i < els.length; i++) {
        var el = els[i];
        // var transKey = el.getAttribute('data-trans');
        var transKey = el.dataset.trans;
        
        var txt = getTrans(transKey);

        // Translating is actually complex and needs a library
        if (el.nodeName === 'INPUT') {
            el.setAttribute('placeholder', txt);
        } else {
            el.innerText = txt;
        }
    }
}


function getTrans(transKey) {
    var keyTrans = gTrans[transKey];
    if (!keyTrans) return 'UNKNOWN';

    var txt = keyTrans[gCurrLang];

    // If not found - use english
    if (!txt) txt = keyTrans['en'];

    return txt;
}


function setLang(lang) {
    gCurrLang = lang;
}

function formatNumOlder(num) {
    return num.toLocaleString('es')
}

function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num);
}

function formatCurrency(num) {
    return new Intl.NumberFormat('he',{ style: 'currency', currency: 'ILS' }).format(num);
}

function formatDate(time) {

    var options = {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: true,
    };

    return new Intl.DateTimeFormat(gCurrLang,options).format(time);
}


function kmToMiles(km) {
    return km / 1.609;
}