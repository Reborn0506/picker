import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  Platform,
  ActivityIndicator
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


interface Signup {
  Name: string;
  role: string;
  birthday: Date;
}


const roleOptions = [
  { label: 'Team Lead', value: 'Team Lead' },
  { label: 'Project Manager', value: 'Project Manager' },
  { label: 'Software Developer', value: 'Software Developer' },
  { label: 'UI/UX Designer', value: 'UI/UX Designer' },
];

export default function SignupScreen() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Signup>({
    defaultValues: {
      Name: '',
      role: '',
      birthday: new Date()
    }
  });


  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onSubmit = async (data: Signup) => {
    if (loading) return;

    try {
      setLoading(true);
      console.log('Submitting form data:', data);


      const payload = {
        Name: data.Name,
        role: data.role,
        birthday: data.birthday.toISOString()
      };


      const resp = await fetch('https://reqres.in/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'reqres-free-v1',
        },
        body: JSON.stringify(payload),
      });

      const result = await resp.json();

      if (resp.ok) {
        console.log('Signup successful:', result);
        Alert.alert(
          "Success",
          "You have successfully signed up!",
          [{ text: "OK", onPress: () => reset() }]
        );
      } else {
        console.error('API error:', result);
        Alert.alert("Error", "Failed to sign up. Please try again.");
      }
    } catch (err) {
      console.error('Signup error:', err);
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  const toggleDatePicker = () => setShowDatePicker(true);


  const handleDateChange = (event, selectedDate, onChange) => {
    setShowDatePicker(Platform.OS === 'ios');

    if (event.type !== 'dismissed' && selectedDate) {
      onChange(selectedDate);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Controller
          control={control}
          name="Name"
          rules={{
            required: "Name is required"
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <Text style={styles.fieldLabel}>Full Name</Text>
              <TextInput
                style={[styles.input, errors.Name && styles.errorInput]}
                placeholder="Enter your name"
                placeholderTextColor={"#949494"}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              {errors.Name && <Text style={styles.error}>{errors.Name.message}</Text>}
            </>
          )}
        />




        <Controller
          control={control}
          name="role"
          rules={{
            required: "Please select a role"
          }}
          render={({ field: { onChange, value } }) => (
            <>
              <Text style={styles.fieldLabel}>Role</Text>
              <View style={[styles.pickerContainer, errors.role && styles.errorInput]}>
                <RNPickerSelect
                  onValueChange={val => onChange(val || '')}
                  placeholder={{ label: "Select a role", value: '', color: "#949494" }}
                  items={roleOptions}
                  value={value || ''}
                  useNativeAndroidPickerStyle={false}
                  style={{
                    inputIOS: styles.pickerInputIOS,
                    inputAndroid: styles.pickerInputAndroid,
                    placeholder: {
                      color: '#949494',
                    },
                  }}
                  Icon={() => (
                    <MaterialIcons
                      name="arrow-drop-down"
                      size={24}
                      color="#663399"
                      style={styles.dropdownIcon}
                    />
                  )}
                />
              </View>
              {errors.role && <Text style={styles.error}>{errors.role.message}</Text>}
            </>
          )}
        />




        <Controller
          control={control}
          name="birthday"
          rules={{
            required: "Birthday is required"
          }}
          render={({ field: { onChange, value } }) => (
            <>
              <Text style={styles.fieldLabel}>Birthday</Text>
              <TouchableOpacity
                style={[styles.datePickerButton, errors.birthday && styles.errorInput]}
                onPress={toggleDatePicker}
              >
                <Text style={value ? styles.dateText : styles.placeholderText}>
                  {value ? value.toLocaleDateString() : "Select your birthday"}
                </Text>
                <MaterialIcons name="calendar-today" size={20} color="#663399" style={styles.calendarIcon} />
              </TouchableOpacity>
              {errors.birthday && <Text style={styles.error}>{errors.birthday.message}</Text>}

              {showDatePicker && (
                <DateTimePicker
                  value={value || new Date()}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={(e, date) => handleDateChange(e, date, onChange)}
                  maximumDate={new Date()}
                />
              )}
            </>
          )}
        />




        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleSubmit(onSubmit)}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Sign Up</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  form: {
    marginBottom: 16,
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 25,
    backgroundColor: "#caabdb",
    padding: 26,
    width: "100%",
  },
  fieldLabel: {
    alignSelf: 'flex-start',
    marginLeft: '12%',
    marginBottom: 6,
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  input: {
    height: 50,
    width: "80%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 25,
    paddingLeft: 16,
    marginBottom: 10,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  pickerContainer: {
    width: "80%",
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 25,
    borderColor: "#ccc",
    borderWidth: 1,
    height: 50,
    justifyContent: "center",
    position: "relative",
  },
  pickerInputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    paddingRight: 30,
    color: 'black',
    height: 50,
    borderRadius: 25,
    width: '100%',
  },
  pickerInputAndroid: {
    fontSize: 16,
    paddingHorizontal: 16,
    paddingRight: 30,
    paddingVertical: 8,
    color: 'black',
    height: 50,
    borderRadius: 25,
    width: '100%',
  },
  dropdownIcon: {
    position: "absolute",
    right: 15,
    top: 13,
    zIndex: 1,
  },
  datePickerButton: {
    width: "80%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 25,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
  dateText: {
    fontSize: 16,
    color: "#000",
  },
  placeholderText: {
    fontSize: 16,
    color: "#949494",
  },
  calendarIcon: {
    position: "absolute",
    right: 15,
  },
  errorInput: {
    borderColor: "red",
  },
  button: {
    width: "80%",
    height: 50,
    borderRadius: 25,
    backgroundColor: "#663399",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: "#b0c4de",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 5,
    alignSelf: "flex-start",
    marginLeft: "12%",
    marginTop: -5,
  },
});