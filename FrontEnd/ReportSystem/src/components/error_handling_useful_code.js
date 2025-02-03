import React, { useState } from "react";

const Form = () => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleBlur = () => {
    if (inputValue.trim() === "") {
      setError("This is a required field");
      setTimeout(() => {
        setError("");  // Clear the error after 2 seconds
      }, 2000);  // 2000 milliseconds = 2 seconds
    }
  };

  return (
    <form>
      <label>
        Name:
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          onBlur={handleBlur}  // Trigger validation when input loses focus
        />
      </label>
      {error && <div style={{ color: "red" }}>{error}</div>} {/* Show error message */}
    </form>
  );
};

export default Form;