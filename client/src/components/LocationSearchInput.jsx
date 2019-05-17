import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { classnames } from "../helpers";
import TextField from "@material-ui/core/TextField";

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      errorMessage: "",
      latitude: null,
      longitude: null,
      isGeocoding: false,
      address1: "",
      address2: "",
    };
  }

  handleChange = address => {
    this.setState({
      address1: address,
      latitude: null,
      longitude: null,
      errorMessage: "",
    });
  };

  handleAddressChange = (address, stateName) => {
    this.setState({
      [stateName]: address,
    });
  };

  componentDidUpdate() {
    console.log(this.state);
  }
//   handleSelect = selected => {
//     this.setState({ isGeocoding: true, address: selected });
//     geocodeByAddress(selected)
//       .then(res => getLatLng(res[0]))
//       .then(({ lat, lng }) => {
//         this.setState({
//           latitude: lat,
//           longitude: lng,
//           isGeocoding: false,
//         });
//       })
//       .catch(error => {
//         this.setState({ isGeocoding: false });
//         console.log("error", error); // eslint-disable-line no-console
//       });
//   };

//   handleCloseClick = () => {
//     this.setState({
//       address: "",
//       latitude: null,
//       longitude: null,
//     });
//   };

  handleError = (status, clearSuggestions) => {
    console.log("Error from Google Maps API", status); // eslint-disable-line no-console
    this.setState({ errorMessage: status }, () => {
      clearSuggestions();
    });
  };

  render() {
    // const {
    //   address,
    //   errorMessage,
    //   latitude,
    //   longitude,
    //   isGeocoding,
    //   address1,
    //   address2
    // } = this.state;

   const inputProps = {
   value: this.state.address,
   placeholder: "Enter a location",
 };
    return (
      <div>
       
        <PlacesAutocomplete
          onChange={value => this.setState({address1: value})}
          value={this.state.address1}
          onSelect={this.handleSelect}
          onError={this.handleError}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps }) => {
            return (
              <div className="Demo__search-bar-container">
                <div className="Demo__search-input-container">
                  <TextField
                    fullWidth
                    {...getInputProps({
                      placeholder: "First Location (Autocomplete)",
                      name: "locationB",
                      className: "Demo__search-input",
                    })}
                  />
                  
                  {/* <input
                    {...getInputProps({
                      placeholder: "Search Places...",
                      className: "Demo__search-input",
                    })}
                  /> */}
                  {/* {this.state.address.length > 0 && (
                    <button
                      className="Demo__clear-button"
                      onClick={this.handleCloseClick}
                    >
                      x
                    </button>
                  )} */}
                </div>
                {suggestions.length > 0 && (
                  <div className="Demo__autocomplete-container">
                    {suggestions.map(suggestion => {
                      const className = classnames(
                        "Demo__suggestion-item",
                        {
                          "Demo__suggestion-item--active":
                            suggestion.active,
                        }
                      );

                      return (
                        /* eslint-disable react/jsx-key */
                        <div
                          {...getSuggestionItemProps(suggestion, {
                            className,
                          })}
                        >
                          <strong>
                            {
                              suggestion.formattedSuggestion
                                .mainText
                            }
                          </strong>{" "}
                          <small>
                            {
                              suggestion.formattedSuggestion
                                .secondaryText
                            }
                          </small>
                        </div>
                      );
                      /* eslint-enable react/jsx-key */
                    })}
                  </div>
                )}
              </div>
            );
          }}
        </PlacesAutocomplete>
        <PlacesAutocomplete
          onChange={value => this.setState({address2: value})}
          value={this.state.address2}
          onSelect={this.handleSelect}
          onError={this.handleError}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps }) => {
            return (
              <div className="Demo__search-bar-container">
                <div className="Demo__search-input-container">
                  <TextField
                    fullWidth
                    {...getInputProps({
                      placeholder: "Second Location (Autocomplete)",
                      name: "locationB",
                      className: "Demo__search-input",
                    })}
                  />
                  
                  {/* <input
                    {...getInputProps({
                      placeholder: "Search Places...",
                      className: "Demo__search-input",
                    })}
                  /> */}
                  {/* {this.state.address.length > 0 && (
                    <button
                      className="Demo__clear-button"
                      onClick={this.handleCloseClick}
                    >
                      x
                    </button>
                  )} */}
                </div>
                {suggestions.length > 0 && (
                  <div className="Demo__autocomplete-container">
                    {suggestions.map(suggestion => {
                      const className = classnames(
                        "Demo__suggestion-item",
                        {
                          "Demo__suggestion-item--active":
                            suggestion.active,
                        }
                      );

                      return (
                        /* eslint-disable react/jsx-key */
                        <div
                          {...getSuggestionItemProps(suggestion, {
                            className,
                          })}
                        >
                          <strong>
                            {
                              suggestion.formattedSuggestion
                                .mainText
                            }
                          </strong>{" "}
                          <small>
                            {
                              suggestion.formattedSuggestion
                                .secondaryText
                            }
                          </small>
                        </div>
                      );
                      /* eslint-enable react/jsx-key */
                    })}
                  </div>
                )}
              </div>
            );
          }}
        </PlacesAutocomplete>
        {this.state.errorMessage.length > 0 && (
          <div className="Demo__error-message">
            {this.state.errorMessage}
          </div>
        )}

        {/* {((latitude && longitude) || isGeocoding) && (
          <div>
            <h3 className="Demo__geocode-result-header">Geocode result</h3>
            {isGeocoding ? (
              <div>
                <i className="fa fa-spinner fa-pulse fa-3x fa-fw Demo__spinner" />
              </div>
            ) : (
              <div>
                <div className="Demo__geocode-result-item--lat">
                  <label>Latitude:</label>
                  <span>{latitude}</span>
                </div>
                <div className="Demo__geocode-result-item--lng">
                  <label>Longitude:</label>
                  <span>{longitude}</span>
                </div>
              </div>
            )}
          </div>
        )} */}
      </div>
    );
  }
}

export default LocationSearchInput;
