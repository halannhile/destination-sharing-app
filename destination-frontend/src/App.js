import './App.css';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Users from './user/pages/Users';

function App() {
  return (
    <Router>
      <Route path="/" exact>
        <Users/>
      </Route>
      <Redirect to="/"/>
    </Router>
  );
}

export default App;
