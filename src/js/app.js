// IMPORTS - LIBRARIES
import $ from "jquery";

// IMPORTS - API KEY
import {githubApiKey} from "../../secrets.js";

// VARIABLES - DOM ELEMENTS
var divRouteContainer = document.querySelector(".route-content");
var divUserProfile = document.querySelector(".user-profile");

// VARIABLES - HASH LOCATIONS
let currentRoute = window.location.hash;

// FUNCTIONS - PAGE CONTENT GENERATION
function pageGen(githubApiKey,givenProfile){
  console.log(givenProfile);
  if (givenProfile === ""){
    givenProfile = "iwbolling";
  };
  _profileInfoGen(givenProfile);
  _repoInfoGen(givenProfile);
};
function _profileInfoGen(givenProfile){
  let profileInfo = $.getJSON(`https://api.github.com/users/${givenProfile}?access_token=${githubApiKey}`).then(function(serverRes){
    divRouteContainer.innerHTML += `<div class="user-info-column">
                                      <img src="${serverRes.avatar_url}">
                                      <h3>${serverRes.name}</h3>
                                      <p>${serverRes.login}</p>
                                    </div>`
  })
};
function _repoInfoGen(givenProfile){
  let repoInfo = $.getJSON(`https://api.github.com/users/${givenProfile}/repos?access_token=${githubApiKey}`).then(function(serverRes){
    let genRepos = serverRes.map(function(repo){
      return `<div class="repo-block">
                <h4>${repo.full_name}</h4>
                <p>${repo.description}</p>
              </div>`
    }).join("");
    divRouteContainer.innerHTML += `<div class="repos-info-column">
                                      ${genRepos}
                                    </div>`
  });
};

// EVENT LISTENERS - PAGE ROUTING
window.addEventListener("hashchange",pageGen(githubApiKey,currentRoute.slice(1)));
