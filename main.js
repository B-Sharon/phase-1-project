//wait for the DOM to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', () => {

//get refernces to all the html elements
    const generateBtn = document.getElementById('generateBtn');
    const randomBtn = document.getElementById('randomBtn');
    const activityType = document.getElementById('activityType');
    const participants = document.getElementById('participants');
    const accessibility = document.getElementById('accessibility');
    const price = document.getElementById('price');
    const activityDetails = document.getElementById('activityDetails');
    const randomDetails = document.getElementById('randomActivityDetails');
    const loadingIndicator = document.getElementById('loadingIndicator');

    function fetchRandomActivity() {
        showLoadingIndicator();
        // Fetch random activity
        // On success: hide loading indicator and display activity
        // On error: hide loading indicator and display error message
    }

    function showLoadingIndicator() {
        loadingIndicator.style.display = 'block';
    }

    function hideLoadingIndicator() {
        loadingIndicator.style.display = 'none';
    }

  
    // Function to fetch a random activity from the API
    function fetchRandomActivity() {
      fetch('http://www.boredapi.com/api/activity/')
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            randomDetails.textContent = 'Error: ' + data.error;
          } else {
            const activityList = formatActivity(data); //Format the retrieved activity data
            randomDetails.innerHTML = ''; // Clear any previous content displayed for random activity
            randomDetails.appendChild(activityList); // Display the formatted random activity details
          }
        })
        .catch(error => {
          randomDetails.textContent = 'Error fetching data: ' + error.message;
        });
    }
    
    // Function to format activity details into an unordered list
function formatActivity(data) {
    const activityList = document.createElement('ul');
    for (const key in data) {
      if (data.hasOwnProperty(key) && key !== 'key') {
        const listItem = document.createElement('li');
        listItem.textContent = `${key}: ${data[key]}`;
        activityList.appendChild(listItem);
      }
    }
    return activityList; //return the populated unordered list containing the formatted activity details
  }


    // Event listener for the "Random Activity" button
    randomBtn.addEventListener('click', (event) =>{
        event.preventDefault();
        fetchRandomActivity();
    });


    // Event listener for the "Generate Activity" button
    generateBtn.addEventListener('click', (event) => {
      event.preventDefault();

      //get the selected values from the dropdown menus and input field
      const typeValue = activityType.value;
      const participantsValue = participants.value;
      const accessibilityValue = accessibility.value;
      const priceValue = price.value;
  
      let apiUrl = 'http://www.boredapi.com/api/activity';
        
         // Check if the base URL already contains a query string
         if (apiUrl.includes('?')) {
            apiUrl += '&';
        } else {
            apiUrl += '?';
        }
        // Add the query parameters to the URL
        if (typeValue) {
            apiUrl += `type=${typeValue}&`;
        }
        if (participantsValue) {
            apiUrl += `participants=${participantsValue}&`;
        }
        if (accessibilityValue) {
            apiUrl += `accessibility=${accessibilityValue}&`;
        }
        if (priceValue) {
            apiUrl += `price=${priceValue}&`;
        }

        // Remove trailing '&' if present
        apiUrl = apiUrl.replace(/&$/, '');
  
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            activityDetails.textContent = 'Error: ' + data.error;
          } else {
            const activity = data.activity;
            activityDetails.textContent = activity;
          }
        })
        .catch(error => {
          activityDetails.textContent = 'Error fetching data: ' + error.message;
        });
    });
   // Mousemove event listener for the document
   document.addEventListener('mousemove', (event) => {
    // Log mouse coordinates
    console.log('Mouse coordinates:', event.clientX, event.clientY);
});

  });
  













