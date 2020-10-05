import React, { useRef, useState } from "react";

const LinkCreate = () => {
  // Create State
  const [error, setError] = useState("")

  // Create reference 
  const inputEl = useRef("");
  const handleSubmit = event => {
    event.preventDefault()
    // Validate the URL
    Meteor.call("links.insert", inputEl.current.value, error => {
      if (error) {
        setError(`This is an invalid URL`);
        inputEl.current.value = "";
      } else {
        setError("");
      }
    })
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="">Link to shorten</label>
        <input ref={inputEl} type="text" className="form-control" />
      </div>
      <div className="text-danger">{error}</div>
      <button className="btn btn-primary">Shorten!</button>
    </form>
  )
}

export default LinkCreate