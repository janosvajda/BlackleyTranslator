/*  Translator extension for Google Chrome 
    Author: Janos Vajda
    License: GNU General Public License
*/

'use strict';

chrome.commands.onCommand.addListener(function(command) {
        console.log('Command:', command);
});

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

function OnClickOpenOptions(info, tab){
    chrome.tabs.create({ 'url': 'chrome://extensions/?options=' + chrome.runtime.id });
}


function myFunction(a, selectedText, tab){
    if (tab) {
        chrome.tabs.sendMessage(tab.id, {'selectedText': selectedText,'translatedText': a.responseData.translatedText});
    }
}

var title = "On the fly (Mymemory Translate API)";
chrome.contextMenus.create({"title": title, "contexts":["selection"],
                                    "onclick": OnClickMymemoryDictionary});

var title = "Google Translate";
chrome.contextMenus.create({"title": title, "contexts":["selection"],
                                    "onclick": OnClickGTranslate});

var title = "Macmillan Dictionary";
chrome.contextMenus.create({"title": title, "contexts":["selection"],
                                    "onclick": OnClickMacmillanDictionary});

var title = "Oxford Dictionary";
chrome.contextMenus.create({"title": title, "contexts":["selection"],
                                    "onclick": OnClickOxfordDictionary});

chrome.contextMenus.create({ "type": "separator" });

chrome.contextMenus.create({"contexts":["selection"],"type": "separator",
                                    "onclick": OnClickOxfordDictionary});

var title = "Oprions";
chrome.contextMenus.create({"title": title, "contexts":["selection"],
                                    "onclick": OnClickOpenOptions});

