import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

import { useState, useEffect } from "react";

import "./App.css";

function App() {
  var colors = [
    "#16a085",
    "#27ae60",
    "#2c3e50",
    "#f39c12",
    "#e74c3c",
    "#9b59b6",
    "#FB6964",
    "#342224",
    "#472E32",
    "#BDBB99",
    "#77B1A9",
    "#73A857",
  ];
  const [quoteData, setQuoteData] = useState(null);
  const [currData, setCurrData] = useState(null);
  const [color, setColor] = useState(null);
  const [twitterUrl, setTwitterUrl] = useState("");

  useEffect(() => {
    let randForColor = Math.floor(Math.random() * 12);
    setColor({
      backgroundColor: colors[randForColor],
      color: colors[randForColor],
    });
    const fetchData = async () => {
      fetch("https://type.fit/api/quotes")
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          let randNum = Math.floor(Math.random() * 16);
          setQuoteData(data);
          setTwitterUrl(
            "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
              encodeURIComponent(
                '"' + data[randNum].text + '" ' + data[randNum].author
              )
          );
          setCurrData(data[randNum]);
        });
    };
    fetchData();
  }, []);

  const handleClick = () => {
    const randomNumber = Math.floor(Math.random() * 16);
    const randomNumberForColors = Math.floor(Math.random() * 12);
    setColor({
      backgroundColor: colors[randomNumberForColors],
      color: colors[randomNumberForColors],
    });
    setTwitterUrl(
      "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
        encodeURIComponent(
          '"' +
            quoteData[randomNumber].text +
            '" ' +
            quoteData[randomNumber].author
        )
    );
    setCurrData(quoteData[randomNumber]);
  };

  if (!quoteData || !currData)
    return (
      <div
        id="container"
        style={{
          color: "white",
          fontSize: "3rem",
          backgroundColor: "rgb(251, 105, 100)",
          height: "100vh",
          ...color,
        }}>
        <h1>Loading...</h1>
      </div>
    );

  return (
    <div
      id="container"
      style={{
        backgroundColor: "rgb(251, 105, 100)",
        height: "100vh",
        ...color,
      }}>
      <div className="quote-wrapper">
        <div id="quote">
          <p style={{ ...color, backgroundColor: "white" }}>
            <FontAwesomeIcon icon={faQuoteLeft} id="left-quote-icon" />
            {currData.text}
          </p>
        </div>
        <div id="author">
          <p style={{ ...color, backgroundColor: "white" }}>
            - {currData.author}
          </p>
        </div>
        <div id="buttons">
          <div id="links">
            <a href={twitterUrl} style={{ ...color, color: "white" }}>
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          </div>

          <button
            type="button"
            style={{ ...color, color: "white" }}
            onClick={() => handleClick()}>
            New quote
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
