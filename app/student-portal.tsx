import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';
import {
  FileText,
  Calendar,
  Users,
  GraduationCap,
  PieChart,
  Calculator,
  FolderOpen,
  FileCheck,
  CreditCard,
  Utensils,
  Grid3X3,
  Home,
  User,
} from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

const StudentPortalApp = () => {
  const [currentView, setCurrentView] = useState('home');

  const services = [
    { icon: FileText, label: 'Discharge', color: '#14B8A6' },
    { icon: Calendar, label: 'Timetable', color: '#14B8A6' },
    { icon: Users, label: 'Group and Section', color: '#0F766E' },
    { icon: Calendar, label: 'Exams Schedule', color: '#0F766E' },
    { icon: GraduationCap, label: 'Exam Grades', color: '#0F766E' },
    { icon: FileCheck, label: 'Assessment', color: '#0F766E' },
    { icon: PieChart, label: 'Percentage (%)', color: '#0D544D' },
    { icon: FolderOpen, label: 'Academic transcripts', color: '#0D544D' },
    { icon: Calculator, label: 'Debts', color: '#0D544D' },
    { icon: FileText, label: 'Academic vacation', color: '#0D544D' },
    { icon: CreditCard, label: 'Enrollments', color: '#0A3A35' },
    { icon: Utensils, label: 'Restauration', color: '#0A3A35' },
    { icon: Grid3X3, label: 'Other services', color: '#0A3A35', fullWidth: true },
  ];

  const HomeView = () => (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Title and Profile */}
        <View style={styles.header}>
          <Text style={styles.title}>Student Portal</Text>
          <View style={styles.profileContainer}>
            <View style={styles.profileImage} />
          </View>
        </View>

        {/* PROGRES Header */}
        <View style={styles.progresHeader} className='overflow-hidden relative justify-center items-center'>
          <Image 
            source={require('../assets/topcbg.jpg')}
            
            className='absolute w-full h-full cover-fill'/>

          <Image source={require('../assets/assets_images_progres2.png')} className='h-12 w-28' />
        </View>

        {/* Services Grid */}
        <View style={styles.servicesContainer}>
          <View style={styles.servicesGrid}>
            {services
              .filter((service) => !service.fullWidth)
              .map((service, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.serviceButton, { backgroundColor: '#0F766E' }]}
                  activeOpacity={0.9}>
                  <service.icon size={24} color="white" />
                  <Text style={styles.serviceLabel}>{service.label}</Text>
                </TouchableOpacity>
              ))}
          </View>

          {/* Full Width Service */}
          <TouchableOpacity
            style={[styles.fullWidthService, { backgroundColor: '#0F766E' }]}
            activeOpacity={0.8}>
            <Grid3X3 size={24} color="white" />
            <Text style={styles.serviceLabel}>Other services</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavContainer}>
        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={[styles.navButton, currentView === 'home' && styles.activeNavButton]}
            onPress={() => setCurrentView('home')}>
            <Home size={20} color={currentView === 'home' ? 'white' : '#64748B'} />
            <Text style={[styles.navLabel, currentView === 'home' && styles.activeNavLabel]}>
              Home
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navButton, currentView === 'card' && styles.activeNavButton]}
            onPress={() => setCurrentView('card')}>
            <CreditCard size={20} color={currentView === 'card' ? 'white' : '#64748B'} />
            <Text style={[styles.navLabel, currentView === 'card' && styles.activeNavLabel]}>
              Cards
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navButton}>
            <User size={20} color="#64748B" />
            <Text style={styles.navLabel}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );

  const CardView = () => (
    <SafeAreaView style={styles.container}>
      <View style={styles.cardViewContainer}>
        {/* Card Holder */}
        <View style={styles.cardHolder}>
          <Text style={styles.cardHolderText}>Student ID Card</Text>
          <Text style={styles.cardHolderSubtext}>Place your card here</Text>
          <View style={styles.cardSlot}>
            <View style={styles.cardOutline} />
          </View>
        </View>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavContainer}>
        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={[styles.navButton, currentView === 'home' && styles.activeNavButton]}
            onPress={() => setCurrentView('home')}>
            <Home size={20} color={currentView === 'home' ? 'white' : '#64748B'} />
            <Text style={[styles.navLabel, currentView === 'home' && styles.activeNavLabel]}>
              Home
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navButton, currentView === 'card' && styles.activeNavButton]}
            onPress={() => setCurrentView('card')}>
            <CreditCard size={20} color={currentView === 'card' ? 'white' : '#64748B'} />
            <Text style={[styles.navLabel, currentView === 'card' && styles.activeNavLabel]}>
              Cards
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navButton}>
            <User size={20} color="#64748B" />
            <Text style={styles.navLabel}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );

  return currentView === 'home' ? <HomeView /> : <CardView />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // Space for bottom navigation
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  profileContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#D1D5DB',
    borderRadius: 20,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    backgroundColor: '#9CA3AF',
  },
  progresHeader: {
    marginHorizontal: 16,
    marginBottom: 24,
    backgroundColor: '#14B8A6',
    borderRadius: 16,
    padding: 24,
  },
  progresContent: {
    alignItems: 'center',
  },
  progresTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  progresArabic: {
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
    marginBottom: 2,
  },
  progresFrench: {
    fontSize: 12,
    color: 'white',
    opacity: 0.8,
    textAlign: 'center',
    marginBottom: 8,
  },
  flagContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 2,
    overflow: 'hidden',
    width: 24,
    height: 16,
  },
  flagGreen: {
    flex: 1,
    backgroundColor: '#10B981',
  },
  flagRed: {
    flex: 1,
    backgroundColor: '#EF4444',
  },
  servicesContainer: {
    paddingHorizontal: 16,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  serviceButton: {
    width: (width - 48) / 2,
    minHeight: 100,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    padding: 16,
  },
  serviceLabel: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 8,
  },
  fullWidthService: {
    width: '100%',
    minHeight: 100,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  cardViewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  cardHolder: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    width: width - 32,
  },
  cardHolderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  cardHolderSubtext: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
  },
  cardSlot: {
    width: 200,
    height: 120,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderStyle: 'dashed',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardOutline: {
    width: 160,
    height: 80,
    borderWidth: 1,
    borderColor: '#9CA3AF',
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
  },
  bottomNavContainer: {
    position: 'absolute',
    bottom: 30,
    left: 16,
    right: 16,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  activeNavButton: {
    backgroundColor: '#14B8A6',
  },
  navLabel: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
  },
  activeNavLabel: {
    color: 'white',
  },
});

export default StudentPortalApp;
