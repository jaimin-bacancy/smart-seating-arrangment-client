import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type Team = {
  name: string;
  color: string;
};

const teams: Team[] = [
  { name: 'Engineering', color: '#6C63FF' },
  { name: 'Design', color: '#63C174' },
  { name: 'Product', color: '#B28DFF' },
  { name: 'Marketing', color: '#F4A261' },
  { name: 'Finance', color: '#4DB6AC' },
];

const TeamView = ({
  onClusterPress,
}: {
  onClusterPress?: () => void;
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Teams</Text>

      <View style={styles.legendWrapper}>
        {teams.map((team, index) => (
          <View key={index} style={styles.legendRow}>
            <View style={[styles.dot, { backgroundColor: team.color }]} />
            <Text style={styles.label}>{team.name}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={styles.clusterButton}
        onPress={onClusterPress}
        activeOpacity={0.8}>
        <View style={styles.aiBadge}>
          <Text style={styles.aiText}>AI</Text>
        </View>
        <Text style={styles.buttonText}>Show AI-Optimized Clusters</Text>
      </TouchableOpacity>
    </View>
  );
};

export {TeamView};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#f2f2f2',
    margin: 16,
    elevation: 4,
  },
  header: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    color: '#000',
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
  label: {
    fontSize: 16,
    color: '#333',
  },
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
