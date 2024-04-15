document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const randomBtn = document.getElementById('randomBtn');
    const activityType = document.getElementById('activityType');
    const participants = document.getElementById('participants');
    const accessibility = document.getElementById('accessibility');
    const price = document.getElementById('price');
    const activityDetails = document.getElementById('activityDetails');
    const randomDetails = document.getElementById('randomActivityDetails');
  
    // Function to fetch a random activity from the API
    function fetchRandomActivity() {
      fetch('http://www.boredapi.com/api/activity/')
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            randomDetails.textContent = 'Error: ' + data.error;
          } else {
            const activityList = formatActivity(data);
            randomDetails.innerHTML = '';
            randomDetails.appendChild(activityList);
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
    return activityList;
  }


    // Event listener for the "Random Activity" button
    randomBtn.addEventListener('click', fetchRandomActivity);


    // Event listener for the "Generate Activity" button
    generateBtn.addEventListener('click', () => {
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
  

  });
  













