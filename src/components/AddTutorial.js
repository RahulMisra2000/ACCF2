import React, { useState } from "react";
import TutorialDataService from "../services/TutorialService";

const AddTutorial = () => {
  const initialTutorialState = {
    title: "",
    description: "",
    published: false,
  };
  const [tutorial, setTutorial] = useState(initialTutorialState);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTutorial({ ...tutorial, [name]: value });
  };

  const saveTutorial = () => {
    var data = {
      title: tutorial.title,
      description: tutorial.description,
      published: false,
    };

    const makeEntryInGoogleSheet = (data) => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify(data);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      // 1. cors anywhere that I downloaded --- https://github.com/Rob--W/cors-anywhere
      // 2. Installed Heroku CLI and then deploy cors-anywhere --- https://dashboard.heroku.com/apps/rahulmisra2000cb/deploy/heroku-git
      // 3. After deployment got this url https://rahulmisra2000cb.herokuapp.com/
      // which needs to be prepended to the Google App Script, as shown below
      return fetch(
        "https://rahulmisra2000cb.herokuapp.com/https://script.google.com/macros/s/AKfycbwsjssEY648DtLZiqxuwq9L_hxyF6qEtWa12FGdlna2cnJzO5HM-q4uLr3Fy1RcoTIe/exec",
        requestOptions
      ).catch((e) => {
        throw new Error("Error writing to Google App Script");
      });
    };

    TutorialDataService.create(data)
      .then(() => {
        setSubmitted(true);
        return makeEntryInGoogleSheet(data);
      })
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((e) => {
        console.log(e);
        setError(e);
      });
  };

  const newTutorial = () => {
    setTutorial(initialTutorialState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      <div>{error && `Error: ${error}`}</div>
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newTutorial}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={tutorial.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={tutorial.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <button onClick={saveTutorial} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTutorial;
