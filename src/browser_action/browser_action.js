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

var daysPerMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function setDaysInMonth(month) {
    i = months.indexOf(month);
    days = daysPerMonth[i];
    var day = document.getElementById("day");
    selectedDay = day.selectedIndex;
    $('#day option').remove();
    var header = document.createElement("option");
    header.text = "dd";
    day.appendChild(header);
    for (var i = 1; i < days + 1; i++) {
        var opt = document.createElement("option");
        if (i < 10) {
            opt.text = "0" + i;
        } else {
            opt.text = i;
        }
        opt.value = i;    
        day.appendChild(opt);
    }
    day.selectedIndex = Math.min(selectedDay, days);
}

function scheduleReminder(text, time) {
    now = new Date()
}

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

    setDaysInMonth("Jan");

    var year = document.getElementById("year");
    for (var i = 2014; i < 2051; i++) {
        var opt = document.createElement("option");
        opt.text = i;
        opt.value = i;    
        year.appendChild(opt);
    }
    

    
    $('#button').click(function() {
        console.log(new Date($('#year').val(), months.indexOf($('#month').val()), $('#day').val(), $('#hour').val(), $('#minute').val()).getTime());
        reminderText = $('#reminder').val()
        var reminderEvent = {
            'text' : reminderText,
            'timestamp' : new Date($('#year').val(), months.indexOf($('#month').val()), $('#day').val(), $('#hour').val(), $('#minute').val()).getTime()
        };
        userRef.push(reminderEvent);


        $('.list').prepend('<div class="item">'+ reminderText+ '</div>');
            
    });

    $('input').focus(function() {
        $(this).css("outline-color","#6699FF");
    });

    window.addEventListener("load", function() {
        var month = document.getElementById("month")
        month.onchange = function() {
            var monthSelected = month.selectedIndex;
            setDaysInMonth(months[monthSelected - 1]);
            console.log(months[monthSelected - 1]);
        }

        userRef.on('child_added', function(snapshot) {
            reminderText = snapshot.val().text;
            reminderTime = snapshot.val().timestamp;
            console.log(reminderText, reminderTime);
            scheduleReminder(reminderText, reminderTime);
        });
    });
});

