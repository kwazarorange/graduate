import React, { useState } from "react";
import { connect } from "react-redux";
import options from "../Linter/options";
import CheckBox from "./CheckBox";
import InputList from "../../InputList";
import {
  addPackage,
  removePackage,
  addExternalCss,
  removeExternalCss
} from "../../../../store/workSlice";

const EditorBar = ({
  editor_language,
  optionsStore,
  packages,
  css,
  addPackage,
  removePackage,
  addExternalCss,
  removeExternalCss
}) => {
  const [showSettings, updateShowSettings] = useState(false);
  const [showPackages, updateShowPackages] = useState(false);
  const [showCssExt, updateShowCssExt] = useState(false);
  const settings = options.map(option => (
    <CheckBox option={option} value={optionsStore[option.name]} />
  ));
  return (
    <>
      <div className="editorBar">
        <p>{editor_language}</p>
        {editor_language == "js" ? (
          <>
            <button onClick={() => updateShowSettings(!showSettings)}>
              <i className="fas fa-sliders-h option"></i>
              Lint
            </button>
            <button onClick={() => updateShowPackages(!showPackages)}>
              <i className="fas fa-cog option"></i>
              Packages
            </button>
          </>
        ) : editor_language == "css" ? (
          <button onClick={() => updateShowCssExt(!showCssExt)}>
            <i className="fas fa-cog option"></i>
            CSS
          </button>
        ) : (
          ""
        )}
      </div>
      {showSettings ? <div className="settingsPanel">{settings}</div> : ""}
      {showPackages ? (
        <InputList
          existingValues={packages}
          inputInfo="Pass in unpkg urls to add packages to the project:"
          processInput={addPackage}
          removeInput={removePackage}
        />
      ) : (
        ""
      )}
      {showCssExt ? (
        <InputList
          existingValues={css}
          inputInfo="Pass in external css urls to add them to the project:"
          processInput={addExternalCss}
          removeInput={removeExternalCss}
        />
      ) : (
        ""
      )}
    </>
  );
};
const mapStateToProps = state => ({
  optionsStore: state.linter.js,
  packages: state.render.packages,
  css: state.render.externalCss
});
const mapDispatchToProps = {
  addPackage: addPackage,
  removePackage: removePackage,
  addExternalCss: addExternalCss,
  removeExternalCss: removeExternalCss
};
export default connect(mapStateToProps, mapDispatchToProps)(EditorBar);
