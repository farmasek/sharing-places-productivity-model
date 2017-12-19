import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import AppWithHoc from './AppWithHoc';

ReactDOM.render(<App />, document.getElementById('root'));

// switch to test HoC
// ReactDOM.render(<AppWithHoc />, document.getElementById('root'));

registerServiceWorker();
