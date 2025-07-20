import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function DetailScreen({ route, navigation }) {
    const { meal } = route.params;

    return (
        <ScrollView style={StyleSheet.container}>
        <Image source={{ uri: meal.strMealThumb }} style={styles.image} />

        <View style={styles.TopIcons}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="bookmark-outline" size={24} color="#000" />
        </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
        <Text style={styles.title}>{meal.strMeal}</Text>
        <View style={styles.badge}>
          <Ionicons name="star" size={14} color="#FFD700" />
          <Text style={styles.badgeText}>4.7</Text>
        </View>

        <View style={styles.detailsRow}>
          <Text>Duration: 45 mins</Text>
          <Text>Serving: 3</Text>
        </View>
        <View style={styles.detailsRow}>
          <Text>Calories: 125kcal</Text>
          <Text>Difficulty: Medium</Text>
        </View>

        <Text style={styles.subTitle}>Ingredients:</Text>
        <Text>{meal.strIngredient1}, {meal.strIngredient2}, {meal.strIngredient3}, ...</Text>

        <Text style={styles.subTitle}>Directions:</Text>
        <Text>{meal.strInstructions}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  image: { width: '100%', height: 250, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  topIcons: { position: 'absolute', top: 40, width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 },
  iconBtn: { backgroundColor: '#fff', padding: 8, borderRadius: 50 },
  infoContainer: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold' },
  badge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff8dc', padding: 6, borderRadius: 8, alignSelf: 'flex-start', marginVertical: 10 },
  badgeText: { marginLeft: 5, fontWeight: 'bold' },
  detailsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  subTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 15, marginBottom: 5 },
});



