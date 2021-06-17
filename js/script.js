// Written By:- Shubham Singh (Spirit)

const scheduleSection = document.querySelector(".schedule");
const contactFormSubmitBtn = document.getElementById("contact-button");
const contactForm = document.getElementById( "contactus-form" );

const setProductToTable = function() {
    // scheduleSection.innerHTML = ``;
   
    // Fetch from API: https://mocki.io/v1/74dae48c-a2b6-44b5-a689-0ff89599ed8d
    fetch("https://mocki.io/v1/74dae48c-a2b6-44b5-a689-0ff89599ed8d", {
    "method": "GET"
    })
    .then((response) => response.json())
    .then((response) => {
        // Create a new html table element: <table>
        const createTableElement = document.createElement(`table`);
        createTableElement.innerHTML = `
        <tr>
            <th colspan="2">Time</th>
            <th rowspan="2">Task</th>
        </tr>
        <tr>
            <th>Start</th>
            <th>Duration</th>
        </tr>
      `
    // Total step count
      let totalCount = response.task.length;
      // For Debug: console.log(response.task)

      for (var x = 0; x < totalCount; x++) {
          const createItem = document.createElement(`tr`);
          createItem.innerHTML = `
            <td>${response.task[x].start}</td>
            <td>(${response.task[x].duration})</td>
            <td>${response.task[x].name}</td>
        `
        // Checking: console.log(response.task[x].start)

        createTableElement.append(createItem);
      }
      
      scheduleSection.append(createTableElement);
      const createItemP = document.createElement(`p`);
      createItemP.innerHTML = `sample baking schedule`;
      scheduleSection.append(createItemP);
    })
    .catch(err => {
        console.error(err);
      });
}

setProductToTable();

// Post form

// const contactFormSubmitBtn = document.querySelector('button');

window.addEventListener( "load", function () {
    function sendData() {
      const req = new XMLHttpRequest();
  
      const contactFormData = new FormData(contactForm);
      const formData = JSON.stringify(Object.fromEntries(contactFormData));
  
      // When load --> successfully
      req.addEventListener( "load", function(event) {
        alert(`Your data is submited ${formData}`);
      });
  
      // When load --> Unsuccessfully
      req.addEventListener( "error", function( event ) {
        alert( 'Oops! Something went wrong.' );
      });
  
      // Set up our request
      req.open( "POST", "https://jsonplaceholder.typicode.com/posts" );
  
      // The data sent is what the user provided in the form
      req.send(contactFormData);
    }

    // form event when click on submit
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();  
      sendData();
    } );
  } );