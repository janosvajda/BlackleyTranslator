/*  Simple translator Google Chrome extension
    Author: Janos Vajda
    License: GNU General Public License
*/

'use strict';

function OnClickGTranslate(info, tab) {
    window.open("https://translate.google.com/#auto/hu/"+info.selectionText);
}

function OnClickMacmillanDictionary(info, tab) {
    window.open("http://www.macmillandictionary.com/search/british/direct/?q="+info.selectionText);
}

function OnClickOxfordDictionary(info, tab) {
    window.open("http://www.oxforddictionaries.com/definition/english/add?q="+info.selectionText);
}


function OnClickMymemoryDictionary(info, tab) {
var xmlhttp = new XMLHttpRequest();
var url="http://api.mymemory.translated.net/get?q="+info.selectionText+"&langpair=en|hu";
xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    var myArr = JSON.parse(xmlhttp.responseText);
        myFunction(myArr, info.selectionText, tab);
    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();
}

function myFunction(a, selectedText, tab){
    if (tab) {
        chrome.tabs.sendMessage(tab.id, {'selectedText': selectedText,'translatedText': a.responseData.translatedText});
    }
}

var title = "On the fly (Mymemory Translate API)";
var id = chrome.contextMenus.create({"title": title, "contexts":["selection"],
                                    "onclick": OnClickMymemoryDictionary});

var title = "Google Translate";
var id = chrome.contextMenus.create({"title": title, "contexts":["selection"],
                                    "onclick": OnClickGTranslate});

var title = "Macmillan Dictionary";
var id = chrome.contextMenus.create({"title": title, "contexts":["selection"],
                                    "onclick": OnClickMacmillanDictionary});

var title = "Oxford Dictionary";
var id = chrome.contextMenus.create({"title": title, "contexts":["selection"],
                                    "onclick": OnClickOxfordDictionary});
