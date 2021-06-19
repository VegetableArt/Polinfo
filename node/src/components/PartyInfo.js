import React,{Component} from 'react'; 
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import { withRouter } from "react-router";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {connect} from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';


class PartyInfo extends Component { 
    
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
    const filteredParty = this.props.partiesReducer.filter(item => item.id==this.state.id);
    fetch("/assignment2/getParty/"+this.state.id)
        .then(res => res.json())
        .then((result) => {
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

  }

    render() { 
        if(this.state.ready==true){
            return(
                <Container maxWidth="md">
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Typography gutterBottom variant="h4" component="div">{this.state.name}</Typography>
                                <Typography gutterBottom variant="h6" component="div">Short description</Typography>
                                <Typography>{this.state.shortdesc}</Typography>
                                <Typography gutterBottom variant="h6" component="div">Long description</Typography>
                                <Typography>{this.state.longdesc}</Typography>
                                <Typography>
                                    <Typography gutterBottom variant="h6" component="div">Politicians</Typography>
                                        {this.state.politiciansAvailable ? (
                                        this.state.filteredPoliticians.sort((a, b) => a.number > b.number ? 1 : -1).map((politician, i) =>
                                                <Paper key={i} variant="outlined" square>
                                                    <Box p={1}>
                                                        {politician.number}: {politician.name}
                                                    <Button size="small" color="primary" onClick={() => {window.location.href = "../editPolitician/"+politician.id}}>
                                                        Edit politician
                                                    </Button>
                                                    <Button size="small" color="primary" onClick={() => {window.location.href = "../politicianInfo/"+politician.id}}>
                                                        View politician
                                                    </Button>
                                                    </Box>
                                                </Paper>
                                        )):("No politicians available for this party.")}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary" onClick={() => { var win = window.open(this.state.url, '_blank');win.focus();}}>
                                    Visit website
                                </Button>
                                <Button size="small" color="primary" onClick={() => {window.location.href = "../editParty/"+this.state.id}}>
                                    Edit party info
                                </Button>
                                <Button size="small" color="primary" onClick={() => {window.location.href = "../partyList"}}>
                                    Go back to list
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


  export default withRouter(connect(mapStateToProps, null)(PartyInfo));