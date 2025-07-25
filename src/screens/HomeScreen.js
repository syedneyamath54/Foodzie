import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Button,
  Surface,
  Text,
  IconButton,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { theme, shadows } from '../styles/theme';
import { getTaskStats } from '../utils/taskStorage';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    overdue: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      const taskStats = await getTaskStats();
      setStats(taskStats);
    };

    const unsubscribe = navigation.addListener('focus', () => {
      loadStats();
    });

    loadStats();
    return unsubscribe;
  }, [navigation]);

  const StatCard = ({ title, value, icon, color, gradient }) => (
    <Surface style={[styles.statCard, shadows.medium]}>
      <LinearGradient
        colors={gradient}
        style={styles.gradientCard}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.statCardContent}>
          <View style={styles.statIcon}>
            <Ionicons name={icon} size={24} color="#ffffff" />
          </View>
          <Text style={styles.statValue}>{value}</Text>
          <Text style={styles.statTitle}>{title}</Text>
        </View>
      </LinearGradient>
    </Surface>
  );

  const QuickAction = ({ title, icon, onPress, color }) => (
    <Surface style={[styles.actionCard, shadows.small]}>
      <Button
        mode="contained"
        onPress={onPress}
        contentStyle={styles.actionButton}
        buttonColor={color}
        style={styles.actionButtonStyle}
      >
        <View style={styles.actionContent}>
          <Ionicons name={icon} size={20} color="#ffffff" />
          <Text style={styles.actionText}>{title}</Text>
        </View>
      </Button>
    </Surface>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.secondary]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <Text style={styles.greeting}>Welcome back!</Text>
          <Text style={styles.subtitle}>Let's get things done today</Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Overview</Text>
        
        <View style={styles.statsContainer}>
          <StatCard
            title="Total Tasks"
            value={stats.total}
            icon="list"
            gradient={[theme.colors.primary, '#8b5cf6']}
          />
          <StatCard
            title="Completed"
            value={stats.completed}
            icon="checkmark-circle"
            gradient={[theme.colors.success, '#059669']}
          />
          <StatCard
            title="Pending"
            value={stats.pending}
            icon="time"
            gradient={[theme.colors.warning, '#d97706']}
          />
          <StatCard
            title="Overdue"
            value={stats.overdue}
            icon="alert-circle"
            gradient={[theme.colors.error, '#dc2626']}
          />
        </View>

        <Text style={styles.sectionTitle}>Quick Actions</Text>
        
        <View style={styles.actionsContainer}>
          <QuickAction
            title="Add Task"
            icon="add"
            color={theme.colors.primary}
            onPress={() => navigation.navigate('Tasks')}
          />
          <QuickAction
            title="View All"
            icon="list-outline"
            color={theme.colors.secondary}
            onPress={() => navigation.navigate('Tasks')}
          />
        </View>

        <Card style={[styles.motivationCard, shadows.medium]}>
          <Card.Content>
            <Title style={styles.motivationTitle}>💪 Keep Going!</Title>
            <Paragraph style={styles.motivationText}>
              {stats.completed > 0 
                ? `Great job! You've completed ${stats.completed} task${stats.completed === 1 ? '' : 's'} today.`
                : "Ready to tackle your tasks? Let's start with something small!"
              }
            </Paragraph>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    height: 160,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#e5e7eb',
    textAlign: 'center',
  },
  content: {
    padding: 20,
    marginTop: -30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.onBackground,
    marginBottom: 16,
    marginTop: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    width: (width - 60) / 2,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  gradientCard: {
    padding: 20,
    borderRadius: 16,
  },
  statCardContent: {
    alignItems: 'center',
  },
  statIcon: {
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 14,
    color: '#e5e7eb',
    textAlign: 'center',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionCard: {
    flex: 0.48,
    borderRadius: 12,
    overflow: 'hidden',
  },
  actionButton: {
    height: 60,
  },
  actionButtonStyle: {
    borderRadius: 12,
  },
  actionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  motivationCard: {
    marginBottom: 20,
    borderRadius: 16,
  },
  motivationTitle: {
    color: theme.colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  motivationText: {
    color: theme.colors.onSurfaceVariant,
    lineHeight: 20,
  },
});

export default HomeScreen;