import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Parent } from "../Components";

import {
  ResizeVideo,
  AddSubtitles,
  AddText,
  Settings,
  MakeGif,
  TrimVideo,
  GetFrame,
} from "../Pages";
import CreateProject from "../Pages/CreateProject";
import Videos from "../Pages/Videos";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";

import { LoadingBar } from "react-redux-loading-bar";
import NotificationMessageRenderer from "../Components/NotificationMessageRenderer";
import Homepage from "../Pages/Homepage";
import Pricing from "../Pages/Pricing";
import { useSelector } from "react-redux";
import Profile from "../Pages/Profile";

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const token = useSelector((state) => !!state.Auth.access_token);
  return (
    <Route
      {...rest}
      render={(props) =>
        token ? (
          <Component {...props} />
        ) : (
          <Redirect
            exact
            to={{
              pathname: "/",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

const Routes = () => {
  return (
    <>
      <LoadingBar
        showFastActions
        style={{
          backgroundColor: "red",
          height: "2000px",
          zIndex: 100000000,
        }}
      />
      <NotificationMessageRenderer />
      <Router>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/pricing" component={Pricing} />
          <PrivateRoute
            exact
            path="/create-project"
            component={CreateProject}
          />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/videos" component={Videos} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Parent>
            <PrivateRoute
              exact
              path="/edit/resize-video"
              component={ResizeVideo}
            />
            <PrivateRoute exact path="/edit/trim-video" component={TrimVideo} />
            <PrivateRoute path="/edit/subtitles" component={AddSubtitles} />
            <PrivateRoute path="/edit/video-frame" component={GetFrame} />
            <PrivateRoute path="/edit/make-gif" component={MakeGif} />
            <PrivateRoute path="/edit/text" component={AddText} />
            <PrivateRoute path="/edit/settings" component={Settings} />
          </Parent>
        </Switch>
      </Router>
    </>
  );
};

export default Routes;
