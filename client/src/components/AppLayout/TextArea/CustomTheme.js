//https://github.com/quilljs/quill/blob/develop/themes/bubble.js

import { Quill } from "react-quill";
var BubbleTheme = Quill.import("themes/bubble");

class NewTheme extends BubbleTheme {
  constructor(quill, options) {
    super(quill, options);
  }
}

export default NewTheme;
