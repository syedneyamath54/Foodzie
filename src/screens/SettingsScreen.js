import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import {
  List,
  Switch,
  Card,
  Text,
  Button,
  Avatar,
  Divider,
  Surface,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { theme, shadows } from '../styles/theme';
import { clearAllTasks } from '../utils/taskStorage';

const SettingsScreen = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoDelete, setAutoDelete] = useState(false);

  const handleClearAllTasks = () => {
    Alert.alert(
      'Clear All Tasks',
      'This will permanently delete all your tasks. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: async () => {
            await clearAllTasks();
            Alert.alert('Success', 'All tasks have been cleared.');
          },
        },
      ]
    );
  };

  const handleExportData = () => {
    Alert.alert('Export Data', 'This feature will be available in a future update.');
  };

  const handleImportData = () => {
    Alert.alert('Import Data', 'This feature will be available in a future update.');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Surface style={[shadows.medium, {margin: 20}]}> 
        <View style={[styles.profileCard, {overflow: 'hidden', borderRadius: 16, backgroundColor: theme.colors.surface}]}> 
          <View style={styles.profileContent}>
            <Avatar.Icon 
              size={64} 
              icon="account" 
              style={styles.avatar}
            />
            <Text style={styles.profileName}>TaskFlow User</Text>
            <Text style={styles.profileEmail}>user@taskflow.app</Text>
          </View>
        </View>
      </Surface>

      <Card style={[styles.section, shadows.small]}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Preferences</Text>
          
          <List.Item
            title="Push Notifications"
            description="Get notified about task deadlines"
            left={(props) => <List.Icon {...props} icon="bell-outline" />}
            right={() => (
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                color={theme.colors.primary}
              />
            )}
          />
          
          <Divider />
          
          <List.Item
            title="Dark Mode"
            description="Use dark theme throughout the app"
            left={(props) => <List.Icon {...props} icon="moon-outline" />}
            right={() => (
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                color={theme.colors.primary}
              />
            )}
          />
          
          <Divider />
          
          <List.Item
            title="Auto-delete completed tasks"
            description="Automatically remove completed tasks after 7 days"
            left={(props) => <List.Icon {...props} icon="trash-outline" />}
            right={() => (
              <Switch
                value={autoDelete}
                onValueChange={setAutoDelete}
                color={theme.colors.primary}
              />
            )}
          />
        </Card.Content>
      </Card>

      <Card style={[styles.section, shadows.small]}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Data Management</Text>
          
          <List.Item
            title="Export Tasks"
            description="Save your tasks to a file"
            left={(props) => <List.Icon {...props} icon="download-outline" />}
            onPress={handleExportData}
          />
          
          <Divider />
          
          <List.Item
            title="Import Tasks"
            description="Load tasks from a backup file"
            left={(props) => <List.Icon {...props} icon="cloud-upload-outline" />}
            onPress={handleImportData}
          />
          
          <Divider />
          
          <List.Item
            title="Clear All Tasks"
            description="Delete all tasks permanently"
            left={(props) => <List.Icon {...props} icon="trash-outline" color={theme.colors.error} />}
            onPress={handleClearAllTasks}
            titleStyle={{ color: theme.colors.error }}
          />
        </Card.Content>
      </Card>

      <Card style={[styles.section, shadows.small]}>
        <Card.Content>
          <Text style={styles.sectionTitle}>About</Text>
          
          <List.Item
            title="Version"
            description="1.0.0"
            left={(props) => <List.Icon {...props} icon="information-outline" />}
          />
          
          <Divider />
          
          <List.Item
            title="Rate App"
            description="Share your feedback on the app store"
            left={(props) => <List.Icon {...props} icon="star-outline" />}
            onPress={() => Alert.alert('Rate App', 'Thank you for using TaskFlow!')}
          />
          
          <Divider />
          
          <List.Item
            title="Privacy Policy"
            description="Learn how we protect your data"
            left={(props) => <List.Icon {...props} icon="shield-outline" />}
            onPress={() => Alert.alert('Privacy Policy', 'Your privacy is important to us.')}
          />
          
          <Divider />
          
          <List.Item
            title="Terms of Service"
            description="Read our terms and conditions"
            left={(props) => <List.Icon {...props} icon="document-text-outline" />}
            onPress={() => Alert.alert('Terms of Service', 'Please read our terms carefully.')}
          />
        </Card.Content>
      </Card>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Made with ❤️ by TaskFlow Team
        </Text>
        <Text style={styles.footerText}>
          © 2024 TaskFlow. All rights reserved.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  profileCard: {
    margin: 20,
    borderRadius: 16,
    backgroundColor: theme.colors.surface,
  },
  profileContent: {
    alignItems: 'center',
    padding: 24,
  },
  avatar: {
    backgroundColor: theme.colors.primary,
    marginBottom: 12,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.onSurface,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.onSurface,
    marginBottom: 8,
  },
  footer: {
    alignItems: 'center',
    padding: 24,
    marginTop: 20,
  },
  footerText: {
    fontSize: 12,
    color: theme.colors.onSurfaceVariant,
    marginBottom: 4,
  },
});

export default SettingsScreen;