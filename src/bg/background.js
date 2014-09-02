// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


//example of using a message handler from the inject scripts
// chrome.extension.onMessage.addListener(
//   function(request, sender, sendResponse) {
//   	chrome.pageAction.show(sender.tab.id);
//     sendResponse();
//   });

$(document).ready(function() {

    var Firebase = require("firebase");
    var myDataRef = new Firebase('https://quickreminders.firebaseio.com/');


    
    // var reminderArray = [];
    
    $('#button').click(function() {
        var reminderText = $('#reminder').val();
        console.log(reminderText);
        $('.list').prepend('<div class="item">'+ reminderText+ '</div>');

        // firebase
        // myDataRef.set('User ' + name + ' says ' + text);
        // or myDataRef.set({name: name, text: text});
        // need to get the time the reminder should be sent
        
    });
    $('input').focus(function() {
        $(this).css("outline-color","#6699FF");
    });
});