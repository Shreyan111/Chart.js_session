const pollData = [
    {
      option: "Pav Bhaaji",
      votes: 0,
      color: "rgb(255, 99, 132)"
    },
    {
      option: "Momos",
      votes: 0,
      color: "rgb(54, 162, 235)"
    },
    {
      option: "Burger",
      votes: 0,
      color: "rgb(36, 36, 36)"
    },
    {
      option: "Pizza",
      votes: 0,
      color: "rgb(255, 159, 64)"
    },
    {
      option: "Chowmein",
      votes: 0,
      color: "rgb(75, 192, 192)"
    },
    {
      option: "Kebabs",
      votes: 0,
      color: "rgb(255, 206, 86)"
    },
    {
      option: "Rasgulla",
      votes: 0,
      color: "rgb(153, 102, 255)"
    }
  ];
  
  const pollForm = document.querySelector("#pollForm");
  // The querySelector() method returns the first element that matches a specified CSS selector(s) in the document.
  
  pollForm.addEventListener("submit", pollFormSubmit);
  // The addEventListener() method attaches an event handler to the specified element.

  
  function pollFormSubmit(event) {
    // The preventDefault() method cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur.
    event.preventDefault();
    const pollOptionInput = pollForm.querySelector("input[name='pollOptions']:checked");
    if(pollOptionInput) {
      const pollOptionValue = pollOptionInput.value;
      pollData.find(pollOption => pollOption.option === pollOptionValue).votes++;
//       The find() method returns the value of the array element that passes a test (provided by a function).

// The method executes the function once for each element present in the array:

// If it finds an array element where the function returns a true value, find() returns the value of that array element (and does not check the remaining values)
// Otherwise it returns undefined
      pollChart.data.datasets[0].data = pollData.map(pollOption => pollOption.votes);
//       The map() method creates a new array with the results of calling a function for every array element.
// The map() method calls the provided function once for each element in an array, in order.
// map() does not execute the function for empty elements.
// map() does not change the original array.
      pollChart.update();
      pollForm.reset();
    }
  }
  
  function rgbToRgba(rgb, alpha=1) {
    return `rgba(${rgb.substring(rgb.indexOf('(')+1, rgb.length-1).split(',').join()}, ${alpha})`;
  }
  
  Chart.defaults.global.defaultFontFamily = '"Comic Sans MS", cursive, sans-serif';
  
  const ctx = document.getElementById('chart').getContext('2d');
  const pollChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: pollData.map(pollOption => pollOption.option),
      datasets: [{
        label: '# of Votes',
        data: pollData.map(pollOption => pollOption.votes),
        backgroundColor: pollData.map(pollOption => rgbToRgba(pollOption.color, 0.75)),
        borderWidth: 3
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      },
      title: {
        display: true,
        text: 'Favorite Food',
        fontColor: "#333",
        fontSize: 20,
        padding: 20
      },
      legend: {
        display: false,
      }
    }
  });