import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Signup {
  Name: string;
  Role: string;
}

export default function LoginScreen() {
  const { control, handleSubmit, reset, formState: { errors } } = useForm<Signup>();
  const [loading, setLoading] = useState(false);
  const onSubmit = (data: Signup) => {
    console.log(data);}
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
            <TextInput
              style={[styles.input, errors.Name && styles.errorInput]}
              placeholder="Name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}/>
        
          <Controller  
          control ={control}
          name="Role"
            render={({field: {onChange, value}}) => {
              return (
                <RNPickerSelect
                  onValueChange={onChange}
                  items={[
                    { label: "Team Lead", value: "Team Lead" },
                    { label: "Project Manager", value: "Project Manager" },
                    { label: "Software Developer", value: "Software Developer" },
                    { label: "UI/UX Designer", value: "UI/UX Designer" },
                  ]}
                />
              );
            }}
          />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleSubmit(onSubmit)}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? "Loading..." : "Sign Up"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>


)}
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
  },
  input: {
    height: 50,
    width: "80%", 
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 25, 
    paddingLeft: 16,
    marginBottom: 20,
    backgroundColor: "#fff", 
    fontSize: 16,
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
  },
  buttonDisabled: {
    backgroundColor: "#b0c4de", 
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 12,
  },
})