import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-autocomplete';


const AddressForm = () => {
    const [address, setAddress] = useState('');
  
    const handleSelect = async (address) => {
      try {
        const results = await geocodeByAddress(address);
        const latLng = await getLatLng(results[0]);
        // Do something with the address or latitude/longitude
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    return (
      <Form>
        <Form.Group>
          <Form.Label>Address</Form.Label>
          <PlacesAutocomplete
            value={address}
            onChange={(value) => setAddress(value)}
            onSelect={handleSelect}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <Form.Control
                  {...getInputProps({
                    placeholder: 'Enter address',
                    className: 'form-control',
                  })}
                />
                <div>
                  {loading ? <div>Loading...</div> : null}
                  {suggestions.map((suggestion) => {
                    const style = {
                      backgroundColor: suggestion.active ? '#ebebeb' : '#fff',
                    };
                    return (
                      <div
                        key={suggestion.placeId}
                        {...getSuggestionItemProps(suggestion, { style })}
                      >
                        {suggestion.description}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        </Form.Group>
        {/* Add other form fields and submit button here */}
      </Form>
    );
  };
  
  export default AddressForm;
  