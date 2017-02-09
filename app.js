const URL = "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyAoq2H7SrmQO7EeyXNvdwYWXHYYM4Xh0Ms";
const API_KEY = "AIzaSyAoq2H7SrmQO7EeyXNvdwYWXHYYM4Xh0Ms";
const appState = {
  storedFonts : []
};
const WebFontConfig = {
  google: {
    families: []
  },
  loading: function() {},
  active: function() {},
  inactive: function() {},
  fontloading: function(familyName, fvd) {},
  fontactive: function(familyName, fvd) {
    $('#js-genHeader').hide().css("font-family", this.google.families[0]).fadeIn('fast');
    $('#js-genParagraph').hide().css("font-family", this.google.families[0]).fadeIn('fast');
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
  WebFontConfig.google.families.length = 0;
  WebFontConfig.google.families.push(randomFont);
}


function handleData({items}){
  populateFontArray(items);
}

function populateFontArray(fonts){
  $.each(fonts, function(index, {family, category, variants}){
    appState.storedFonts.push(family);
    //appState.storedFonts.push({family : family, category : category, variants : variants});
  });
}

function initializeClickHandlers(){
  $('#js-container').on("click", "#js-randomizeBtn", function(){
    getRandomFont();
    WebFont.load(WebFontConfig);
    console.log(WebFontConfig.google.families);
  });
}

$(function(){
  getData();
  initializeClickHandlers();
});

//trigger WebFont.load and pass in the WebFontConfig w/ our parameters
//listen for the fontactive event to be complete
//allow for another random at this time


//assign desired font in fontloader config
//run fontloader
//use active callback to jquery something
//????
//profit




