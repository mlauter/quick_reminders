Firebase.enableLogging(true);
var myDataRef = new Firebase('https://quickreminders.firebaseio.com/');
var userRef = myDataRef.child("miriam/active")
// var userRef = myDataRef.child("matt/active");

// var reminders = {}

// // Check for active reminders
// var checkReminders = function() {
//     // use the current time to filter
//     // reminders that have already expired 
//     // (or will expire within 1 minute)
//     // (new Date()).getTime()
//     console.log(reminders)
//     // for key, val of reminders {
//     //     // ...if key < current time ...
//     // }
// }

// // Check for newly-active reminders every minute
// setInterval checkReminders, 60000

// var notifyUser = function(reminder) {
//     // notify user of this reminder
//     cleanUpReminder(reminder);
// }

// var cleanUpReminder = function(reminder) {
//     // change the priority or move reminder
//     // to other location in Firebase to indicate
//     // that it has been discharged
//     // perhaps move to userid/complete
// }

// userRef.on("value", function(snapshot){
//     // reminders = snapshot.val()
//     // get keys of reminders where key is before now
//     // get keys (timestamps) that have already expired

// });

var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

$(document).ready(function() {
    var hour = document.getElementById("hour");
    for (var i = 0; i < 24; i++) {
        var opt = document.createElement("option");
        if (i < 10) {
            opt.text = "0" + i;
        } else {
            opt.text = i;
        }
        opt.value = i;    
        hour.appendChild(opt);
    }

    var min = document.getElementById("minute");
    for (var i = 0; i < 60; i++) {
        var opt = document.createElement("option");
        if (i < 10) {
            opt.text = "0" + i;
        } else {
            opt.text = i;
        }
        opt.value = i;    
        min.appendChild(opt);
    }

    var month = document.getElementById("month");
    for (var i = 0; i < months.length; i++) {
        var opt = document.createElement("option");
        opt.text = months[i];
        opt.value = months[i];    
        month.appendChild(opt);
    }

    var day = document.getElementById("day");
    for (var i = 1; i < 32; i++) {
        var opt = document.createElement("option");
        if (i < 10) {
            opt.text = "0" + i;
        } else {
            opt.text = i;
        }
        opt.value = i;    
        day.appendChild(opt);
    }

    var year = document.getElementById("year");
    for (var i = 2014; i < 2051; i++) {
        var opt = document.createElement("option");
        opt.text = i;
        opt.value = i;    
        year.appendChild(opt);
    }
    

    
    $('#button').click(function() {
        var reminderText = $('#reminder').val();
        console.log(reminderText);
        userRef.push(reminderText)


        $('.list').prepend('<div class="item">'+ reminderText+ '</div>');
    
        // firebase
        // myDataRef.set('User ' + name + ' says ' + text);
        // or myDataRef.set({name: name, text: text});
        // need to get the time the reminder should be sent
        
    });

    $('input').focus(function() {
        $(this).css("outline-color","#6699FF");
    });

    window.addEventListener("load", function() {
        var month = document.getElementById("month")
        month.onchange = function() {
            var monthSelected = month.selectedIndex;
            console.log(monthSelected);
        }
        // if (month.options[month.selectedIndex].text === "Feb") {
        //     console.log('February!');
        //     for (i = 31; i > 28; i--) {
        //         day.removeChild();
        //     }
        // }
    });
});

