// Load the BERT model and handle form submission
document.getElementById('qnaForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const passage = document.getElementById('passage').value;
  const question = document.getElementById('question').value;

  const progressBar = document.getElementById('progressBar');
  progressBar.style.width = '0%';

  simulateProgress(progress => {
    progressBar.style.width = `${progress}%`;

    if (progress === 100) {
      runModel(question, passage);
    }
  });
});

// Simulate progress with a timer
function simulateProgress(progressCallback) {
  let progress = 0;
  const interval = setInterval(() => {
    progress += 10;
    if (progress <= 100) {
      progressCallback(progress);
    }
    if (progress === 100) {
      clearInterval(interval);
    }
  }, 500);
}

// Run the BERT model
function runModel(question, passage) {
  const outputDiv = document.getElementById('output');
  outputDiv.innerHTML = '';

  qna.load().then(model => {
    model.findAnswers(question, passage).then(answers => {
      answers.forEach(answer => {
        outputDiv.innerHTML += `<p>Answer: ${answer.text}, Confidence: ${answer.score}</p>`;
      });
    });
  });
}
