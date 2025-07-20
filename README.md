# 🍳 RecipeApp

A beginner-friendly React Native cooking app built with Expo. Discover recipes, organize groceries, customize your profile, and enjoy seamless light/dark mode transitions.

## Features

- **Category-Based Browsing**: Explore meals in *Popular*, *Traditional*, *Dessert*, and *Drinks* categories, powered by TheMealDB API.
- **Search & Filters**: Search recipes by name and filter results in real-time.
- **Recipe Details**: View rich recipe content including images and instructions.
- **Ingredient Search**: Find recipes by selecting ingredients you have at home.
- **Shopping List**: Add items to a persistent list with swipe-to-delete gestures.
- **User Profile**: Upload a profile picture, set name/email, and toggle dark mode.
- **Dark Mode Support**: Theme toggles dynamically and persists user preference.
- **Smooth Animations**: Enhanced UI/UX with Reanimated and LayoutAnimation.

## Tech Stack

- **React Native** + **Expo**
- Navigation: **React Navigation** (Stack + Tab)
- Gestures: **react-native-gesture-handler**
- Animations: **Reanimated**, **LayoutAnimation**
- Data Storage: **AsyncStorage**
- APIs: TheMealDB (free recipe database)
- File Picker: **expo-image-picker**
- Theming: **React Context + Navigation themes**

## Getting Started

### Prerequisites

- **Node.js** (v18 recommended)
- **Expo CLI**

### Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/your-username/RecipeApp.git
   cd RecipeApp
