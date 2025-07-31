import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Image,
} from 'react-native';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { theme, shadows } from '../styles/theme';

const { width } = Dimensions.get('window');

const categories = [
  { key: 'all', label: 'All Category' },
  { key: 'travel', label: 'Travel Ticket' },
  { key: 'food', label: 'Food Order' },
  { key: 'health', label: 'Health' },
];

const services = [
  {
    key: 'grocery',
    title: 'Grocery',
    subtitle: 'Shop grocery items',
    icon: <MaterialIcons name="shopping-cart" size={28} color={theme.colors.primary} />,
  },
  {
    key: 'flight',
    title: 'Flight Book',
    subtitle: 'Buy your flight ticket',
    icon: <MaterialCommunityIcons name="airplane" size={28} color={theme.colors.primary} />,
  },
  {
    key: 'food',
    title: 'Food Order',
    subtitle: 'Buy your favorite food',
    icon: <MaterialCommunityIcons name="truck-delivery-outline" size={28} color={theme.colors.primary} />,
  },
  {
    key: 'doctor',
    title: 'Doctor Book',
    subtitle: 'Find a popular physician',
    icon: <MaterialCommunityIcons name="heart-outline" size={28} color={theme.colors.primary} />,
  },
];

const HomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.avatarWrapper}>
            <Image
              source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconCircle}>
              <Ionicons name="notifications-outline" size={20} color={theme.colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconCircle}>
              <Ionicons name="cart-outline" size={20} color={theme.colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconCircle}>
              <Ionicons name="grid-outline" size={20} color={theme.colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.headlineWrapper}>
          <Text style={styles.headlineMain}>BetterAI browse{"\n"}book simplify all</Text>
          <Text style={styles.headlineSub}>in one place</Text>
        </View>
      </View>

      {/* Category Tabs */}
      <View style={styles.tabsRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.key}
              style={[
                styles.tab,
                selectedCategory === cat.key && styles.tabActive,
              ]}
              onPress={() => setSelectedCategory(cat.key)}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedCategory === cat.key && styles.tabTextActive,
                ]}
              >
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Service Cards */}
      <View style={styles.cardsGrid}>
        {services.map((service) => (
          <View key={service.key} style={[styles.card, shadows.medium]}> 
            <View style={styles.cardIcon}>{service.icon}</View>
            <Text style={styles.cardTitle}>{service.title}</Text>
            <Text style={styles.cardSubtitle}>{service.subtitle}</Text>
          </View>
        ))}
      </View>

      {/* Bottom Search Bar */}
      <View style={styles.bottomBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="What do you want?"
          placeholderTextColor={theme.colors.onSurfaceVariant}
        />
        <TouchableOpacity style={styles.micButton}>
          <Ionicons name="mic-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingTop: 56,
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatarWrapper: {
    borderRadius: 20,
    overflow: 'hidden',
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 12,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.surfaceVariant,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  headlineWrapper: {
    marginTop: 24,
    marginBottom: 12,
  },
  headlineMain: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.colors.onBackground,
    lineHeight: 36,
  },
  headlineSub: {
    fontSize: 22,
    color: theme.colors.onSurfaceVariant,
    fontWeight: '600',
    marginTop: 2,
  },
  tabsRow: {
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 8,
    paddingHorizontal: 10,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: 'transparent',
  },
  tabActive: {
    backgroundColor: theme.colors.primary,
  },
  tabText: {
    fontSize: 16,
    color: theme.colors.onSurfaceVariant,
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#fff',
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 8,
    marginBottom: 16,
  },
  card: {
    width: (width - 60) / 2,
    backgroundColor: theme.colors.surface,
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  cardIcon: {
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.onBackground,
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: 13,
    color: theme.colors.onSurfaceVariant,
  },
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  searchInput: {
    flex: 1,
    height: 48,
    backgroundColor: theme.colors.surface,
    borderRadius: 24,
    paddingHorizontal: 20,
    fontSize: 16,
    color: theme.colors.onBackground,
    borderWidth: 1,
    borderColor: theme.colors.outlineVariant,
  },
  micButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
});

export default HomeScreen;