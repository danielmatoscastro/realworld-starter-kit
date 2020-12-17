import React from 'react';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import UserProvider from './providers/UserProvider';
import Home from './pages/Home';
import LoginRegister from './pages/LoginRegister';
import Settings from './pages/Settings';
import CreateEditArticle from './pages/CreateEditArticle';
import Article from './pages/Article';
import Profile from './pages/Profile';

function App() {
  return (
    <UserProvider>
      <Router>
        <Switch>
          <Route path={['/login', '/register']}>
            <LoginRegister />
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
          <Route path={['/editor', '/editor/:slug']}>
            <CreateEditArticle />
          </Route>
          <Route path="/article/:slug">
            <Article />
          </Route>
          <Route path={['/profile/:slug', '/profile/:slug/favorites']}>
            <Profile />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
      </Router>
    </UserProvider>
  );
}

export default App;
