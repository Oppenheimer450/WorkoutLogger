
class State {

    #exercises;
    #filter;

    constructor (initExercises) {
      this.#exercises = initExercises;
    }

    // arrow function declaration --> takt this from context, do not binf their own this
    addExercise = function (exercise) {
      this.#exercises.push(exercise);
    }    

    // define their own this depending on how they are called
    setFilter (filter) {
      this.#filter = filter;
  }

    getExercises = function (filter) {
      this.#filter = filter;
      return this.#exercises.filter((exercise) => {
          if (this.#filter == 'all') {
            return true;
          } else {
            return this.#filter == exercise.name;
          }
      });
    }
}


const exerciseData = new State([
  {name: "exercise1", date: new Date(), weight: 11},
  {name: "exercise2", date: new Date(), weight: 12},
  {name: "exercise3", date: new Date(), weight: 13},
  {name: "exercise1", date: new Date(), weight: 15}
])


function logWorkout() {
  var exercise = document.getElementById("exercise").value;
  var reps = document.getElementById("reps").value;
  var sets = document.getElementById("sets").value;
  var weight = document.getElementById("weight").value;

  // new row
  var tableBody = document.getElementById("workoutTableBody");
  var newRow = tableBody.insertRow();

  // new cell for name
  var exerciseCell = newRow.insertCell();
  exerciseCell.textContent = exercise;

  // new cell for row
  var repsCell = newRow.insertCell();
  repsCell.textContent = reps;

  // new cell for set
  var setsCell = newRow.insertCell();
  setsCell.textContent = sets;

  // new cell for weight
  var weightCell = newRow.insertCell();
  weightCell.textContent = weight;

  let newExercise = {
      name: exercise,
      date: new Date(),
      weight: parseFloat(weight)
  }

  exerciseData.addExercise(newExercise);

  updateChart();
}

function createWorkout() {
  var workoutName = document.getElementById("workoutName").value;
  var exerciseName = document.getElementById("exerciseName").value;
  var exerciseSets = document.getElementById("exerciseSets").value;
  var exerciseReps = document.getElementById("exerciseReps").value;
  var exercisePR = document.getElementById("exercisePR").value;

  var tableBody = document.getElementById("workoutTableBody");
  var newRow = tableBody.insertRow();

  var workoutNameCell = newRow.insertCell();
  workoutNameCell.textContent = workoutName;

  var exerciseNameCell = newRow.insertCell();
  exerciseNameCell.textContent = exerciseName;

  var setsCell = newRow.insertCell();
  setsCell.textContent = exerciseSets;

  var repsCell = newRow.insertCell();
  repsCell.textContent = exerciseReps;

  var prCell = newRow.insertCell();
  prCell.textContent = exercisePR;
}

// swithc current window
function toggleWindow(currentWindow, nextWindow) {
  var current = document.getElementById(currentWindow);
  var next = document.getElementById(nextWindow);

  current.classList.remove("active-window");
  next.classList.add("active-window");
}

function updateChart() {

  // get window for charts
  const window = document.getElementById("statsWindow");
  
  // get chosen exercise
  const selectedExercise = document.getElementById("exerciseStats").value;
  const data = exerciseData.getExercises(selectedExercise);

  // remove old one if there is
  let oldChartContainer = document.getElementById("chartContainer");
  oldChartContainer.remove();

  // create new canvas
  let chartContainer = document.createElement("canvas");
  chartContainer.id = "chartContainer";
  chartContainer.style.width = "1vw"
  chartContainer.style.height = "1.2vh"
  window.appendChild(chartContainer);

  // no exercise selected
  if (data.length === 0) {
    chartContainer.style.display = "none";
    return;
  }

  chartContainer.style.display = "block";

  // create data for chart
  let labels = data.map((item) => item.date.toLocaleTimeString());
  let weights = data.map((item) => item.weight);

  // get 2d drawing context for canvas
  let ctx = chartContainer.getContext("2d");
  
  // create chart
  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Weight (kg)",
          data: weights,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}