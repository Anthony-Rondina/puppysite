import React from 'react';
import ReactDOM from 'react-dom';
import './pages/App/App';
import App from './pages/App/App';
import { BrowserRouter as Router } from 'react-router-dom'
ReactDOM.render(
  <React.StrictMode>
    {/* react context API is why we wrap router around app. Passes props down  */}
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);