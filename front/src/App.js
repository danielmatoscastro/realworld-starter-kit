import React from 'react';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import {
  LOGIN,
  REGISTER,
  SETTINGS,
  EDITOR,
  EDITOR_SLUG,
  ARTICLE_SLUG,
  PROFILE_SLUG,
  FAVORITES_SLUG,
  HOME,
} from './routes';
import { UserProvider } from './providers';
import {
  Home,
  Login,
  Register,
  Settings,
  CreateArticle,
  Article,
  Profile,
  EditArticle,
} from './pages';

function App() {
  return (
    <UserProvider>
      <Router>
        <Switch>
          <Route path={LOGIN}>
            <Login />
          </Route>
          <Route path={REGISTER}>
            <Register />
          </Route>
          <Route path={SETTINGS}>
            <Settings />
          </Route>
          <Route path={EDITOR} exact>
            <CreateArticle />
          </Route>
          <Route path={EDITOR_SLUG}>
            <EditArticle />
          </Route>
          <Route path={ARTICLE_SLUG}>
            <Article />
          </Route>
          <Route path={[PROFILE_SLUG, FAVORITES_SLUG]}>
            <Profile />
          </Route>
          <Route path={HOME} exact>
            <Home />
          </Route>
        </Switch>
      </Router>
    </UserProvider>
  );
}

export default App;
