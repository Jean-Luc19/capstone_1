const URL = "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyAoq2H7SrmQO7EeyXNvdwYWXHYYM4Xh0Ms";
const API_KEY = "AIzaSyAoq2H7SrmQO7EeyXNvdwYWXHYYM4Xh0Ms";
const appState = {
  storedFonts : [],
  currentHeaderFont : "",
  currentParagraphFont : ""
};
const WebFontConfig = {
  google: {
    families: []
  },
  loading: function() {},
  active: function() {},
  inactive: function() {},
  fontloading: function(familyName, fvd) {$('#js-genHeader').text("Loading your fonts!").fadeIn('fast');},
  fontactive: function(familyName, fvd) {
    $('#js-genHeader').hide().css("font-family", appState.currentHeaderFont).fadeIn('fast');
    $('#js-genParagraph').hide().css("font-family", appState.currentParagraphFont).fadeIn('fast');
  },
  fontinactive: function(familyName, fvd) {}
};



function getData(){
  const query = {
    sort: "popularity"
  };
  $.getJSON(URL, query, handleData);
}

function handleData({items}){
  populateFontArray(items, appState.storedFonts);
}

function populateFontArray(fonts, storedFonts){
  $.each(fonts, function(_index, {family, category, variants}){
    storedFonts.push(family);
  });
}

function getRandomFonts(state){
  state.currentHeaderFont = state.storedFonts[Math.floor(Math.random() * state.storedFonts.length)];
  state.currentParagraphFont = state.storedFonts[Math.floor(Math.random() * state.storedFonts.length)];
  console.log(state.currentHeaderFont + " / " + state.currentParagraphFont);
}


function generateCurrentFontArray({currentHeaderFont, currentParagraphFont}){
  WebFontConfig.google.faamilies = [currentHeaderFont, currentParagraphFont];
}

function initializeClickHandlers(){
  $('#js-container').on("click", "#js-randomizeBtn", function(){
    getRandomFonts(appState);
    generateCurrentFontArray(appState)
    WebFont.load(WebFontConfig);
  });
}

$(function(){
  getData();
  initializeClickHandlers();
});




