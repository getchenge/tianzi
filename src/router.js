import React from 'react';
import { Router, Switch, Route } from 'dva/router';
import dynamic from 'dva/dynamic';

function RouterConfig({ history, app }) {
  const Index = dynamic({
    app,
    models: () => [
      import('./models/users.js'),
    ],
    component: () => import('./routes/Index'),
  });

  const Send = dynamic({
    app,
    models: () => [
      import('./models/users.js'),
    ],
    component: () => import('./routes/Send'),
  });

  const Users = dynamic({
    app,
    models: () => [
      import('./models/users.js'),
    ],
    component: () => import('./routes/Users'),
  });

  const Login = dynamic({
    app,
    models: () => [
      import('./models/users.js'),
    ],
    component: () => import('./routes/Login'),
  });
  
  const Admins = dynamic({
    app,
    models: () => [
      import('./models/admins.js'),
    ],
    component: () => import('./routes/Admins')
  });

  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Index} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/send" component={Send} />
        <Route exact path="/admins" component={Admins} />
        <Route exact path="/users" component={Users} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
