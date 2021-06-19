import React from "react";
import Main from './components/Main'
import PartyList from './components/PartyList'
import PartyInfo from './components/PartyInfo'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import SignIn from './components/signIn';
import EditParty from "./components/editParty";
import PoliticianInfo from "./components/PoliticianInfo";
import EditPolitician from "./components/EditPolitician";


function App(){
  return (
  <Router>
    <Switch>
      <Route exact path="/partyList">
        <Main>
          <PartyList />
        </Main>
      </Route>
      <Route exact path="/partyInfo/:id">
        <Main>
          <PartyInfo />
        </Main>
      </Route>
      <Route exact path="/editParty/:id">
        <Main>
          <EditParty />
        </Main>
      </Route>
      <Route exact path="/politicianInfo/:id">
        <Main>
          <PoliticianInfo />
        </Main>
      </Route>
      <Route exact path="/editPolitician/:id">
        <Main>
          <EditPolitician />
        </Main>
      </Route>
      <Route exact path="/signIn">
        <SignIn />
      </Route>
      <Route>
        {() => {window.location.href = "/partyList"}}
      </Route>
    </Switch>
  </Router>
  )
}

export default App