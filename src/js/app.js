// IMPORTS - LIBRARIES
import $ from "jquery";

// IMPORTS - API KEY
import {githubApiKey} from "../../secrets.js";

// VARIABLES - DOM ELEMENTS
var divRouteContainer = document.querySelector(".route-content");
var inputGivenUser = document.querySelector(".pagenav_input input")

// FUNCTIONS - PAGE CONTENT GENERATION
function pageGen(){
  divRouteContainer.innerHTML = "";
  let currentRoute = window.location.hash;
  let givenProfile
  if (currentRoute === ""){
    givenProfile = "iwbolling";
  } else {
    givenProfile = currentRoute.slice(1)
  }
  _profileInfoGen(givenProfile, githubApiKey);
  _repoInfoGen(givenProfile, githubApiKey);
};
pageGen();
function _profileInfoGen(givenProfile, githubApiKey){
  let profileInfo = $.getJSON(`https://api.github.com/users/${givenProfile}?access_token=${githubApiKey}`).then(function(serverRes){
    divRouteContainer.innerHTML += `<div class="user-info-column">
                                      <img src="${serverRes.avatar_url}">
                                      <h3>${serverRes.name}</h3>
                                      <p>${serverRes.login}</p>
                                    </div>`
  })
};
function _repoInfoGen(givenProfile, githubApiKey){
  let repoInfo = $.getJSON(`https://api.github.com/users/${givenProfile}/repos?access_token=${githubApiKey}`).then(function(serverRes){
    let genRepos = serverRes.map(function(repo){
      return `<div class="repo-block">
                <h4>${repo.full_name}</h4>
                <p>${repo.description}</p>
                <hr/>
              </div>`
    }).join("");
    divRouteContainer.innerHTML += `<div class="repos-info-column">
                                      ${genRepos}
                                    </div>`
  });
};

// EVENT LISTENERS - PAGE ROUTING
window.addEventListener("hashchange", pageGen);
inputGivenUser.addEventListener("keydown",function(evt){
  if (evt.keyCode === 13){
    window.location.hash = inputGivenUser.value;
  }
})
