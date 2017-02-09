const URL = "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyAoq2H7SrmQO7EeyXNvdwYWXHYYM4Xh0Ms";
const API_KEY = "AIzaSyAoq2H7SrmQO7EeyXNvdwYWXHYYM4Xh0Ms";
const appState = {};



function getData(){
  const query = {
    sort: "popularity"
  };

  $.getJSON(URL, query, handleData);
}

function handleData({items}){
  $.each(items, function(index, {family, category, variants}){

    console.log(family + " / " + category + " / " + variants);
  });
}

function initializeClickHandlers(){
  $('#js-container').on("click", "#js-randomizeBtn", function(){
    getData();
  });
}


$(function(){
  initializeClickHandlers();
});




