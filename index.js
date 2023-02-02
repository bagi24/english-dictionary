const inputEl = document.getElementById('input');
const infoTextEl = document.getElementById('info-text');
const wordTitle = document.getElementById('title');
const meaning = document.getElementById('meaning');

const audioEl = document.getElementById('audio');

const meaningConteinerEl = document.getElementById('meaning-conteiner');

async function fetchAPI(word) {
  try {
    infoTextEl.style.display = 'block';

    infoTextEl.innerText = ` Searching the meaning of "${word}"`;

    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    const result = await fetch(url).then(res => res.json());
    // console.log(result);
    if (result.title) {
      meaningConteinerEl.style.display = 'block';
      infoTextEl.style.display = 'none';
      wordTitle.innerText = word;
      meaning.innerText = 'N/A';

      audioEl.style.display = 'none';
    } else {
      infoTextEl.style.display = 'none';
      meaningConteinerEl.style.display = 'block';
      audioEl.style.display = 'inline-flex';

      wordTitle.innerText = result[0].word;
      meaning.innerText = result[0].meanings[0].definitions[0].definition;

      audioEl.src = result[0].phonetics[0].audio;
    }
  } catch (error) {
    // console.log(error);
    infoTextEl.innerText = ` an error  happened, try again later :  ${error.message} `;
  }
}

inputEl.addEventListener('keyup', e => {
  if (e.target.value && e.key === 'Enter') {
    fetchAPI(e.target.value);
  }
});
