import { Quill } from "react-quill";
import LintBlot from "./LintBlot";
import JSHINT from "jshint";
const JSHint = JSHINT.JSHINT;
console.log(JSHint);

class Linter {
  static register() {
    Quill.register("formats/lint", LintBlot);
  }
  constructor(quill, options) {
    this.quill = quill;
    this.options = options;
    this.initTimer();
  }
  initTimer() {
    let timer = null;
    this.quill.on(Quill.events.SCROLL_OPTIMIZE, () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const text = this.quill.getText().split("\n");
        const errors = this.lint(text);
        console.log("REPORT: ", errors);
        if (errors) {
          this.display(errors);
        }
        timer = null;
      }, 1000);
    });
  }
  lint(text) {
    JSHint(text);
    if (JSHint.data().errors) {
      const errors = this.processReport(JSHint.data(), text);
      return errors;
    } else {
      return false;
    }
  }
  processReport(report, text) {
    //calculate array where each element is number of characters in previous lines
    let sumOfChars;
    const charsBeforeLineArray = text
      .map(line => line.length)
      .map(length => (sumOfChars = (sumOfChars || 0) + length + 1));
    charsBeforeLineArray.pop();
    charsBeforeLineArray.unshift(0);
    // console.log(charsBeforeLineArray);
    // calculate end of lint message
    function calcEnd(error, quill) {
      const separators = [";", " ", "\n"];
      const start = charsBeforeLineArray[error.line - 1];
      const substring = text[error.line - 1].substring(error.character - 1);
      if (!substring) {
        return 0;
      }
      const reducer = (total, cur) => {
        const curIndex = substring.indexOf(cur);
        return curIndex >= 0 ? (total < curIndex ? total : curIndex) : total;
      };
      const end = separators.reduce(reducer, substring.length ? substring.length : 1) + start;
      // console.log(substring, start, '(', error.character, ')', end);
      // console.log('error: ', error.reason, 'sub: ', substring, 'start|end: ', start, '/', end, 'text: ', quill.getText(start, end));
      return end;
    }

    const errors = report.errors.map(error => ({
      start: charsBeforeLineArray[error.line - 1] + error.character - 1,
      end: calcEnd(error, this.quill),
      reason: error.reason
    }));

    return errors;
  }
  display(errors, charsBeforeLineArray) {
    errors.forEach(error => {
      if (error.end) {
        this.quill.formatText(error.start, error.end, "lint", error.reason);
      }
    });
  }
}

export default Linter;
