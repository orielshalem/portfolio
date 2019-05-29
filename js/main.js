'use strict'

$(document).ready(init())

function init() {
    createProjects()
    renderProjects()
}

function renderProjects() {
    var projects = getProjects()
    var strHtmls = projects.map(project => {
        return `
        <div class="col-md-4 col-sm-6 rounded portfolio-item">
            <a class="portfolio-link" onclick="onUpdateModal('${project.id}')" data-toggle="modal" href="#portfolioModal">
                <div class="portfolio-hover">
                    <div class="portfolio-hover-content">
                       <i class="fa fa-plus fa-3x"></i>
                    </div>
                </div>
                <img class="img-fluid" src="img/portfolio/${project.name}.png" >
           </a>
           <div class="portfolio-caption">
              <h4>${project.name}</h4>
              <p class="text-muted">${project.title}</p>
            </div>
       </div>
       `
    })
    $('.row-container').html(strHtmls)
}


function onUpdateModal(projId) {
    var project = getProjectById(Number(projId))
    renderModal(project)
}

function renderModal(project) {
    var strHtmls = `<h2>${project.name}</h2>
    <p class="item-intro text-muted">${project.title}</p>
    <img class="img-fluid d-block mx-auto" src="img/portfolio/${project.name}.png" alt="">
    <p></p>
    <ul class="list-inline">
        <li><button class="btn btn-primary" onclick="onGoToProject('${project.id}')"
         type="button">Visit Project</button></li>
        <li>Date: ${project.publishedAt}</li>
        <li>Client: ${project.labels}</li>
        <li><button class="btn btn-primary" data-dismiss="modal" type="button">
        <i class="fa fa-times"></i>
        Close Project</button></li>
    </ul>`
    console.log(project)
    $('.modal-body').html(strHtmls)
}

function onSubmit() {
    var subject = $('.subject').val();
    var msg = $('.message').val();
    var emailLink = createEmailLink(subject, msg);
    window.open(emailLink)
}

function onGoToProject(projId) {
    var project = getProjectById(Number(projId))
    window.open(project.url)
}