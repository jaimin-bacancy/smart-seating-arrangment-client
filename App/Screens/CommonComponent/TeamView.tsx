import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppContext } from '@AppContext';

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

const TeamView = ({ onClusterPress }: { onClusterPress?: () => void }) => {
  const { appTheme } = useAppContext();
  return (
    <View style={[styles.container, { backgroundColor: appTheme.card }]}>
      <Text style={[styles.header, { color: appTheme.text }]}>Teams</Text>

      <View style={styles.legendWrapper}>
        {teams.map((team, index) => (
          <View key={index} style={styles.legendRow}>
            <View style={[styles.dot, { backgroundColor: team.color }]} />
            <Text style={[styles.label, { color: appTheme.text }]}>
              {team.name}
            </Text>
          </View>
        ))}
      </View>
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
  },
});
