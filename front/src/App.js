import React, { Suspense } from 'react';
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

const Home = React.lazy(() => import('pages/Home'));
const Login = React.lazy(() => import('pages/LoginRegister'));
const Register = React.lazy(() => import('pages/LoginRegister'));
const Settings = React.lazy(() => import('pages/Settings'));
const CreateArticle = React.lazy(() => import('pages/CreateArticle'));
const EditArticle = React.lazy(() => import('pages/EditArticle'));
const Article = React.lazy(() => import('pages/Article'));
const Profile = React.lazy(() => import('pages/Profile'));

function App() {
  return (
    <UserProvider>
      <Router>
        <Switch>
          <Suspense fallback={<div>Loading...</div>}>
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
          </Suspense>
        </Switch>
      </Router>
    </UserProvider>
  );
}

export default App;
