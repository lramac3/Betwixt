import React, { Component } from "react";
import FormContainer from "../../components/FormContainer";
import FormInput from "../../components/FormInput";
import NavBar from "../../components/NavBar";
import { Link, Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Tab from "../../components/Tab";
import FormButton from "../../components/FormButton";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import LocationSearchInput from '../../components/LocationSearchInput'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  }
});

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locationA: "",
      locationB: "",
      pointOfInterest: "",
      transportation: "DRIVING",
      error: { locationA: false, locationB: false, pointOfInterest: false },
      toMap: false
    };
  }

  handleChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleTransportation = val => {
    this.setState({ transportation: val });
  };

  handleValidation = () => {
    this.setState(
      {
        error: {
          locationA: this.state.locationA.length === 0,
          locationB: this.state.locationB.length === 0,
          pointOfInterest: this.state.pointOfInterest.length === 0
        }
      },
      () => {
        if (
          !this.state.error.locationA &&
          !this.state.error.locationB &&
          !this.state.error.pointOfInterest
        ) {
          this.setState({ toMap: true });
        }
      }
    );
  };

  onSuggestSelect = (place: Suggest) => {
     console.log(place);
  }
  render() {
    const { classes } = this.props;
    const {
      locationA,
      locationB,
      pointOfInterest,
      transportation,
    } = this.state;

    if (this.state.toMap) {
      return (
        <Redirect
          to={`/map?from=${locationA}&to=${locationB}&point=${pointOfInterest}&mode=${transportation}`}
        />
      );
    }

    return (
      <div className="Site">
        <Grid container justify={"center"} spacing={24}>
          <Grid item xs={9}>
            <FormContainer>
              
              <LocationSearchInput
               name={"locationA"}
                value={this.state.address1}
                name={"locationB"}
                value={this.state.address2}
              //   <PlacesAutocomplete inputProps={inputProps} onChange={(address) => {this.handleAddressChange(address, 'address1')}} />
              // // placeholder={"First Location"}
              // name={"locationA"}
              // value={locationA}
              // handleChange={this.handleChange}
              // error={this.state.error.locationA}
              />
              {/* <FormInput
                placeholder={"First Location"}
                name={"locationA"}
                value={this.state.address1}
                handleChange={this.handleChange}
                error={this.state.error.locationA}
              />
              <FormInput
                placeholder={"Second Location"}
                name={"locationB"}
                value={this.state.address2}
                handleChange={this.handleChange}
                error={this.state.error.locationB}
              /> */}
              <FormInput
                placeholder={"Point of Interest"}
                name={"pointOfInterest"}
                value={pointOfInterest}
                handleChange={this.handleChange}
                error={this.state.error.pointOfInterest}
              />
            </FormContainer>
            <Tab onValueChanged={this.handleTransportation} />
            <div className="row">
              <FormButton
                name={"SUBMIT"}
                handleValidation={this.handleValidation}
              />
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
