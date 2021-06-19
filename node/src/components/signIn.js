import React,{Component} from 'react'; 
import {connect} from 'react-redux';
import { withRouter } from "react-router";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { withStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import {setLogin} from '../actions';



const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});


class SignIn extends Component {
  state = { 
    un: null,
    pw: null,
    error: null
  }; 
  
  // Login section
  unChange = (event) => {
    this.setState({
      un : event.target.value
    })
  }
  pwChange = (event) => {
    this.setState({
      pw : event.target.value
    })
  }
  tryLogin = (un,pw) => {
    if((this.state.un!==null && this.state.pw!==null) && (this.state.un!=="" && this.state.pw!=="")){
      fetch('/assignment2/authenticationApi', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: un,
          password: pw,
        })
      }).then(resp => resp.json())
      .then(json => {
        var message = json[0].message  
        if(message==="auth_success"){
          this.checkAuthentication()
        }else{
          this.setState({
          error: "Wrong credentials supplied. Server rejected."
          })
        }
      })
    }else{
      this.setState({
        error: "No credentials filled in. Why not?!"
      })
    }
  }

  checkAuthentication = () => {
    fetch("/assignment2/checkLogin")
    .then(res => res.json())
    .then(
    (result) => {
      if(result[0].message === "logged_in"){
        this.props.setLogin(true)  
        this.props.history.push("/partyList") 
      }else{
        this.props.setLogin(false)  
      }
    })
  }

  showError = () => { 
    if(this.state.error!==null){
      return ( 
      <Alert severity="error">Error: {this.state.error}</Alert>
      ); 
    }
  }

  componentDidMount(){
    this.checkAuthentication()
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.tryLogin(this.state.un,this.state.pw);
    }
  }



  render() { 
    const {classes} = this.props
    if(this.props.loggedReducer === false){
      return(
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
            onChange={this.unChange}
            onKeyPress={this.handleKeyPress}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={this.pwChange}
            onKeyPress={this.handleKeyPress}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={()=> {this.tryLogin(this.state.un,this.state.pw);}}
            >
            Sign In
          </Button>

          {this.showError()}<br />
        </div>
      </Container>
      )
    }else{
      return(
        <Alert severity="info">Checking login status.</Alert>
      )
    }
  } 
} 
  

const mapDispatchToProps = (dispatch) => {
  return {
    setLogin: (what) => dispatch(setLogin(what))
  }
};

function mapStateToProps(state) {
  return({
    loggedReducer: state.loggedReducer
  })
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignIn)))