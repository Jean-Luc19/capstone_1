const URL = "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyAoq2H7SrmQO7EeyXNvdwYWXHYYM4Xh0Ms";
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
  $.each(fonts, function (_index, {family, category, variants}) {
    cachedFonts[category].push({family, category, variants});
  });
}

function renderPage(state) {
  updateExampleElements(state);
}

function updateExampleElements({currentHeaderFont, currentParagraphFont}) {
  $('#js-genHeader').css("font-family", currentHeaderFont);
  $('.js-genPara').css("font-family", currentParagraphFont);
}

//cant use object deconstruction here!
function updateFonts(state) {
  if(!state.userPreferences.headerLocked){state.currentHeaderFont = state.cachedFonts["sans-serif"][Math.floor(Math.random() * state.cachedFonts["sans-serif"].length)].family;}
  if(!state.userPreferences.paraLocked){state.currentParagraphFont = state.cachedFonts.serif[Math.floor(Math.random() * state.cachedFonts.serif.length)].family;}
}

function initializeClickHandlers(state) {
  $('#js-container').on("click", "#js-randomizeBtn", function () {
    updateFonts(state);
    console.log(`H: ${appState.currentHeaderFont} / P: ${appState.currentParagraphFont}`); 
    WebFont.load(updateWebFontConfig(state));
  });

  $('#js-container').on("click", "#js-headerLockBtn", function () {
    state.userPreferences.headerLocked = !state.userPreferences.headerLocked;
  });

  $('#js-container').on("click", "#js-paraLockBtn", function () {
    state.userPreferences.paraLocked = !state.userPreferences.paraLocked;
  });
}

$(function () {
  getData();
  initializeClickHandlers(appState);
});