class Linter {
  constructor(quill, options) {
    this.quill = quill;
    this.options = options;
    quill.on("text-change", this.update.bing(this));
  }
  update() {
    // lint, and then change deltas somehow...
  }
}

export default Linter;
