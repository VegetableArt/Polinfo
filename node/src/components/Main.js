import React,{Component} from 'react'; 
import { withStyles } from "@material-ui/core/styles";
import { Button } from '@material-ui/core';
import { withRouter } from "react-router";
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import {setLogin, setParties, setPoliticians, setError} from '../actions';
import {connect} from 'react-redux';
import Container from '@material-ui/core/Container';

const styles = theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    padding: theme.spacing(6, 0, 2),
  },
  footer:{
    padding: theme.spacing(6,6,6)
  }
});


class Main extends Component { 

  state = { 
    ready: false,
  }; 
    
  logOut = () => {
    fetch("/assignment2/logoutApi")
    .then(res => res.json())
    .then(
      (result) => {
        this.props.setLogin(true)
        if(result[0].message === "logout_successful"){
          this.props.history.push("/signIn")
        }  
    })
  }

  checkAuthentication = () => {
    fetch("/assignment2/checkLogin")
    .then(res => res.json())
    .then(
    (result) => {
      if(result[0].message === "logged_in"){
        this.props.setLogin(true)
        fetch("/assignment2/parties")
        .then(res => res.json())
        .then((result) => {
        this.props.setParties(1,result)
        fetch("/assignment2/politicians")
        .then(res => res.json())
        .then((result) => {
        this.props.setPoliticians(1,result)
        this.setState({ready:true})
        })
        })
      }else{
        this.props.history.push("/signIn") 
        this.props.setLogin(false)  
      }
    })
  }

  componentDidMount(){
    this.checkAuthentication()
  }

  render() { 
    const {classes} = this.props
    if(this.state.ready === true){
      return(
        <React.Fragment>
        <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
        <Container maxWidth="sm">
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
        Political Information
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
        On this website data about different political parties can be found together with information about their corresponding politicians. Also changes can be made.
        </Typography>
        {this.props.errorMessageReducer != "" ? (
          <Alert style={{"margin-bottom":"10px"}} severity="error">{this.props.errorMessageReducer}</Alert>
        ) : ("")}
        
        </Container>
        </div>

        <Container className={classes.cardGrid} maxWidth="md">
        {/* End hero unit */}
        {this.props.children}
        </Container>
        </main>
        <footer className={classes.footer}>

        <Typography variant="h6" align="center" gutterBottom>
        <Button variant="contained" color="primary" onClick={this.logOut}>
        Logout
        </Button>
        </Typography>
        </footer>
        </React.Fragment>
      )
    }else{
      return(
        <Alert severity="info">Checking login status.</Alert>
      )
    }
  } 
}

const mapDispatchToProps = (dispatch) => {
  return ({
    setLogin: (what) => dispatch(setLogin(what)),
    setParties: (act, parties) => dispatch(setParties(act,parties)),
    setPoliticians: (act, politicians) => dispatch(setPoliticians(act, politicians)),
    setError: (errorMessage) => dispatch(setError(errorMessage))
  })
};

function mapStateToProps(state) {
  return({
    loggedReducer: state.loggedReducer,
    partiesReducer: state.partiesReducer,
    politiciansReducer: state.politiciansReducer,
    errorMessageReducer : state.errorMessageReducer
  })
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Main)));
























  // ////// API USAGE ////////
      // fetch('/assignment2/addPartyNew', {
      //   method: 'POST',
      //   headers: {
      //     'Accept': 'application/json',
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     name: "Partij 10",
      //     url: "http://www.google.com",
      //     shortDesc: "SHORRT",
      //     longDesc: "LONNGG"
      //   })
      // }).then(resp => resp.json())
      // fetch('/assignment2/addPolNew', {
      //   method: 'POST',
      //   headers: {
      //     'Accept': 'application/json',
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     name: "Pol name",
      //     desc: "Description amai",
      //     party: "16c5aadd-3bac-411f-afa2-8892a69ec88a",
      //     number: 10
      //   })
      // }).then(resp => resp.json())

      // fetch('/assignment2/addParty/2e29801c-a1f8-4328-9ba9-c4073b148a68', {
      //   method: 'POST',
      //   headers: {
      //     'Accept': 'application/json',
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     name: "Groenrechts",
      //     shortDesc: "Al 30 jaar strijdt GroenLinks voor een inclusieve samenleving waarin we solidair zijn met elkaar en met de volgende generaties. Doe je mee?",
      //     longDesc: "This is the long description of GroenLinks.",
      //     url:"http://www.groenrechts.nl"
      //   })
      // }).then(resp => resp.json())
      

      
      // fetch('/assignment2/addPol/5c958081-46a0-4658-b06e-ac102c8ae82d', {
      //   method: 'POST',
      //   headers: {
      //     'Accept': 'application/json',
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     name: "Rob Jetten",
      //     desc: "Tweede Kamerlid.",
      //     party: "4dfd1928-4759-4314-96da-21d4664e0064",
      //     number: 1
      //   })
      // }).then(resp => resp.json())