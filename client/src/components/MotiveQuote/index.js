import React, { useState, useEffect } from "react";
import axios from "axios";
import "./motQuote.css";

const MotiveQuote = () => {
  const [quotes, setQuotes] = useState();

  useEffect(() => {
    // Axios API call to motivational quotes
    console.log("useEffect is running: ");
    axios
      .request({
        method: "GET",
        url:
          "https://quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com/quote",
        params: { token: "ipworld.info" },
        headers: {
          "x-rapidapi-key":
            "70e7f1efaemsh30c3ed3cb147977p1acc2fjsn202c4b6efbdb",
          "x-rapidapi-host":
            "quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com",
        },
      })
      .then((res) => {
        console.log(res.data);

        setQuotes(res.data);
      })
      .catch((error) => console.log("error"));
  }, []);

  return (
    <>
      {quotes ? (
        <div>
          <h2 className="inQuote2">{quotes.text} "</h2>
          <h4 className="author">{quotes.author}</h4>
        </div>
      ) : (
        <></>
      )}

      <hr />
    </>
  );
};

export default MotiveQuote;
