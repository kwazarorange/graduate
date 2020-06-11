import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

const Input = ({ id, defaultValue, processInput, removeInput }) => {
  const [value, setValue] = useState(defaultValue);
  function enterPressed(e) {
    if (e.keyCode == 13) {
      processInput(value);
    }
  }
  return (
    <div className="input">
      <input
        type="url"
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={enterPressed}
      />
      <button onClick={ () => removeInput(id, value)}><i class="fas fa-window-close closeOption"></i></button>
    </div>
  );
};

const InputList = ({ existingValues, inputInfo, processInput, removeInput }) => {
  const [inputs, setInputs] = useState([{key: uuidv4(), value: ""}, ...existingValues.map(value => {return {key: uuidv4(), value}})]);
  function addInput(value) {
    processInput(value);
    setInputs([{key: uuidv4()}, ...inputs]);
  }
  function deleteInput(key, value) {
    setInputs(inputs.filter(input => input.key != key));
    if(inputs.length == 0) {
      setInputs([{key: uuidv4()}]);
    }
    removeInput(value);
  }
  return (
    <div className="inputList">
      <p className="inputListInfo">
        {inputInfo}
      </p>
      {inputs.map(input => <Input key={input.key} id={input.key} defaultValue={input.value} removeInput={deleteInput} processInput={addInput} />)}
    </div>
  );
};
export default InputList;
