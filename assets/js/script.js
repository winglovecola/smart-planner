// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
  let timeTableHtml = "";
  let currentHour = dayjs().hour() + 1;
console.log (currentHour);

  let currentDayhtml = dayjs().format('dddd[, ]MMMM D');
let timeBlockClass = "";
  plannerTimeSlot = [9, 10, 11, 12, 13, 14, 15, 16, 17];
  plannerTimeSlot24h = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"];

  let planDataRaw = {};
  let plannerData = {};
  
  $("#currentDay").html (currentDayhtml);

  for (let i = 0; i < plannerTimeSlot.length; i++)
  {
    
    thisCurrentHour = plannerTimeSlot[i];
    
    if (thisCurrentHour == currentHour)
    {
      timeBlockClass = "present";
    }
    else if (thisCurrentHour > currentHour)
    {
      timeBlockClass = "future";
    }
    else
    {
      timeBlockClass = "pass";
    }


    timeTableHtml += '<div id="hour-' + thisCurrentHour + '" class="row time-block ' + timeBlockClass + '"><div class="col-2 col-md-1 hour text-center py-3">' + plannerTimeSlot24h[i] + '</div><textarea class="col-8 col-md-10 description" rows="3"></textarea><button class="btn saveBtn col-2 col-md-1" aria-label="save"><i class="fas fa-save" aria-hidden="true"></i></button></div>';
    
  }


  
  //display planner table 
  $("#planner").html (timeTableHtml);



  //set click event for save buttons
  $(".saveBtn").on('click', function (event) {
    savePlan ();
  });

  //load plan data
  loadPlanData ();



  function loadPlanData () {

    planDataRaw = localStorage.getItem("planData");


    if (planDataRaw)
    {
      planData = JSON.parse( planDataRaw );
      for (let i = 0; i < plannerTimeSlot.length; i++)
      {
      
        let thisTimeSlotData = planData["hour-" + plannerTimeSlot[i]];
        console.log (thisTimeSlotData)


        if ( thisTimeSlotData !== undefined)
        {
          $("#hour-" + plannerTimeSlot[i]).children ("textarea").val (thisTimeSlotData);
        }
      }
    }
  }



  function savePlan () {

    plannerData = {};
    
    $('#planner .description').each(function () {
      
      console.log ($(this).parent ().attr ('id'));
      console.log ($(this).val ());
      



      let hourId = $(this).parent ().attr ('id');

      if ($(this).val () != "") //check if textarea is not empty
      {
        plannerData[hourId] = $(this).val ();
      }
      
    });
    
    //save to local storage in browser

    localStorage.setItem("planData", JSON.stringify(plannerData));
    $('#tips').html ("Plans has been saved");
    
  }
});
