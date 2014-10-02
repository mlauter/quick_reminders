Firebase.enableLogging(true);
var myDataRef = new Firebase('https://quickreminders.firebaseio.com/');
var userRef = myDataRef.child("miriam/active")

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

function preFillDate() {
    var current = new Date();
    document.getElementById('hour').selectedIndex = current.getHours() + 2;
    document.getElementById('minute').selectedIndex = current.getMinutes() + 1;
    document.getElementById('month').selectedIndex = current.getMonth() + 1;
    document.getElementById('day').selectedIndex = current.getDate();
    document.getElementById('year').selectedIndex = current.getYear() - 100 - 14 + 1;
}

function scheduleReminder(text, time, pointer) {
    now = new Date().getTime();
    delay = time - now;
    console.log(delay);
    window.setTimeout(function() {remind(text, pointer)}, delay);
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
        reminderText = $('#reminder').val()
        var reminderEvent = {
            'text' : reminderText,
            'timestamp' : new Date($('#year').val(), months.indexOf($('#month').val()), $('#day').val(), $('#hour').val(), $('#minute').val()).getTime()
        };
        userRef.push(reminderEvent);


        // $('.list').prepend('<div class="item">'+ reminderText+ '</div>');
            
    });

    $('input').focus(function() {
        $(this).css("outline-color","#6699FF");
    });

    window.addEventListener("load", function() {
        var month = document.getElementById("month")
        month.onchange = function() {
            var monthSelected = month.selectedIndex;
            setDaysInMonth(months[monthSelected - 1]);
        }
        preFillDate();

        userRef.on('child_added', function(snapshot) {
            pointer = snapshot.name();
            reminderText = snapshot.val().text;
            reminderTime = snapshot.val().timestamp;
            console.log(reminderText, reminderTime);
            // $('.list').prepend('<div class="item">'+ reminderText+ '</div>');
            scheduleReminder(reminderText, reminderTime, pointer);
        });
    });
});

