import React from "react";
import {Button } from "reactstrap";

const Search = ({ submitSearch, subjects, search, handleInputChange }) => {
  return (
    <form className="search">
      <div className="form-group">
        <label htmlFor="search"></label>
        <input
          className="form-control"
          type="text"
          value={search}
          name="search"
          list="searches"
          id="search"
          placeholder="Search Subject"
          onChange={handleInputChange}
        />
        <datalist id="searches">
          {subjects.map((subject) => (
            <option value={subject.subject} key={subject._id}>
              {subject.subject}
            </option>
          ))}
        </datalist>
      <Button id="Submit_Button" onClick={submitSearch}> Submit</Button>
      </div>
    </form>
  );
};

export default Search;
