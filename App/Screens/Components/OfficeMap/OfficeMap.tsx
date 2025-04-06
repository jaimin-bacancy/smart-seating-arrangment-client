import React, { useEffect, useState, useCallback } from 'react';
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
import firestore, { getDoc } from '@react-native-firebase/firestore';
import { get } from 'axios';
import { useGetDoc } from '../../../Hooks/useGetDoc';
import { firebase } from '@react-native-firebase/auth';

interface Seat {
  id: string;
  status: 'available' | 'occupied';
  label: string;
  type: string;
  zoneId: any;
  floorName: string;
  floorId: any;
  lastModified: any;
}

interface Floor {
  id: string;
  name: string;
}

export default function App() {
  const { appTheme } = useAppContext();
  const [isShowModal, setShowModal] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>();
  const [selectedFloorId, setSelectedFloorId] = useState<string>();

  const [seatData, setSeatData] = useState<Seat[]>([]);
  const [floorList, setFloorList] = useState<Floor[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getFloorList = useCallback(async () => {
    try {
      setIsLoading(true);
      const snapshot = await firestore().collection('floors').get();
      const floors = snapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name || '',
        ...doc.data(),
      })) as Floor[];
      setFloorList(floors);
      if (!selectedFloorId && floors.length > 0) {
        setSelectedFloorId(floors[0].id);
      }
      return floors;
    } catch (error) {
      console.error('Error getting documents: ', error);
    } finally {
      setIsLoading(false);
    }
  }, [selectedFloorId]);

  useEffect(() => {
    getFloorList();
  }, [getFloorList]);

  const getSeatsByFloor = useCallback(
    async (floorId: string): Promise<void> => {
      if (!floorId) return;

      try {
        setIsLoading(true);
        const floorRef = firestore().collection('floors').doc(floorId);
        const snapshot = await firestore()
          .collection('seats')
          .where('floorId', '==', floorRef)
          .get();

        const seats = snapshot.docs.map(doc => ({
          id: doc.id,
          status: doc.data().status || 'occupied',
          label: doc.data().label || '',
          type: doc.data().type || '',
          zoneId: doc.data().zoneId,
          floorName: doc.data().floorName || '',
          floorId: doc.data().floorId,
          lastModified: doc.data().lastModified,
          ...doc.data(),
        })) as Seat[];
        setSeatData(
          seats.sort((a, b) => parseInt(a.label) - parseInt(b.label)),
        );
      } catch (error) {
        console.error(`Error getting seats for floor ${floorId}:`, error);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    if (selectedFloorId) {
      getSeatsByFloor(selectedFloorId);
    }
  }, [selectedFloorId, getSeatsByFloor]);

  const handleSeatPress = async (seat: Seat) => {
    const userRef = (await getDoc(seat.assignedTo)).data();

    setSelectedSeat({ ...seat, user: userRef });
    setShowModal(true);
  };

  const RenderSeats = () => {
    // Group seats by their label numbers to create rows
    const groupedSeats = seatData.reduce(
      (acc, seat) => {
        const rowNumber = Math.ceil(parseInt(seat.label) / 12);
        if (!acc[rowNumber]) {
          acc[rowNumber] = [];
        }
        acc[rowNumber].push(seat);
        return acc;
      },
      {} as Record<number, Seat[]>,
    );

    const getSeatColor = (status: string) => {
      return status !== 'available' ? appTheme.themeColor : appTheme.gray;
    };

    const getSeatTextColor = (status: string) => {
      // return status !== 'available' ? appTheme.background : appTheme.background;
      return '#fff';
    };

    return (
      <>
        {Object.entries(groupedSeats).map(([rowIndex, seats]) => (
          <View key={rowIndex} style={styles.deskBlock}>
            <View style={styles.row}>
              {seats.slice(0, 6).map(seat => (
                <TouchableOpacity
                  key={seat.id}
                  style={[
                    styles.seat,
                    {
                      backgroundColor: getSeatColor(seat.status),
                    },
                  ]}
                  onPress={() => handleSeatPress(seat)}>
                  <CustomText
                    style={[
                      styles.seatLabel,
                      {
                        color: getSeatTextColor(seat.status),
                      },
                    ]}>
                    {seat.label}
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
              {seats.slice(6, 12).map(seat => (
                <TouchableOpacity
                  key={seat.id}
                  style={[
                    styles.seat,
                    {
                      backgroundColor: getSeatColor(seat.status),
                    },
                  ]}
                  onPress={() => handleSeatPress(seat)}>
                  <CustomText
                    style={[
                      styles.seatLabel,
                      {
                        color: getSeatTextColor(seat.status),
                      },
                    ]}>
                    {seat.label}
                  </CustomText>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.passage} />
          </View>
        ))}
      </>
    );
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
            {floorList?.map(floor => (
              <Pressable
                onPress={() => setSelectedFloorId(floor.id)}
                key={floor.id}
                style={{
                  borderWidth: selectedFloorId === floor.id ? 1 : 0.5,
                  borderColor:
                    selectedFloorId === floor.id
                      ? appTheme.themeColor
                      : appTheme.gray,
                  backgroundColor:
                    selectedFloorId === floor.id
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
                      selectedFloorId === floor.id
                        ? appTheme.background
                        : appTheme.text,
                    fontWeight:
                      selectedFloorId === floor.id ? 'bold' : 'normal',
                  }}>
                  {floor.name}
                </CustomText>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </View>

      <View style={{ height: 10 }} />

      <View style={[styles.mapContainer, { backgroundColor: appTheme.card }]}>
        <RenderSeats />
      </View>

      <TeamView
        onClusterPress={() => {
          console.log('AI-Optimized Clusters Pressed');
        }}
      />

      <BottomModalContainer
        title={`Seat #${selectedSeat?.label}`}
        onClose={() => setShowModal(false)}
        show={isShowModal}>
        <View style={{ gap: 10, paddingHorizontal: 10 }}>
          <CustomText large style={{ fontWeight: 'bold' }}>
            Status:{' '}
            {selectedSeat?.status === 'available' ? 'Available' : 'Occupied'}
          </CustomText>
          <CustomText large style={{ fontWeight: 'bold' }}>
            Employee ID: {selectedSeat?.user?.employeeId}
          </CustomText>
          <CustomText medium>
            Name: {selectedSeat?.user?.displayName}
          </CustomText>
          <CustomText medium>Email: {selectedSeat?.user?.email}</CustomText>
          <CustomText medium>Role: {selectedSeat?.user?.role}</CustomText>
        </View>
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
