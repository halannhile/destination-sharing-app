import './App.css';

import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UserPlaces from './places/pages/UserPlaces';

function App() {
  return (
    <Router>

      <MainNavigation/>

      <main>
        <Switch>
        
        <Route path="/" exact>
          <Users/>
        </Route>

        {/* this route as a dynamic path */}
        <Route path="/:userId/places" exact>
          <UserPlaces/>
        </Route>

        <Route path="/places/new" exact>
          <NewPlace/>
        </Route>

        <Redirect to="/"/>

        </Switch>
      </main>

    </Router>
  );
}

export default App;
