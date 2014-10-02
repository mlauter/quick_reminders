// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });

//example of using a message handler from the inject scripts
Firebase.enableLogging(true);
var myDataRef = new Firebase('https://quickreminders.firebaseio.com/');
var userRef = myDataRef.child("miriam/active")

scheduleReminder = function(text, time, pointer) {
    now = new Date().getTime();
    delay = time - now;
    console.log(delay);
    chrome.alarms.create(text, {when: time})
}

function remind(text, pointer) {
    var options = {
        'type' : 'basic',
        'iconUrl' : 'icon128.png',
        'title': 'Reminder!',
        'message': text 
    };
    chrome.notifications.create("", options, function() {remove(pointer)});
}

function remove(pointer) {
    finished = userRef.child(pointer);
    finished.remove();
}

chrome.alarms.onAlarm.addListener(function(alarm) {
    alert(alarm.name);
    // remind(text, pointer);
});

chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
  	chrome.pageAction.show(sender.tab.id);
    sendResponse();
  });

