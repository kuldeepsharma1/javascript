
// this is just a start of project ml will included in future works

function generateRandomQuote() {
    const quotesCsvFile = 'quotes.csv';
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const quotesArray = xhr.responseText.split('\n');
        const randomIndex = Math.floor(Math.random() * quotesArray.length);
        const randomQuote = quotesArray[randomIndex].split(';');
        const quote = randomQuote[0];
        const name = randomQuote[1];
        const quoteElement = document.getElementById('quote');

        typeEffect(quoteElement, quote + ' - ' + name);
      }
    };

    xhr.open('GET', quotesCsvFile, true);
    xhr.send();
  }

  function typeEffect(element, text) {
    let i = 0;
    const speed = 50; // Adjust typing speed (in milliseconds)

    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      } else {
        i = 0; // Reset index for the next quote
      }
    }

    element.textContent = '';
    type();
  }