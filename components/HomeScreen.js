import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'
import NavOptions from '../internalcomponents/NavOptions'
import NavFavourites from './NavFavourites'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_MAPS_API_KEY } from "@env"
import { useDispatch } from 'react-redux'
import { setDestination, setOrigin } from "../slices/navSlice"

const HomeScreen = () => {
    const dispatch = useDispatch();


    return (
        <SafeAreaView style={tw`bg-purple-400 h-full`}>
            <View style={tw`p-10`}>
                <Image
                    style={{
                        width: 100,
                        height: 100,
                        resizeMode: "contain",
                    }}
                    source={require('../assets/carlogo.png')}
                />

                <GooglePlacesAutocomplete
                    placeholder='Where From ?'
                    styles={{
                        container: {
                            flex: 0,
                        },
                        textInput: {
                            fontSize: 18,
                        }
                    }}
                    onPress={(data, details = null) => {
                        dispatch(setOrigin({
                            location: details.geometry.location,
                            description: data.description,
                        }))
                        dispatch(setDestination(null))
                    }}
                    fetchDetails={true}
                    returnKeyType={"search"}
                    enablePoweredByContainer={false}
                    minLength={2}
                    query={{
                        key: GOOGLE_MAPS_API_KEY,
                        language: 'en'
                    }}
                    nearbyPlacesAPI='GooglePlacesSearch'
                    debounce={400}
                />


                <NavOptions />
                <NavFavourites />
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    text: {
        color: "blue",
    }

})