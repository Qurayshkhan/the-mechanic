import React, { useRef } from "react";
import { useJsApiLoader, StandaloneSearchBox } from "@react-google-maps/api";
import TextInput from "./TextInput";
import SecondaryButton from "./SecondaryButton";
import { MapPin } from "lucide-react";
const LIBRARIES = ["maps", "places", "geometry"];
const AutoComplete = ({ handleOnPlacesChange, value }) => {
    const inputRef = useRef();
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API,
        libraries: LIBRARIES,
    });
    const handleSelectPlace = () => {
        const places = inputRef.current.getPlaces();
        if (!places || places.length === 0) return;
        const place = places[0];
        const address = place.formatted_address;
        const latitude = place.geometry.location.lat();
        const longitude = place.geometry.location.lng();
        handleOnPlacesChange({ address, latitude, longitude });
    };

    const handleUseCurrentLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                const geocoder = new window.google.maps.Geocoder();
                console.log(
                    "🚀 ~ handleUseCurrentLocation ~ geocoder:",
                    geocoder
                );
                const latlng = { lat: latitude, lng: longitude };

                geocoder.geocode({ location: latlng }, (results, status) => {
                    if (status === "OK" && results[0]) {
                        const address = results[0].formatted_address;

                        handleOnPlacesChange({
                            address: address,
                            latitude: latitude,
                            longitude: longitude,
                        });
                    } else {
                        alert("Unable to fetch address from location.");
                    }
                });
            },
            (error) => {
                console.error(error);
                alert("Unable to fetch your location. Please try again.");
            }
        );
    };
    return (
        <>
            {isLoaded && (
                <StandaloneSearchBox
                    onLoad={(ref) => (inputRef.current = ref)}
                    onPlacesChanged={handleSelectPlace}
                >
                    <>
                        <div className="flex items-center gap-2 mb-2">
                            <SecondaryButton
                                type="button"
                                onClick={handleUseCurrentLocation}
                                className="ml-auto px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 text-sm"
                            >
                                <div className="flex items-center gap-1">
                                    <MapPin className="h-5 w-5" />{" "}
                                    <span>Use Current Location</span>
                                </div>
                            </SecondaryButton>
                        </div>
                        <TextInput
                            placeholder="Enter your workshop address"
                            className="w-full"
                            value={value}
                            onChange={(e) =>
                                handleOnPlacesChange({
                                    address: e.target.value,
                                })
                            }
                        />
                    </>
                </StandaloneSearchBox>
            )}
        </>
    );
};

export default AutoComplete;
