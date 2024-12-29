function submitForm() {
  const radios = document.querySelectorAll('input[type="radio"]');
  let totalScore = 0;
  let group1Score = 0; // For questions 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15

  const group1Questions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  const numQuestions = radios.length / 5;

  for (let i = 0; i < numQuestions; i++) {
    let questionScore = 0;
    const radioName = `question${i + 1}`;
    const selectedRadio = document.querySelector(`input[name="${radioName}"]:checked`);
    if (selectedRadio) {
      questionScore = parseInt(selectedRadio.value);
      totalScore += questionScore;
      if (group1Questions.includes(i + 1)) {
        group1Score += questionScore;
      }
    }
  }

  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = `Your total score is: ${totalScore} <br>`;

  let comment = "";
  if (totalScore <= 18) {
    comment = "No sign of burnout here.";
  } else if (totalScore <= 32) {
    comment = "Little sign of burnout here, unless some factors are particularly severe.";
  } else if (totalScore <= 49) {
    comment = "Be careful – you may be at risk of burnout, particularly if several scores are high.";
  } else if (totalScore <= 59) {
    comment = "You are at severe risk of burnout – do something about this urgently.";
  } else if (totalScore <= 75) {
    comment = "You are at very severe risk of burnout – do something about this urgently";
  } else {
    comment = "Invalid Score"; // Handle unexpected scores
  }

  resultsDiv.innerHTML += `<strong>${comment}</strong> <br><br>`;


  const barChartHTML = generateBarChart(totalScore);
  resultsDiv.innerHTML += barChartHTML;

  resultsDiv.innerHTML += "<button onclick='window.print()'>Print</button>";
}

function generateBarChart(score) {
  let barColor;
  let barHeight;

  if (score <= 18) {
    barColor = "green";
    barHeight = "100px";
  } else if (score <= 32) {
    barColor = "yellow";
    barHeight = "80px";
  } else if (score <= 49) {
    barColor = "orange";
    barHeight = "60px";
  } else if (score <= 59) {
    barColor = "red";
    barHeight = "40px";
  } else if (score <= 75) {
    barColor = "darkred";
    barHeight = "20px";
  } else {
    barColor = "grey";
    barHeight = "0px";
  }

  return `<div style='width: 200px; height: ${barHeight}; background-color: ${barColor};'> </div>`;
}