# TaskFlow Mobile App

A beautiful and modern task management mobile app built with React Native and Expo.

## Features

✨ **Modern UI/UX Design**
- Material Design 3 components
- Beautiful gradients and animations
- Dark/Light theme support
- Responsive design for all screen sizes

📱 **Task Management**
- Create, edit, and delete tasks
- Set task priorities (Low, Medium, High)
- Mark tasks as complete
- Filter tasks by status
- Task statistics dashboard

🏠 **Dashboard Overview**
- Quick task statistics
- Motivational messages
- Quick action buttons
- Beautiful data visualization

⚙️ **Settings & Customization**
- User preferences
- Data management
- Export/Import functionality
- App information

## Tech Stack

- **React Native** - Cross-platform mobile development
- **Expo** - Development platform and tools
- **React Navigation** - Navigation library
- **React Native Paper** - Material Design components
- **AsyncStorage** - Local data persistence
- **Vector Icons** - Beautiful icons throughout the app

## Installation & Setup

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (for iOS development) or Android Studio (for Android development)

### Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd taskflow-mobile
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   expo start
   ```

4. **Run on device/emulator**
   - **iOS**: Press `i` in the terminal or click "Run on iOS simulator"
   - **Android**: Press `a` in the terminal or click "Run on Android device/emulator"
   - **Web**: Press `w` in the terminal or click "Run in web browser"

## Project Structure

```
taskflow-mobile/
├── App.js                 # Main app component with navigation
├── app.json              # Expo configuration
├── babel.config.js       # Babel configuration
├── package.json          # Dependencies and scripts
├── src/
│   ├── screens/          # Screen components
│   │   ├── HomeScreen.js     # Dashboard screen
│   │   ├── TasksScreen.js    # Task management screen
│   │   └── SettingsScreen.js # Settings screen
│   ├── styles/           # Theme and styling
│   │   └── theme.js          # App theme configuration
│   └── utils/            # Utility functions
│       └── taskStorage.js    # AsyncStorage functions
└── assets/               # Images, icons, fonts
```

## Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS simulator
- `npm run web` - Run in web browser
- `npm run build` - Build for production
- `npm run publish` - Publish to Expo

## Features Overview

### Home Screen (Dashboard)
- Welcome message with user greeting
- Task statistics cards showing:
  - Total tasks
  - Completed tasks
  - Pending tasks
  - Overdue tasks
- Quick action buttons
- Motivational content

### Tasks Screen
- Complete task management interface
- Add new tasks with title, description, and priority
- Edit existing tasks
- Mark tasks as complete/incomplete
- Delete tasks with confirmation
- Filter tasks by status (All, Pending, Completed)
- Beautiful empty states

### Settings Screen
- User profile section
- App preferences (notifications, dark mode, auto-delete)
- Data management (export, import, clear all)
- About section with app information

## Data Storage

The app uses AsyncStorage for local data persistence. All tasks are stored locally on the device and persist between app sessions.

## Customization

### Theme
The app uses a custom theme based on Material Design 3. You can modify colors, fonts, and other design tokens in `src/styles/theme.js`.

### Components
All screens are built with React Native Paper components for consistency and accessibility.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have questions, please file an issue on the GitHub repository.

---

**Made with ❤️ by TaskFlow Team**