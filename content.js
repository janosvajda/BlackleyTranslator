/*  Translator extension for Google Chrome 
    Author: Janos Vajda
    License: GNU General Public License
*/

var closedialog;

var dialogdiv = document.createElement( 'div' );
var txtDiv = document.createElement( 'div' );

document.body.appendChild( dialogdiv );
dialogdiv.appendChild( txtDiv );

dialogdiv.id = 'dialogdivTranslator';

txtDiv.id = 'translationContentDiv';
txtDiv.innerText ="";

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    txtDiv.innerText = message.selectedText+" : " + message.translatedText;
    $('#dialogdivTranslator').dialog('open');
});

function overlayclickclose() {
    if (closedialog===1){
        $('#dialogdivTranslator').dialog('close');
    }
}

$('#dialogdivTranslator').dialog({
    autoOpen: false,
    open: function() {
        closedialog = 1;
        $(document).bind('click', overlayclickclose);
    },
    focus: function() {
        closedialog = 0;
    },
    close: function() {
        $(document).unbind('click');
    },
    buttons: {
        Close: function() {
            $(this).dialog('close');
        }
    }
});