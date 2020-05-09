import hljs from 'highlight.js/';
import 'highlight.js/styles/railscasts.css';
// import 'highlight.js/styles/dracula.css';


hljs.configure({
  languages: ['javascript', 'html', 'css'],
});

export default hljs;
