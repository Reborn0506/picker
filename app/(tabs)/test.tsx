import React from 'react';
import {
  Button,
  Text,
  TextInput,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Chevron } from 'react-native-shapes';
import { Ionicons } from '@expo/vector-icons';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
// import RNPickerSelect, { defaultStyles } from './debug';

const sports = [
  {
    label: 'Football',
    value: 'football',
  },
  {
    label: 'Baseball',
    value: 'baseball',
  },
  {
    label: 'Hockey',
    value: 'hockey',
  },
];

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.inputRefs = {
      firstTextInput: null,
      favSport0: null,
      favSport1: null,
      lastTextInput: null,
      favSport5: null,
    };

    this.state = {
      numbers: [
        {
          label: '1',
          value: 1,
          color: 'orange',
        },
        {
          label: '2',
          value: 2,
          color: 'green',
        },
      ],
      favSport0: undefined,
      favSport1: undefined,
      favSport2: undefined,
      favSport3: undefined,
      favSport4: 'baseball',
      previousFavSport5: undefined,
      favSport5: null,
      favNumber: undefined,
    };

  }

  render() {
    const placeholder = {
      label: 'Select a sport...',
      value: null,
      color: '#9EA0A4',
    };

    return (
      <View style={styles.container}>
        <View style={styles.row} >
          <Text style={[styles.subtitle, {marginBottom: -24, marginLeft: 16}]}>Sports
            <Text style={styles.required}>{"*"}</Text>
          </Text>
          <RNPickerSelect
            placeholder={{}}
            onValueChange={value => {
                this.setState({
                  favSport0: value,
                });
              }}
            items={sports}
            style={{
              ...pickerSelectStyles,
              iconContainer: {
                top: 24,
                right: 16,
              },
              placeholderColor: "#000000"
            }}
              Icon={() => {
                return <Chevron size={1.5} color="gray" />;
              }}
          />
        </View> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 54,
    paddingHorizontal: 16,
  },
  row: {  
    flex: 1,
    minHeight: 56,
    maxHeight: 56,
    width: '100%',
    borderRadius: 4,
    marginBottom: 16,
    justifyContent: 'center',
    paddingVertical: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.07)',
    borderBottomWidth: 2,
    borderBottomColor: '#00BCD4'
  },
  subtitle: {
    color: 'rgba(0, 0, 0, 0.3)',
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
  },
  required: {
    color: 'rgba(230, 57, 53, 0.3)'
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {    
    paddingHorizontal: 16,
    fontSize: 16,
    flex: 1,
    minHeight: 56,
    maxHeight: 56,
    width: '100%',
    borderRadius: 4,
    marginBottom: 16,    
    justifyContent: 'center',
    paddingTop: 18,
  },
  viewContainer: {
    flex: 1,
  },
  inputAndroid: {
    marginLeft: 8,
    marginTop: 6,
    fontSize: 16,
    flex: 1,
    minHeight: 56,
    maxHeight: 56,
    width: '100%',
    borderRadius: 4,
    marginBottom: 16,
    justifyContent: 'center',
    paddingTop: 18,
  },
  placeholder: {color: "#000000"},
});