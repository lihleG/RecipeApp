import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, Button,
  StyleSheet, FlatList, TouchableOpacity,
  LayoutAnimation, Platform, UIManager
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swipeable from 'react-native-gesture-handler/Swipeable'; // ✅ Correct import

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

export default function ShoppingListScreen() {
  const [item, setItem] = useState('');
  const [list, setList] = useState([]);

  useEffect(() => {
    loadList();
  }, []);

  const loadList = async () => {
    const data = await AsyncStorage.getItem('SHOPPING_LIST');
    setList(data ? JSON.parse(data) : []);
  };

  const saveList = async newList => {
    setList(newList);
    await AsyncStorage.setItem('SHOPPING_LIST', JSON.stringify(newList));
  };

  const addItem = () => {
    if (item.trim()) {
      const newList = [item.trim(), ...list]; // ✅ Fixed syntax
      saveList(newList);
      setItem('');
    }
  };

  const deleteItem = idx => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const newList = [...list];
    newList.splice(idx, 1);
    saveList(newList);
  };

  const renderRight = idx => (
    <TouchableOpacity style={styles.deleteBtn} onPress={() => deleteItem(idx)}>
      <Text style={styles.deleteText}>Delete</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Shopping List</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Add item"
          value={item}
          onChangeText={setItem}
        />
        <Button title="Add" onPress={addItem} />
      </View>

      <FlatList
        data={list}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => (
          <Swipeable renderRightActions={() => renderRight(index)}>
            <View style={styles.itemRow}>
              <Text>{item}</Text>
            </View>
          </Swipeable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center'
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginRight: 8
  },
  itemRow: {
    padding: 12,
    backgroundColor: '#fafafa',
    marginBottom: 4,
    borderRadius: 6
  },
  deleteBtn: {
    backgroundColor: '#f44336',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%'
  },
  deleteText: { color: '#fff', fontWeight: 'bold' },
});
