var today = moment().format("dddd, MMMM Do");
var currentDayEl = document.querySelector("#currentDay");
var jumbotronEl = document.querySelector(".jumbotron");
var saveBtnEl = document.querySelectorAll(".save-btn");

//add a jumbotron that displays current day and date using moment (i.e. Wednesday Mar 31st)
console.log(today);
currentDayEl.textContent = today;
jumbotronEl.append(currentDayEl);



//get the old data
var data = JSON.parse(localStorage.getItem("userInput")) || [];
for (let i = 0; i < data.length; i++) {
    var queryString = "#hour"+data[i].timeBlock;
    document.querySelector(queryString).children[1].value = data[i].text;
};

//setup a click event on the save buttons
    // using the event.target, traverse the dom from the button to the textarea
    // grab a unique identifier for placing the hour input value into localStorage
for (let index = 0; index < saveBtnEl.length; index++) {
    saveBtnEl[index].addEventListener("click", function(event) {
        event.preventDefault();
        var userInput = event.target.previousElementSibling.value;
        var timeBlockId = event.target.parentElement.id.replace("hour","").trim();

        //get the old data
        var data = JSON.parse(localStorage.getItem("userInput")) || [];

        //create new data entry
        var dataEntry  = {
            timeBlock: timeBlockId,
            text: userInput
        }

        //do a for loop over history to check for dups - delete it - sort map filter reduce
        var updateddata = data.filter(datum => datum.timeBlock !== timeBlockId);
        
        updateddata.push(dataEntry);
    
        localStorage.setItem("userInput", JSON.stringify(updateddata));
    });
};


// for determining css backgroundcolor:
    // iterate over all hour elements
    var arrayHour = document.querySelectorAll(".hour");
    // use moment to get the current time (specifically the hour)
    var currentHour = parseInt(moment().hour());
    for (let i = 0; i < arrayHour.length; i++) {
        var timeBlockId = parseInt(arrayHour[i].id.replace("hour","").trim());  
        // using an id/data attribute, determining what hour the current timeblock respresents (i.e the 'moment time')
            // if the current element time is: 
                // less than moment time, its grey
                // same as moment time, its red
                // greater than moment time, its green
        if (timeBlockId < currentHour) {
            //past add class
            arrayHour[i].addClass("past");
        } else if (timeBlockId == currentHour) {
            arrayHour[i].addClass("present");
        } else if (timeBlockId > currentHour) {
            arrayHour[i].addClass("future");
        }
    };

    // on pageload, pull all data from local storage and use the unique labels/identifiers mentioned above to determine where to put the value retrieved from localStorage
// function renderUserText() {
//     // use JSON.parse to convert text to JavaScript notation
//     var userText = JSON.parse(localStorage.getItem("userInput"));
//     console.log(userText);
//     // check if data is returned, if not exit out of the function
//     if (userText !== null) {
//         document.getElementById("planner-text").innerHTML = userText;
//     } else {
//         console.log("not successful");
//     }
// }
// renderUserText();