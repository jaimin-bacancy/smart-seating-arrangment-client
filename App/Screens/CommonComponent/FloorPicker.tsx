import React, { useState } from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
  Platform,
} from 'react-native';

const FloorPicker = ({
  selectedFloor,
  onChangeFloor,
}: {
  selectedFloor: string;
  onChangeFloor: (value: string) => void;
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const buildings = ['15', '16'];
  const floors = ['01', '02', '03', '04'];

  const floorOptions = buildings.flatMap(building =>
    floors.map(floor => `${building}${floor}`),
  );

  const handleSelect = (floor: string) => {
    onChangeFloor(floor);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Trigger Button */}
      <TouchableOpacity
        style={styles.selectorButton}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.selectorText}>Floor {selectedFloor}</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}>
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Floor</Text>
            <FlatList
              data={floorOptions}
              keyExtractor={item => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.floorOption}
                  onPress={() => handleSelect(item)}>
                  <Text style={styles.optionText}>Floor {item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 10,
    width: '50%',
  },
  selectorButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    backgroundColor: '#f9f9f9',
  },
  selectorText: {
    fontSize: 16,
    color: '#333',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContent: {
    marginHorizontal: 40,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  floorOption: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    fontSize: 16,
    color: '#444',
  },
});

export { FloorPicker };
