import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import './AddressInput.css'; // Import the CSS file

class AddressInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
  }

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        // Call the onSelectAddress function with the selected address data
        this.props.onSelectAddress({
          address,
          latLng
        });
      })
      .catch(error => console.error('Error', error));
  };

  render() {
    return (
        <div className='address-input-container'>
            <label className='address-label' htmlFor='street-address'>
              Street Address <span className='required-label'>*</span> {/* Add required label */}
            </label>
            <PlacesAutocomplete
                value={this.state.address}
                onChange={this.handleChange}
                onSelect={this.handleSelect}
                id='street-address' // Assign an id to the input for the label's htmlFor attribute
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                    <input
                    {...getInputProps({
                        placeholder: '',
                        className: 'location-search-input',
                    })}
                    />
                    <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map((suggestion, index) => {
                        const className = suggestion.active
                        ? 'suggestion-item--active'
                        : 'suggestion-item';
                        // inline style for demonstration purpose
                        const style = suggestion.active
                            ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                            : { backgroundColor: '#ffffff', cursor: 'pointer' };
                        return (
                            <div
                                key={index}
                                {...getSuggestionItemProps(suggestion, {
                                className,
                                style,
                                })}
                            >
                                <span>{suggestion.description}</span>
                            </div>
                        );
                    })}
                    </div>
                </div>
                )}
            </PlacesAutocomplete>
        </div>
    );
  }
}

export default AddressInput;
