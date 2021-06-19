import React,{Component} from 'react'; 
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import { withRouter } from "react-router";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {connect} from 'react-redux';
import Alert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import {setError} from '../actions';
import Tooltip from '@material-ui/core/Tooltip';


class EditParty extends Component { 
    
    state = { 
        ready: false,
        id: this.props.match.params.id,
        name: "",
        shortdesc: "",
        longdesc: "",
        url: "",
        filteredPoliticians: ""
    }; 

    componentDidMount(){
        if(this.state.id == "new"){
            this.setState({ready:true})
        }else{
            fetch("/assignment2/getParty/"+this.state.id)
            .then(res => {
                res.json().then(result => {
                    this.setState({
                        name: result[0].name,
                        shortdesc: result[0].shortdesc,
                        longdesc: result[0].longdesc,
                        url: result[0].url,
                        ready: true,
                        filteredPoliticians: this.props.politiciansReducer.filter(item => item.party==this.state.id),
                        politiciansAvailable: (this.props.politiciansReducer.filter(item => item.party==this.state.id).length > 0)
                    })
                })                
                .catch((error) => {
                    window.location.href = "../partyList"
                })
            })
        }
    }

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
          this.editParty();
        }
    }

    queryChange = (event) => {
        if(event.target.id=="name"){
            this.setState({name:event.target.value})
        }else if(event.target.id=="shortdesc"){
            this.setState({shortdesc:event.target.value})
        }else if(event.target.id=="longdesc"){
            this.setState({longdesc:event.target.value})
        }else if(event.target.id=="url"){
            this.setState({url:event.target.value})
        }
    }

    editParty = () => {
        if(this.state.name !="" && this.state.shortdesc != "" && this.state.longdesc != "" && this.state.url != "" &&  (this.state.url.includes("http://") || this.state.url.includes("https://") )){
            if(this.state.id=="new"){
                fetch(('/assignment2/addPartyNew'), {
                    method: 'POST',
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                    name: this.state.name,
                    shortDesc: this.state.shortdesc,
                    longDesc: this.state.longdesc,
                    url:this.state.url
                    })
                })
                window.location.href=('../partyList')

            }else{
                fetch(('/assignment2/addParty/'+this.state.id), {
                    method: 'POST',
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                    name: this.state.name,
                    shortDesc: this.state.shortdesc,
                    longDesc: this.state.longdesc,
                    url:this.state.url
                    })
                })
                window.location.href=('../partyList')
            }
        }else{
            this.props.setError("Make sure to fill in all information and that the url contains http:// or https://")
        }
    }


    removeParty = () => {
        fetch("/assignment2/removeParty/"+this.state.id)
        .then(res => res.json())
        .then((result) => {
        this.props.setPoliticians(1,result)
        this.setState({ready:true})  
        })
        window.location.href=('/partyList')
    }


    render() { 
        if(this.state.ready==true){
            return(
                <Container maxWidth="md">
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Typography variant="h4" component="div">Add or edit party</Typography>
                                <TextField onKeyPress={this.handleKeyPress} required variant="outlined" margin="normal" fullWidth id="name" label="Name" defaultValue={this.state.name} autoFocus onChange={this.queryChange}/>
                                <TextField onKeyPress={this.handleKeyPress} required variant="outlined" margin="normal" multiline rows={5} rowsMax={8} fullWidth id="shortdesc" label="Short description" defaultValue={this.state.shortdesc} autoFocus onChange={this.queryChange}/>
                                <TextField onKeyPress={this.handleKeyPress} required variant="outlined" margin="normal" multiline rows={10} rowsMax={15} fullWidth id="longdesc" label="Long description" defaultValue={this.state.longdesc} autoFocus onChange={this.queryChange}/>
                                <Typography><TextField onKeyPress={this.handleKeyPress} type="url" required variant="outlined" margin="normal" fullWidth id="url" label="URL" defaultValue={this.state.url} autoFocus onChange={this.queryChange}/></Typography>
                            </CardContent>
                            <CardActions>
                            {(this.state.filteredPoliticians.length == 0) && (this.state.id != "new") ? (
                                <Button size="small" color="error"  onClick={() => {this.removeParty();}}>
                                Delete party
                                </Button>
                            ) : (
                                <Tooltip title="Remove politicians or save your new party in order to delete a party" arrow>
                                    <span>    
                                        <Button size="small" disabled >
                                        Delete party
                                        </Button>
                                    </span>
                                </Tooltip>
                            )}
                                <Button type="submit" size="small" color="primary" onClick={() => {this.editParty();}}>
                                    Save
                                </Button>
                                <Button type="submit" size="small" color="primary" onClick={() => {window.location.href=('/partyList');}}>
                                    Cancel
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Container>
            )  
        }else{
            return(<Alert severity="info">Loading page.</Alert>)
        }
    }
}
  

const mapDispatchToProps = (dispatch) => {
    return ({
      setError: (errorMessage) => dispatch(setError(errorMessage))
    })
  };


function mapStateToProps(state) {
    return({
        partiesReducer: state.partiesReducer,
        politiciansReducer: state.politiciansReducer
    })
}


  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditParty));