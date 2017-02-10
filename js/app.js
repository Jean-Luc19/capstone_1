const URL = "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyAoq2H7SrmQO7EeyXNvdwYWXHYYM4Xh0Ms";
const API_KEY = "AIzaSyAoq2H7SrmQO7EeyXNvdwYWXHYYM4Xh0Ms";
const appState = {
  cachedFonts: {
    serif: [],
    "sans-serif": [],
    display: [],
    monospace: [],
    handwriting: []
  },
  currentHeaderFont: "",
  currentParagraphFont: "",
  userPreferences: {
    headerFontCategory : "",
    paragraphFontCategory : "",
    headerLocked: false,
    paraLocked: false
  }
};

function getData() {
  const query = {
    sort: "popularity"
  };
  $.getJSON(URL, query, handleResponseData);
}

function updateWebFontConfig(state) {
  return webFontConfig = {
    google: {
      families: [state.currentHeaderFont, state.currentParagraphFont]
    },
    loading: function () {},
    active: function () {},
    inactive: function () {},
    fontloading: function (familyName, fvd) {},
    fontactive: function (familyName, fvd) {renderPage(state);},
    fontinactive: function (familyName, fvd) {}
  };
}

function handleResponseData({items}) {
  cacheFonts(items, appState.cachedFonts);
}

function cacheFonts(fonts, cachedFonts) {
  //display, serif, sans-serif, handwriting, monospace
  $.each(fonts, function (_index, {family, category, variants}) {
    cachedFonts[category].push({family, category, variants});
  });
}

function renderPage(state) {
  updateExampleElements(state);
}

function updateExampleElements({currentHeaderFont, currentParagraphFont}) {
  $('#js-genHeader').css("font-family", currentHeaderFont);
  $('#js-genParagraph').css("font-family", currentParagraphFont);
}

function updateFonts(state) {
  if(!state.userPreferences.headerLocked){state.currentHeaderFont = state.cachedFonts["sans-serif"][Math.floor(Math.random() * state.cachedFonts["sans-serif"].length)].family;}
  if(!state.userPreferences.paraLocked){state.currentParagraphFont = state.cachedFonts.serif[Math.floor(Math.random() * state.cachedFonts.serif.length)].family;} 
}

function updatePreferences(newPrefs){

}

function initializeClickHandlers() {
  $('#js-container').on("click", "#js-randomizeBtn", function () {
    updateFonts(appState);
    WebFont.load(updateWebFontConfig(appState));
  });

  $('#js-container').on("click", "#js-headerLockBtn", function () {
    appState.userPreferences.headerLocked = !appState.userPreferences.headerLocked;
    console.log(appState.userPreferences.headerLocked);
  });

  $('#js-container').on("click", "#js-paraLockBtn", function () {
    appState.userPreferences.paraLocked = !appState.userPreferences.paraLocked;
    console.log(appState.userPreferences.paraLocked);
  });
}

$(function () {
  getData();
  initializeClickHandlers();
});