// screens/IngredientSearchScreen.js

import React, { useState } from 'react';
import {
  View, Text, TextInput, Button, FlatList,
  TouchableOpacity, Image, StyleSheet
} from 'react-native';
import axios from 'axios';
import { SPOONACULAR_API_KEY } from '../config';

export default function IngredientSearchScreen({ navigation }) {
  const [ingredients, setIngredients] = useState([]);
  const [input, setInput] = useState('');
  const [recipes, setRecipes] = useState([]);

  const addIngredient = () => {
    if (input.trim()) {
      setIngredients(prev => [...prev, input.trim()]);
      setInput('');
    }
  };

  const searchByIngredients = async () => {
    try {
      const response = await axios.get(
        'https://api.spoonacular.com/recipes/findByIngredients',
        {
          params: {
            ingredients: ingredients.join(','),
            number: 20,
            ranking: 1, 
            apiKey: SPOONACULAR_API_KEY, 
          },
        }
      );
      setRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Search by Ingredients</Text>

      <View style={styles.inputRow}>
        <TextInput
          placeholder="Add ingredient"
          value={input}
          onChangeText={setInput}
          style={styles.input}
        />
        <Button title="Add" onPress={addIngredient} />
      </View>

      <FlatList
        data={ingredients}
        keyExtractor={(item, idx) => idx.toString()}
        horizontal
        contentContainerStyle={{ paddingVertical: 10 }}
        renderItem={({ item }) => (
          <View style={styles.chip}>
            <Text style={styles.chipText}>{item}</Text>
          </View>
        )}
      />

      <Button title="Search Recipes" onPress={searchByIngredients} />

      <FlatList
        data={recipes}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ paddingVertical: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Details', { meal: item })}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 12, color: '#333' },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0f7fa',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  chipText: { color: '#00796b' },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 12,
    borderRadius: 10,
    backgroundColor: '#fafafa',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    flexShrink: 1,
    color: '#333',
  },
});


