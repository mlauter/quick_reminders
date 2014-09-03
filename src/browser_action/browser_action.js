Firebase.enableLogging(true);
var myDataRef = new Firebase('https://quickreminders.firebaseio.com/');
var userRef = myDataRef.child("matt/active");

var reminders = {}

// Check for active reminders
var checkReminders = function() {
    // use the current time to filter
    // reminders that have already expired 
    // (or will expire within 1 minute)
    // (new Date()).getTime()
    console.log(reminders)
    for key, val of reminders {
        // ...if key < current time ...
    }
}

// Check for newly-active reminders every minute
setInterval checkReminders, 60000

var notifyUser = function(reminder) {
    // notify user of this reminder
    cleanUpReminder(reminder);
}

var cleanUpReminder = function(reminder) {
    // change the priority or move reminder
    // to other location in Firebase to indicate
    // that it has been discharged
    // perhaps move to userid/complete
}

userRef.on("value", function(snapshot){
    reminders = snapshot.val()
    get keys of reminders where key is before now
    // get keys (timestamps) that have already expired

});

$(document).ready(function() {



    
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