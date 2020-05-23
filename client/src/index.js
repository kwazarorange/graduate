import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import App from './App';
import store from "./store";
import * as serviceWorker from './serviceWorker';
import './scss/main.scss';

// codemirror.net - text editor
// https://www.thatsoftwaredude.com/content/8912/create-a-basic-text-editor-in-javascript - how to build
// https://prismjs.com/ - syntax highlihter
// https://ourcodeworld.com/articles/read/140/top-5-best-code-syntax-highlighter-javascript-plugins - some more

// https://eslint.org/docs/developer-guide/nodejs-api - about linting. IT IS DOABLE!
// verify the code on server, return result to the user and display it.
// the worst part right now is the client text editor.

// https://www.npmjs.com/package/react-codemirror2 - react editor component


// fuck it, use draft js and draft-js-prism for textarea and syntax highlighter


// https://medium.com/@david.roegiers/building-a-real-time-collaborative-text-editor-for-the-web-draftjs-sharedb-1dd8e8826295
// collaborative draft js editor (A LOT of difficulties)

// or maybe use quill? they support OT

//https://github.com/pedrosanta/quill-sharedb-cursors
// most likely will use quill and sharedb for OT.. here is an example of collaborative with multiple cursors

//https://github.com/reedsy/quill-cursors - anthoer great project

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
