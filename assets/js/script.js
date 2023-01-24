$(function () {

  let timeTableHtml = "";
  let timeBlockClass = "";
  let isCurrentHour = "";



  let currentHour = dayjs().hour() + 1;
  let currentDayhtml = dayjs().format('dddd[, ]MMMM D');
  

  //time slot variables
  plannerTimeSlot = [9, 10, 11, 12, 13, 14, 15, 16, 17];
  plannerTimeSlot24h = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"];


  let planDataRaw = {};
  let plannerData = {};
  

  //create time table
  for (let i = 0; i < plannerTimeSlot.length; i++)
  {
    
    thisCurrentHour = plannerTimeSlot[i];
    
    if (thisCurrentHour == currentHour)
    {
      timeBlockClass = "present";
      isCurrentHour = "<div class='current-hour-div'>Current Hour</div>";
    }
    else if (thisCurrentHour > currentHour)
    {
      timeBlockClass = "future";
      isCurrentHour = "";
    }
    else
    {
      timeBlockClass = "past";
      isCurrentHour = "";
    }


    timeTableHtml += '<div id="hour-' + thisCurrentHour + '" class="row time-block ' + timeBlockClass + '"><div class="col-2 col-md-1 hour text-center py-3">' + plannerTimeSlot24h[i] + isCurrentHour + '</div><textarea class="col-8 col-md-10 description" rows="3"></textarea><button class="btn saveBtn col-2 col-md-1" aria-label="save"><i class="fas fa-save" aria-hidden="true"></i></button></div>';
    
  }


  
  //display planner table
  $("#planner").html (timeTableHtml);

  //display current date
  $("#current-day").html (currentDayhtml);

  //set click event for save buttons
  $(".saveBtn").on('click', function (event) {
    savePlan ();
  });



  //load plan data
  loadPlanData ();


  //load plan data function
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


  //save plan data function
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



    setTimeout(function() { 
      $('#tips').html ("");
  }, 2000);
    
  }
});
