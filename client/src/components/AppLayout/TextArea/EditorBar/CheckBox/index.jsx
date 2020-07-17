import React from "react";
import { connect } from "react-redux";
import { changeOption } from "../../../../../store/linterSlice";

const CheckBox = ({ changeOption, option, value }) => {
  function onChange() {
    changeOption({ name: option.name, collection: "js" });
  }
  return (
    <div>
      <label
        className="checkboxLabel"
        htmlFor={option.name}
        title={option.tooltip}
      >
        {option.name}:
      </label>
      <input
        type="checkbox"
        id={option.name}
        value={option.default}
        checked={value}
        onChange={onChange}
      />
      <br />
    </div>
  );
};

const mapDispatchToProps = {
  changeOption: changeOption,
};
export default connect(null, mapDispatchToProps)(CheckBox);
