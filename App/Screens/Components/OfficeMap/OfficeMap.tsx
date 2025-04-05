import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import {
  BottomModalContainer,
  CustomText,
  FloorPicker,
  Layout,
  TeamView,
} from '@CommonComponent';
import { ScrollView } from 'react-native-gesture-handler';
import { useAppContext } from '@AppContext';

const rooms = [
  {
    id: 1,
    room: '1501',
    seats: 72,
  },
  {
    id: 2,
    room: '1502',
    seats: 72,
  },
  {
    id: 3,
    room: '1503',
    seats: 72,
  },
  {
    id: 4,
    room: '1504',
    seats: 72,
  },
  {
    id: 5,
    room: '1601',
    seats: 72,
  },
  {
    id: 6,
    room: '1602',
    seats: 72,
  },
  {
    id: 8,
    room: '1603',
    seats: 72,
  },
  {
    id: 7,
    room: '1604',
    seats: 72,
  },
];

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
  const { appTheme } = useAppContext();
  const desks = generateDesks();
  const [isShowModal, setShowModal] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [selectedFloorId, setSelectedFloorId] = useState(3);

  const handleSeatPress = seat => {
    setSelectedSeat(seat);
    setShowModal(true);
  };

  const RenderLayout = () => {
    return desks.map((desk, index) => (
      <View key={index} style={styles.deskBlock}>
        <View style={styles.row}>
          {desk.topRow.map(seat => (
            <TouchableOpacity
              key={seat.id}
              style={[
                styles.seat,
                {
                  backgroundColor: seat.available
                    ? appTheme.card
                    : appTheme.themeColor,
                },
              ]}
              onPress={() => handleSeatPress(seat)}>
              <CustomText
                style={[
                  styles.seatLabel,
                  {
                    color: seat.available ? appTheme.text : appTheme.background,
                  },
                ]}>
                {seat.id}
              </CustomText>
            </TouchableOpacity>
          ))}
        </View>
        <View
          style={[
            styles.divider,
            {
              backgroundColor: appTheme.textBorder,
              borderColor: appTheme.gray,
            },
          ]}
        />
        <View style={styles.row}>
          {desk.bottomRow.map(seat => (
            <TouchableOpacity
              key={seat.id}
              style={[
                styles.seat,
                {
                  backgroundColor: seat.available
                    ? appTheme.border
                    : appTheme.themeColor,
                },
              ]}
              onPress={() => handleSeatPress(seat)}>
              <CustomText
                style={[
                  styles.seatLabel,
                  {
                    color: seat.available
                      ? appTheme.lightText
                      : appTheme.background,
                  },
                ]}>
                {seat.id}
              </CustomText>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.passage} />
      </View>
    ));
  };

  return (
    <Layout padding={20} scrollable>
      <View style={{ gap: 10 }}>
        <CustomText
          style={{ textAlign: 'center', color: appTheme.themeColor }}
          large>
          Select Floor
        </CustomText>
        <View style={[styles.floorPickerContainer]}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {rooms.map(room => (
              <Pressable
                onPress={() => setSelectedFloorId(room.id)}
                key={room.id}
                style={{
                  borderWidth: selectedFloorId === room.id ? 1 : 0.5,
                  borderColor:
                    selectedFloorId === room.id
                      ? appTheme.themeColor
                      : appTheme.gray,
                  backgroundColor:
                    selectedFloorId === room.id
                      ? appTheme.themeColor
                      : appTheme.card,

                  paddingVertical: 5,
                  borderRadius: 5,
                  paddingHorizontal: 10,
                  marginHorizontal: 5,
                }}>
                <CustomText
                  small
                  style={{
                    color:
                      selectedFloorId === room.id
                        ? appTheme.background
                        : appTheme.text,
                    fontWeight: selectedFloorId === room.id ? 'bold' : 'normal',
                  }}>
                  {room.room}
                </CustomText>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </View>

      <View style={{ height: 10 }} />

      <View style={[styles.mapContainer, { backgroundColor: appTheme.card }]}>
        <RenderLayout desks={desks} />
      </View>

      <TeamView
        onClusterPress={() => {
          console.log('AI-Optimized Clusters Pressed');
        }}
      />

      <BottomModalContainer
        title={`Seat #${selectedSeat?.id}`}
        onClose={() => setShowModal(false)}
        show={isShowModal}>
        <CustomText large>
          Status: {selectedSeat?.available ? '✅ Available' : '❌ Occupied'}
        </CustomText>
        <View style={styles.modalSpacing} />
      </BottomModalContainer>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontSize: 16,
  },
  scrollArea: {
    paddingBottom: 100,
    alignItems: 'center',
  },
  deskBlock: {
    margin: 10,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
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
    // height: 2,
    marginVertical: 6,
    borderRadius: 2,
    borderStyle: 'dashed',

    borderWidth: 0.5,
  },
  passage: {
    height: 10,
  },
  floorPickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  mapContainer: {
    alignItems: 'center',
    borderRadius: 20,
    padding: 10,
  },
  bottomSpacing: {
    height: 100,
  },
  modalSpacing: {
    height: 50,
  },
});
