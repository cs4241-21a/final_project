import { BrowserRouter, Route, Switch } from 'react-router-dom';

import TournamentCreationPage from './pages/TournamentCreation';
import TournamentPage from './pages/Tournament';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ErrorPage from './pages/ErrorPage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route exact path='/' component={} /> */}
        <Route path='/login' component={LoginPage} />
        <Route path='/register' component={RegisterPage} />
        <Route path='/tournament-create/:userId' component={TournamentCreationPage} />
        <Route path='/tournament/:userId' component={TournamentPage} />
        <Route path='*'>
          <ErrorPage errorCode={'404 Not Found'} errorMessage={'The page you are looking for does not exist.'} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
