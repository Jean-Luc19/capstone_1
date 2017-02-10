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
  currentParaFont: "",
  userPreferences: {
    headerFontCategory : "sans-serif",
    paraFontCategory : "serif",
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
      families: [state.currentHeaderFont, state.currentParaFont]
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
  updateCurrentFontNames(state);
}

function updateExampleElements({currentHeaderFont, currentParaFont}) {
  $('#js-genHeader').css("font-family", currentHeaderFont);
  $('.js-genPara').css("font-family", currentParaFont);
}

function updateCurrentFontNames({currentHeaderFont, currentParaFont}){
  $('#currentHeaderFont').html(currentHeaderFont);
  $('#currentParaFont').html(currentParaFont);
}

//cant use object deconstruction here!
function updateFonts(state) {
  if(!state.userPreferences.headerLocked){
    state.currentHeaderFont = getRandomFont(state, "header");
  }
  if(!state.userPreferences.paraLocked){
    state.currentParaFont = getRandomFont(state, "para");
  }
}

function getRandomFont({cachedFonts, userPreferences}, element){
  switch(element){
    case "header" : return cachedFonts[userPreferences.headerFontCategory][Math.floor(Math.random() * cachedFonts[userPreferences.headerFontCategory].length)].family;
    case "para" : return cachedFonts[userPreferences.paraFontCategory][Math.floor(Math.random() * cachedFonts[userPreferences.paraFontCategory].length)].family;
  }
}

function initializeClickHandlers(state) {
  $('#js-container').on("click", "#js-randomizeBtn", function () {
    updateFonts(state); 
    WebFont.load(updateWebFontConfig(state));
  });
/// checking PUDH //////
  $("#js-container").on("click", "#js-resultsBtn", function(e) {
    $(".headerResult").html(`<pre><code>&lt;link href="https://fonts.googleapis.com/css?family=${state.currentHeaderFont})" rel="stylesheet"&gt;</code></pre>`);
    console.log("working");
  });

  $('#js-container').on("click", "#js-headerLockBtn", function () {
    state.userPreferences.headerLocked = !state.userPreferences.headerLocked;
  });

  $('#js-container').on("click", "#js-paraLockBtn", function () {
    state.userPreferences.paraLocked = !state.userPreferences.paraLocked;
  });

  $('#js-container').on("change", "#js-headerCategories", function(e){
    state.userPreferences.headerFontCategory = $(e.currentTarget).val();
  });

  $('#js-container').on("change", "#js-paraCategories", function(e){
  state.userPreferences.paraFontCategory = $(e.currentTarget).val();
  });
}
///// turbo dookie //////
$(function () {
  getData();
  initializeClickHandlers(appState);
});