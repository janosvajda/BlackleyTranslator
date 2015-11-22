/*  Translator extension for Google Chrome 
    Author: Janos Vajda
    License: GNU General Public License
*/

var defaultFromLang = "auto";
var defaultToLanguage = "hu";

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("BtnSave").addEventListener("click", saveOptions);
    document.getElementById("BtnRestore").addEventListener("click", loadOptions);
});

function saveOptions() {
    var select_translate_from = document.getElementById("select_translate_from");
    var select_translate_from_ID = select_translate_from.children[select_translate_from.selectedIndex].value;

    var select_translate_to = document.getElementById("select_translate_to");
    var select_translate_to_ID = select_translate_to.children[select_translate_to.selectedIndex].value;
    chrome.storage.sync.set({'select_translate_from_ID': select_translate_from_ID,'select_translate_to_ID': select_translate_to_ID}, function() {
          alert('Settings saved.');
    });    
    
}

function loadOptions() {
    var select_translate_to = document.getElementById("select_translate_to");
    chrome.storage.sync.get("select_translate_to_ID", function (obj) {
        var select_translate_to = document.getElementById("select_translate_to");
        select_translate_to.value = obj.select_translate_to_ID;
    });

    chrome.storage.sync.get("select_translate_from_ID", function (obj) {
        var select_translate_to = document.getElementById("select_translate_from");
        select_translate_to.value = obj.select_translate_from_ID;
    });
}