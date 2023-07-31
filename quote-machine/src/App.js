import React, { useEffect, useState } from 'react';
import './App.scss';
import COLORS_ARRAY from './colorsArray';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

let quoteDataBase = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";



function App() {

  const [quote, setQuote] = useState("Happiness is not something readymade. It comes from your own actions.")
  const [author, setAuthor] = useState("Dalai Lama")
  const [quotesArray, setQuotesArray] = useState(null)
  const [bgColor, setBgColor] = useState("#282c34")

  const fetchQuotes = async (url) => {
    const response = await fetch(url);
    const parse = await response.json();
    setQuotesArray(parse.quotes);
  }

  useEffect(() => {
    fetchQuotes(quoteDataBase);
  }, [quoteDataBase])


  const changeQuote = () => {
    let rand = Math.floor(quotesArray.length * Math.random())
    setBgColor(COLORS_ARRAY[rand])
    setQuote(quotesArray[rand].quote)
    setAuthor(quotesArray[rand].author)
  }


  return (
    <div className="App">
      <header className="App-header" style={{ backgroundColor: bgColor, color: bgColor }}>
        <div className="quote-box" id="quote-box" style={{ color: bgColor }}>
          <p id="text">
            "{quote}"
          </p>
          <p id="author">
            - {author}
          </p>
          <div className="button">
            <a id="tweet-quote" href={encodeURI(`http://www.twitter.com/intent/tweet?text=${quote} -${author}`)} style={{ backgroundColor: bgColor }}>
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <button id="new-quote" onClick={() => changeQuote()} style={{ backgroundColor: bgColor }}>
              Change Quote
            </button>
          </div>

        </div>
      </header >
    </div >
  );
}

export default App;
