// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {

    // Save button click event listener
    $(".saveBtn").on('click', function() {
      var eventDescription = $(this).siblings(".description").val();
      var timeBlockId = $(this).parent().attr("id");
      // var blockHour = parseInt(timeBlockId.substring(5));

      // Save the time and event description to local storage
      localStorage.setItem(timeBlockId, eventDescription)
    })

    // Function to add appropriate past, present, and future class to time blocks
    function updateTimeBlocks() {
      // Get current time
      var currentHour = dayjs().format('H'); 

      $('.time-block').each(function () {
        var timeBlockId = $(this).attr("id");
        var blockHour = parseInt(timeBlockId.substring(5)); // select the number value for comparison with the current time

        // Remove any existing class
        $(this).removeClass('past present future');

        // Add appropriate class based on current time
        if (blockHour < currentHour) {
          $(this).addClass("past");
        } else if (blockHour === currentHour) {
          $(this).addClass('present');
        } else {
          $(this).addClass('future');
        }

        // Display any saved event description
        var storedEvent = localStorage.getItem(timeBlockId);
        if (storedEvent) {
          $(this).find('.description').val(storedEvent)
        }

        });
      }
      
      // Update time block for past, future and present
      updateTimeBlocks();

      // Display current date in the header
      var currentDate = dayjs().format('dddd, MMM D, YYYY');
      $('#currentDay').text(currentDate);

      // Update page every hour 
      setInterval(updateTimeBlocks, 3600000);
});

