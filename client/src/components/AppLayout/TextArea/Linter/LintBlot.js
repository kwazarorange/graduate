import { Quill } from "react-quill";
let Inline = Quill.import("blots/inline");

class LintBlot extends Inline {
  static create(value) {
    const node = super.create(value);
    node.setAttribute("data-title", value);
    return node;
  }
  static formats(node) {
    return node.getAttribute("data-title");
  }

  format(name, value) {
    if (name !== this.statics.blotName || !value) {
      super.format(name, value);
    } else {
      this.domNode.setAttribute("data-title", value);
    }
  }
}

LintBlot.blotName = "lint";
LintBlot.tagName = "span";
LintBlot.className = "lintClass";

export default LintBlot;
