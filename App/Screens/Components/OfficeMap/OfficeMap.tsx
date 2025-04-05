import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  BottomModalContainer,
  CustomText,
  FloorPicker,
  TeamView,
} from '@CommonComponent';

const TOTAL_SEATS = 72;
const SEATS_PER_DESK = 12; // 6 + 6
const DESKS = TOTAL_SEATS / SEATS_PER_DESK;

const generateDesks = () => {
  const desks = [];
  let seatNum = 1;
  for (let d = 0; d < DESKS; d++) {
    const topRow = [];
    const bottomRow = [];
    for (let i = 0; i < 6; i++) {
      topRow.push({ id: seatNum, available: false });
      seatNum++;
    }
    for (let i = 0; i < 6; i++) {
      bottomRow.push({ id: seatNum, available: true });
      seatNum++;
    }
    desks.push({ topRow, bottomRow });
  }
  return desks;
};

export default function App() {
  const desks = generateDesks();
  const [isShowModal, setShowModal] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState('Floor 2');

  const handleSeatPress = (seat) => {
    setSelectedSeat(seat);
    setShowModal(true);
  };

  const RenderLayout = (desk) => {
    return desks.map((desk, index) => (
      <View key={index} style={styles.deskBlock}>
        <View style={styles.row}>
          {desk.topRow.map((seat) => (
            <TouchableOpacity
              key={seat.id}
              style={[
                styles.seat,
                seat.available ? styles.seatAvailable : styles.seatOccupied,
              ]}
              onPress={() => handleSeatPress(seat)}>
              <CustomText style={styles.seatLabel}>{seat.id}</CustomText>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          {desk.bottomRow.map((seat) => (
            <TouchableOpacity
              key={seat.id}
              style={[
                styles.seat,
                seat.available ? styles.seatAvailable : styles.seatOccupied,
              ]}
              onPress={() => handleSeatPress(seat)}>
              <CustomText style={styles.seatLabel}>{seat.id}</CustomText>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.passage} />
      </View>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomText style={styles.title}>SEATING MAP</CustomText>

      <ScrollView
        keyboardShouldPersistTaps="never"
        contentContainerStyle={styles.scrollArea}>

        <View style={styles.floorPickerContainer}>
          <CustomText style={styles.floorPickerText}>Select Floor</CustomText>
          <FloorPicker
            selectedFloor={selectedFloor}
            onChangeFloor={(val) => {
              console.log('Selected Floor:', val);
              setSelectedFloor(val);
            }}
          />
        </View>

        <View style={styles.mapContainer}>
          <RenderLayout desks={desks} />
        </View>

        <TeamView
          onClusterPress={() => {
            console.log('AI-Optimized Clusters Pressed');
          }}
        />

        <View style={styles.bottomSpacing} />
      </ScrollView>

      <BottomModalContainer
        title={`Seat #${selectedSeat?.id}`}
        onClose={() => setShowModal(false)}
        show={isShowModal}>
        <CustomText large>
          Status: {selectedSeat?.available ? '✅ Available' : '❌ Occupied'}
        </CustomText>
        <View style={styles.modalSpacing} />
      </BottomModalContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    alignItems: 'center',
  },
  title: {
    color: '#000',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  floorPickerText: {
    color: '#000',
    fontSize: 16,
    textAlign: 'center',
  },
  scrollArea: {
    paddingBottom: 100,
    alignItems: 'center',
  },
  deskBlock: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
  },
  seat: {
    width: 40,
    height: 30,
    borderRadius: 8,
    marginHorizontal: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  seatAvailable: {
    backgroundColor: '#90D5FF',
  },
  seatOccupied: {
    backgroundColor: 'grey',
  },
  seatLabel: {
    color: '#fff',
    fontWeight: 'bold',
  },
  divider: {
    height: 2,
    backgroundColor: 'orange',
    marginVertical: 6,
    borderRadius: 2,
  },
  passage: {
    height: 10,
  },
  floorPickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    padding: 20,
    borderRadius: 20,
    width: '90%',
    marginBottom: 10,
  },
  mapContainer: {
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    padding: 20,
    borderRadius: 20,
    width: '90%',
  },
  bottomSpacing: {
    height: 100,
  },
  modalSpacing: {
    height: 50,
  },
});
