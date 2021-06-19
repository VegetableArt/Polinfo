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
import { FormControl } from '@material-ui/core';
import {setError} from '../actions';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';


class EditPolitician extends Component { 
    
    state = { 
        ready: false,
        id: this.props.match.params.id,
        name: "",
        party: "",
        number: "",
        desc: ""
    }; 

    componentDidMount(){
        if (this.state.id=="new"){
            this.setState({ready:true})
        }else{
            fetch("/assignment2/getPolitician/"+this.state.id)
            .then(res => {
                res.json().then(result => {
                    this.setState({
                        name: result[0].name,
                        desc: result[0].desc,
                        number: result[0].number,
                        party: result[0].party,
                        ready:true
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
          this.EditPolitician();
        }
    }

    queryChange = (event) => {
        if(event.target.id=="name"){
            this.setState({name:event.target.value})
        }else if(event.target.name=="party"){
            this.setState({party:event.target.value})
        }else if(event.target.id=="number"){
            this.setState({number:event.target.value})
        }else if(event.target.id=="desc"){
            this.setState({desc:event.target.value})
        }
    }

    EditPolitician = () => {
        if(this.state.name !="" && this.state.desc != "" && this.state.number != "" && this.state.party != "" && Number.isInteger(parseInt(this.state.number))){
            if(this.state.id=="new"){
                fetch(('/assignment2/addPolNew'), {
                    method: 'POST',
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: this.state.name,
                        number: this.state.number,
                        party: this.state.party,
                        desc: this.state.desc,
                    })
                })
                window.location.href=('../partyList')

            }else{
                fetch(('/assignment2/addPol/'+this.state.id), {
                    method: 'POST',
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: this.state.name,
                        number: this.state.number,
                        party: this.state.party,
                        desc: this.state.desc,
                    })
                })
                window.location.href=('../partyList')
            }
        }else{
            this.props.setError("Make sure to fill in all information and that the number of the policitian is an integer")
        }
    }


    removePolitician = () => {
        fetch("/assignment2/removePol/"+this.state.id)
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
                                <Typography variant="h4" component="div">Add or edit politician</Typography>
                                <TextField onKeyPress={this.handleKeyPress} required variant="outlined" margin="normal" fullWidth id="name" label="Name" defaultValue={this.state.name} autoFocus onChange={this.queryChange}/>
                                <FormControl variant="outlined" style={{"width":"100%"}}>
                                    <InputLabel id="demo-mutiple-name-label">Party</InputLabel>
                                    <Select name="party" onChange={this.queryChange}  value={this.state.party} label="fawwafw" > 
                                        {this.props.partiesReducer.map((party, i) =>
                                                <MenuItem key={i} value={party.id}>{party.name}</MenuItem>
                                        )}
                                    </Select>
                                </FormControl>
                                <TextField onKeyPress={this.handleKeyPress} required variant="outlined" margin="normal" fullWidth id="number" label="Number" defaultValue={this.state.number} autoFocus onChange={this.queryChange}/>
                                <TextField onKeyPress={this.handleKeyPress} required variant="outlined" margin="normal" multiline rows={5} rowsMax={8} fullWidth id="desc" label="Description" defaultValue={this.state.desc} autoFocus onChange={this.queryChange}/>
                            </CardContent>
                            <CardActions>
                            {((this.state.id != "new") ? (
                                <Button size="small" color="error"  onClick={() => {this.removePolitician();}}>
                                Delete politician
                                </Button>
                            ) : (""))}
                                <Button type="submit" size="small" color="primary" onClick={() => {this.EditPolitician();}}>
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


  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditPolitician));