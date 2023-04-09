import './App.css';

import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import UserAuth from './user/pages/UserAuth';

function App() {
  return (
    <Router>

      <MainNavigation/>

      <main>
        <Switch>
        
        <Route path="/" exact>
          <Users/>
        </Route>

        {/* this route as a dynamic path, the :userId is called a dynamic segment */}
        <Route path="/:userId/places" exact>
          <UserPlaces/>
        </Route>

        <Route path="/places/new" exact>
          <NewPlace/>
        </Route>

        <Route path="/places/:placeId" exact>
          <UpdatePlace/>
        </Route>

        <Route path="/auth" exact>
          <UserAuth/>
        </Route>

        <Redirect to="/"/>

        </Switch>
      </main>

    </Router>
  );
}

export default App;
