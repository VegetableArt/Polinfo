import React,{Component} from 'react'; 
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import { withRouter } from "react-router";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {connect} from 'react-redux';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';



class PartyList extends Component { 
  state = { 
    ready: false,
    showDesc: true,
    showButtons: true,
    searchQuery: "",
  }; 

  queryChange = (event) => {
    this.setState({
      searchQuery : event.target.value
    })
  }

  changeShowDesc = () => {
    this.setState({showDesc : !this.state.showDesc})
  }

  changeShowButtons = () => {
    this.setState({showButtons : !this.state.showButtons})
  }

  componentDidMount(){
    this.setState({ready:true})
  }

  render() { 
    if(this.state.ready === true){
      const lowercasedFilter = this.state.searchQuery.toLowerCase();
      const filteredData = this.props.partiesReducer.filter(item => {
        return Object.keys(item).some(key =>
          item[key].toLowerCase().includes(lowercasedFilter)
        );
      });

      if(filteredData.length>0){
        return (
          <Grid container spacing={4}>
            <Grid container justify = "center">
              <Grid justify="center" container>
                <Button style={{"marginRight":"10px"}} variant="contained" onClick={() => {window.location.href = "./editParty/new"}}>
                  Add new Party
                </Button>
                <Button variant="contained" onClick={() => {window.location.href = "./editPolitician/new"}}>
                  Add new Politician
                </Button>
              </Grid>
              <TextField variant="outlined" margin="normal" id="search" label="Search query" name="search" autoFocus onChange={this.queryChange}/>
              <Grid container justify = "center">
                <FormControlLabel
                  control={<Checkbox checked={this.state.showDesc} onChange={this.changeShowDesc} name="checkedDesc" />}
                  label="Show description"/>
                <FormControlLabel
                  control={<Checkbox checked={this.state.showButtons} onChange={this.changeShowButtons} name="checkedButtons" />}
                  label="Show buttons"/>
              </Grid>
            </Grid>

            {
            filteredData.map((party, i) =>  
              <Grid item key={i} xs={12} sm={6} md={4}>
                <Card >
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" style={{"margin-top":"10px"}}>
                      <Link href="#" onClick={() => {window.location.href = ("./partyInfo/"+party.id)}}>
                        {party.name}
                      </Link>
                    </Typography>
                    {this.state.showDesc ? (
                      <Typography>
                      {party.shortdesc}
                      </Typography>
                    ) : (
                      null
                    )}
                  </CardContent>
                    {this.state.showButtons ? (
                      <CardActions>
                        <Button size="small" color="primary" onClick={() => { var win = window.open(party.url, '_blank');win.focus();}}>
                          Visit website
                        </Button>
                      </CardActions>
                    ) : (
                      null
                    )}
                </Card>
              </Grid>
            )
            }
          </Grid>
        )
      }else{
        return (
          <Grid container justify = "center">
          <Grid justify="center" container>
            <Button style={{"marginRight":"10px"}} variant="contained" onClick={() => {window.location.href = "./editParty/new"}}>
              Add new Party
            </Button>
            <Button variant="contained" onClick={() => {window.location.href = "./editPolitician/new"}}>
              Add new Politician
            </Button>
          </Grid>
          <Grid justify="center" container>
          
          <Typography component="h6" variant="h6" align="center">
          <br /><br />No results
          </Typography>
          </Grid>
        </Grid>
        )
      }
    }else{
      return( null )
    }
  }
}


function mapStateToProps(state) {
  return({
    partiesReducer: state.partiesReducer,
    politiciansReducer: state.politiciansReducer
  })
}


export default withRouter(connect(mapStateToProps, null)(PartyList));