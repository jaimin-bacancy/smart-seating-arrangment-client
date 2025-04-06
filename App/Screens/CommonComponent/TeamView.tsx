import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppContext } from '@AppContext';
import { CustomText } from './CustomText';

type Team = {
  name: string;
  color: string;
};

const TeamView = ({ onClusterPress }: { onClusterPress?: () => void }) => {
  const { appTheme } = useAppContext();

  const teams: Team[] = [
    { name: 'Occupied', color: appTheme.themeColor },
    { name: 'Available', color: appTheme.gray },
    { name: 'Hybrid', color: '#B28DFF' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: appTheme.card }]}>
      <CustomText style={styles.header}>Teams</CustomText>

      <View style={styles.legendWrapper}>
        {teams.map((team, index) => (
          <View key={index} style={styles.legendRow}>
            <View style={[styles.dot, { backgroundColor: team.color }]} />
            <CustomText style={styles.label}>{team.name}</CustomText>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={styles.clusterButton}
        onPress={onClusterPress}
        activeOpacity={0.8}>
        <View style={styles.aiBadge}>
          <CustomText style={styles.aiText}>AI</CustomText>
        </View>
        <CustomText style={styles.buttonText}>
          Show AI-Optimized Clusters
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};

export { TeamView };

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 16,
    marginVertical: 10,
    elevation: 4,
  },
  header: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  legendWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: 10,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  label: {},
  clusterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#6C63FF',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#EEF1FF',
  },
  aiBadge: {
    backgroundColor: '#6C63FF',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
  },
  aiText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6C63FF',
  },
});
