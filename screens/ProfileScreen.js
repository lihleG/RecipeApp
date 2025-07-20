import React, { useState, useEffect, useContext } from 'react';
import {
  SafeAreaView, View, Text, TextInput,
  TouchableOpacity, Switch, Image, StyleSheet, ScrollView, Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { ThemeContext } from '../ThemeContext';
import { useTheme } from '@react-navigation/native';

const STORAGE_KEY = '@user_settings';

export default function ProfileScreen() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { colors } = useTheme();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    (async () => {
      const json = await AsyncStorage.getItem(STORAGE_KEY);
      if (json) {
        const { name, email, avatar } = JSON.parse(json);
        setName(name); setEmail(email); setAvatar(avatar);
      }
    })();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1,1],
      quality: 0.5,
    });
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setAvatar(uri);
      await AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({ avatar: uri }));
    }
  };

  const saveField = async (key, value) => {
    await AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({ [key]: value }));
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.title, { color: colors.text }]}>Profile & Settings</Text>

        <View style={styles.avatarWrapper}>
          <Image
            source={avatar ? { uri: avatar } : require('../assets/avatar-placeholder.png')}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.editBtn} onPress={pickImage}>
            <Ionicons name="camera" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <Text style={[styles.label, { color: colors.text }]}>Name</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
            placeholder="Your name"
            placeholderTextColor={colors.text + '88'}
            value={name}
            onChangeText={t => { setName(t); saveField('name', t); }}
          />

          <Text style={[styles.label, { color: colors.text }]}>Email</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
            placeholder="you@example.com"
            placeholderTextColor={colors.text + '88'}
            value={email}
            keyboardType="email-address"
            onChangeText={t => { setEmail(t); saveField('email', t); }}
          />

          <View style={styles.row}>
            <Text style={[styles.label, { color: colors.text }]}>Dark Mode</Text>
            <Switch
              value={theme === 'dark'}
              onValueChange={toggleTheme}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#aaa',
  },
  editBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#4ad7ed',
    padding: 8,
    borderRadius: 20,
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
});



