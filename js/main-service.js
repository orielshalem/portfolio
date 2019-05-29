'use strict'
var gNextId = 0;
var gProjects;

function createProjects() {
    gProjects = [
        createProject('book-store', 'one\'s more time for this one', '', 'projects/book-shop/index.html','28th May', 'flexbox'   ),
        createProject('safe-content', 'one\'s more time for this one', '', 'projects/safe-content/index.html','28th May', 'flexbox'   ),
        createProject('guessMe', 'one\'s more time for this one', '', 'projects/guessMe/index.html','28th May', 'flexbox'   ),
        createProject('mine-sweeper', 'one\'s more time for this one', '', 'projects/mine-sweeper/index.html','28th May', 'flexbox'   )
    ]
}

function createProject(name, title, desc, url, date, labels) {
    return {
        id: ++gNextId,
        name: name,
        title: title,
        desc: desc,
        url: url,
        publishedAt: date,
        labels: labels
    }
}

function getProjects() {
    return gProjects;
}

function getProjectById(projId) {
return gProjects.find(proj => proj.id === projId)
}

function createEmailLink(subject, msg) {
    return 'https://mail.google.com/mail/?view=cm&fs=1&to=' + 'orielshalem@gmail.com' + '&su=' + subject + '&body=' + msg;
}