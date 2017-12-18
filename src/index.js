import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AppWithHoc from './AppWithHoc';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// switch to test HoC
// ReactDOM.render(<AppWithHoc />, document.getElementById('root'));

registerServiceWorker();
