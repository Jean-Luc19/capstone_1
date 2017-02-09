const URL = "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyAoq2H7SrmQO7EeyXNvdwYWXHYYM4Xh0Ms";
const API_KEY = "AIzaSyAoq2H7SrmQO7EeyXNvdwYWXHYYM4Xh0Ms";
const appState = {
  storedFonts : [],
  currentHeaderFont : "",
  currentParagraphFont : ""
};
const WebFontConfig = {
  google: {
    families: createFontArray(appState)
  },
  loading: function() {},
  active: function() {},
  inactive: function() {},
  fontloading: function(familyName, fvd) {},
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


function getRandomFont(){
  const randomFont = appState.storedFonts[Math.floor(Math.random() * appState.storedFonts.length)];
  const randomFont2 = appState.storedFonts[Math.floor(Math.random() * appState.storedFonts.length)];
  WebFontConfig.google.families.length = 0;
  WebFontConfig.google.families.push(randomFont);
  WebFontConfig.google.families.push(randomFont2);
}


function handleData({items}){
  populateFontArray(items, appState.storedFonts);
}

function populateFontArray(fonts, storedFonts){
  $.each(fonts, function(_index, {family, category, variants}){
    storedFonts.push(family);
    //appState.storedFonts.push({family : family, category : category, variants : variants});
  });
}

function initializeClickHandlers(){
  $('#js-container').on("click", "#js-randomizeBtn", function(){
    getRandomFont();
    WebFont.load(WebFontConfig);
  });
}

$(function(){
  getData();
  initializeClickHandlers();
});




