import React from 'react';
import { HashRouter, Route, Switch } from "react-router-dom";
import Login from './pages/Login'
import Register from './pages/Register'
import Password from './pages/Password'
import Tag from './pages/Tag'

export default function App() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/" component={Password} />
        <Route exact path="/tag" component={Tag} />
      </Switch>
      <style jsx>{`
      
          .App {
            color: red
          }
      
      `}</style>
    </HashRouter>
  )

}
