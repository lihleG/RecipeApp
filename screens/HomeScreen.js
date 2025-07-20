import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Button
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';

const CATEGORY_MAPPING = {
  Popular: 'Seafood',
  Traditional: 'Beef',
  Dessert: 'Dessert',
  Drinks: 'Miscellaneous',
};

export default function HomeScreen({ navigation }) {
  const [meals, setMeals] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Popular');

 // Fetch meals whenever the selected category changes
 useEffect(() => {
  const fetchMeals = async () => {
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${CATEGORY_MAPPING[selectedCategory]}`
      );
      const json = await res.json();
      setMeals(json.meals || []);
    } catch (e) {
      console.error(e);
      setMeals([]);
    }
    };
    fetchMeals();
  }, [selectedCategory]);
 

  const filteredMeals = meals?.filter(meal =>
    meal.strMeal.toLowerCase().includes(search.toLowerCase())
  );

  const categories = ['Popular', 'Traditional', 'Dessert', 'Drinks'];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>
          Hey friend!{'\n'}
          <Text style={{ fontWeight: '300' }}>
            What are you cooking today? <Text style={styles.highlight}>cook</Text> today?
          </Text>
        </Text>
        <Ionicons name="notifications-outline" size={24} color="#000" />
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          placeholder="search for recipes you like"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      {/* Ingredients Search Button */}
      <View style={styles.ingredientButtonContainer}>
        <Button
          title="Search by Ingredients"
          onPress={() => navigation.navigate('IngredientSearch')}
          color="#4ad7ed"
        />
      </View>

      <View style={styles.categories}>
        {categories.map(cat => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryBtn,
              selectedCategory === cat && styles.categorySelected
            ]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === cat && styles.categoryTextSelected
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Button title="Shopping List" onPress={() => navigation.navigate('ShoppingList')} />
      <Button title="Profile" onPress={() => navigation.navigate('Profile')} color="#4ad7ed" />



      <Text style={styles.sectionTitle}>Popular Recipes</Text>

      <FlatList
        data={filteredMeals}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.idMeal}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Details', { meal: item })}
          >
            <Image source={{ uri: item.strMealThumb }} style={styles.cardImage} />
            <View style={styles.rating}>
              <Ionicons name="star" color="#FFD700" size={12} />
              <Text style={styles.ratingText}>
                4.{Math.floor(Math.random() * 5) + 1}
              </Text>
            </View>
            <Text style={styles.cardTitle}>{item.strMeal}</Text>
          </TouchableOpacity>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  greeting: { fontSize: 22, fontWeight: 'bold' },
  highlight: { color: '#4ad7ed' },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    marginBottom: 20
  },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1 },
  ingredientButtonContainer: {
    marginBottom: 20,
    alignSelf: 'stretch',
  },
  categories: { flexDirection: 'row', marginBottom: 20 },
  categoryBtn: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 10
  },
  categorySelected: { backgroundColor: '#4ad7ed' },
  categoryText: { color: '#000' },
  categoryTextSelected: { color: '#fff' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  card: { marginRight: 15, width: 150 },
  cardImage: { width: '100%', height: 120, borderRadius: 15 },
  cardTitle: { marginTop: 8, fontWeight: '600' },
  rating: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#fff',
    padding: 4,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  ratingText: { marginLeft: 4, fontSize: 12, fontWeight: 'bold' },
});





