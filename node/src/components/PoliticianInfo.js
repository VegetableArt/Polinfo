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
import Container from '@material-ui/core/Container';


class PoliticianInfo extends Component { 
    
    state = { 
      id: this.props.match.params.id,
      ready: false,
      name: "",
      shortDesc: "",
      longDesc: "",
      url: "",
      filteredPoliticians: ""
    }; 
    

  componentDidMount(){
    fetch("/assignment2/getPolitician/"+this.state.id)
    .then(res => res.json())
    .then((result) => {
        if(result.length > 0){
            this.setState({
                name: result[0].name,
                desc: result[0].desc,
                number: result[0].number,
                party: result[0].name,
                partyid: result[0].party,
                ready:true
            })
        }})
        

  }

    render() { 
        if(this.state.ready==true){
            return(
                <Container maxWidth="md">
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Typography gutterBottom variant="h4" component="div">{this.state.name}</Typography>
                                <Typography>Party: {this.state.party}</Typography>
                                <Typography>Number on list:{this.state.number}</Typography>
                                <Typography gutterBottom variant="h6" component="div">Description</Typography>
                                <Typography>{this.state.desc}</Typography>
                                
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary" onClick={() => {window.location.href = "../editPolitician/"+this.state.id}}>
                                    Edit politician
                                </Button>
                                <Button size="small" color="primary" onClick={() => {window.location.href = "../partyInfo/"+this.state.partyid}}>
                                    Go back to party
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Container>
            )  
        }else{
            return(<Alert severity="info">Loading page... Or it didn't found anything related to the ID entered ;)</Alert>)
        }
    }
}
  
function mapStateToProps(state) {
    return({
        partiesReducer: state.partiesReducer,
        politiciansReducer: state.politiciansReducer
    })
}


  export default withRouter(connect(mapStateToProps, null)(PoliticianInfo));