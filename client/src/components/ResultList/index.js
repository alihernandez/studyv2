import React from "react";

function ResultList(props) {
  return (
    <ul className="list-group">
      {props.results.map((result) => (
        <li className="list-group-item" key={result._id}>
          <h3>{result.post}</h3>
          <p>{result.userId[0].username}</p>
          <p>{result.date}</p>
          <button onClick={props.Delete}>Delete</button>
          <button onClick={props.Reply}>Reply</button>
        </li>
      ))}
    </ul>
  );
}

export default ResultList;
