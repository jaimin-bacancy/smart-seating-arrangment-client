/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Image, RefreshControl, StyleSheet, View } from 'react-native';
import {
  CustomText,
  Layout,
  BottomModalContainer,
  IsAlertModal,
} from '@CommonComponent';
import { useIsFocused } from '@react-navigation/native';
import { ButtonComponent } from '@SubComponents';

import { useAppContext } from '@AppContext';
import auth from '@react-native-firebase/auth';
import { AppImages, CommonStyle } from '@Theme';

const Home = () => {
  const { appTheme } = useAppContext();
  const user = auth().currentUser;
  console.log('user', JSON.stringify(user));
  const isFocused = useIsFocused();

  return (
    <Layout padding={20} scrollable>
      {/* User Profile Section */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: appTheme.themeColor,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 12,
            }}>
            <CustomText style={{ color: '#FFFFFF' }}>b</CustomText>
          </View>
          <View>
            <CustomText
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: appTheme.text,
              }}>
              Hi, {user?.displayName || 'Bacancy user'}
            </CustomText>
            <CustomText
              style={{
                color: appTheme.lightText,
                fontSize: 14,
              }}>
              Senior Developer
            </CustomText>
          </View>
        </View>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: appTheme.background,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: appTheme.border,
          }}>
          {/* Bell icon placeholder */}
          <Image src={AppImages.search} style={{ width: 20, height: 20 }} />
        </View>
      </View>

      {/* Current Seat Section */}
      <View
        style={[
          {
            backgroundColor: appTheme.card,
          },
          styles.cardView,
        ]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <CustomText
            style={{
              color: appTheme.lightText,
              marginBottom: 8,
            }}>
            CURRENT SEAT
          </CustomText>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              padding: 5,
              paddingHorizontal: 10,
              backgroundColor: appTheme.background,
              borderRadius: 20,
            }}>
            <CustomText style={{ color: appTheme.themeColor }}>
              View on Map
            </CustomText>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View>
            <CustomText
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                marginBottom: 4,
                color: appTheme.text,
              }}>
              B12
            </CustomText>
            <CustomText
              style={{
                color: appTheme.lightText,
              }}>
              2nd Floor, Engineering Zone
            </CustomText>
          </View>
        </View>
      </View>

      {/* Current Project Section */}
      <View
        style={[
          {
            backgroundColor: appTheme.card,
          },
          styles.cardView,
        ]}>
        <CustomText
          style={{
            color: appTheme.lightText,
            marginBottom: 8,
          }}>
          CURRENT PROJECT
        </CustomText>

        <CustomText
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 8,
            color: appTheme.text,
          }}>
          Platform Dashboard Redesign
        </CustomText>

        <View
          style={{
            backgroundColor: appTheme.background,
            alignSelf: 'flex-start',
            borderRadius: 16,
            paddingHorizontal: 12,
            paddingVertical: 4,
            marginBottom: 16,
          }}>
          <CustomText style={{ color: appTheme.themeColor }}>
            React Native
          </CustomText>
        </View>

        <View style={{ marginBottom: 30, gap: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <CustomText style={{ color: appTheme.text }}>PM: </CustomText>
            <CustomText
              style={{ color: appTheme.themeColor, fontWeight: '500' }}>
              Karmaraj Vaghela
            </CustomText>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <CustomText style={{ color: appTheme.text }}>DOE: </CustomText>
            <CustomText
              style={{ color: appTheme.themeColor, fontWeight: '500' }}>
              Vroksi Roy
            </CustomText>
          </View>
        </View>

        <CustomText
          style={{
            color: appTheme.lightText,
            marginBottom: 8,
          }}>
          TEAM MEMBERS
        </CustomText>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {['KL', 'MC', 'TR', 'AH'].map((initials, index) => (
            <View
              key={index}
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: appTheme.themeColor,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 8,
              }}>
              <CustomText style={{ color: '#FFFFFF', fontSize: 12 }}>
                {initials}
              </CustomText>
            </View>
          ))}
          <CustomText style={{ color: appTheme.lightText }}>+3 more</CustomText>
        </View>

        {/* 
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 20,
            alignItems: 'center',
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <CustomText style={{ color: appTheme.text }}>
              PROJECT MANAGER
            </CustomText>
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: appTheme.themeColor,
                justifyContent: 'center',
                alignItems: 'center',
                margin: 10,
              }}>
              <CustomText style={{ color: '#FFFFFF', fontSize: 12 }}>
                HP
              </CustomText>
            </View>
          </View>

          <View style={{ alignItems: 'center' }}>
            <CustomText style={{ color: appTheme.text }}>DOE</CustomText>
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: appTheme.themeColor,
                justifyContent: 'center',
                alignItems: 'center',
                margin: 10,
              }}>
              <CustomText style={{ color: '#FFFFFF', fontSize: 12 }}>
                JP
              </CustomText>
            </View>
          </View>
        </View> */}
      </View>
      {/* AI-Optimized Seat Section */}
      <View
        style={[
          {
            backgroundColor: appTheme.card,
          },
          styles.cardView,
        ]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 8,
          }}>
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: appTheme.themeColor,
              marginRight: 12,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CustomText style={{ color: '#FFFFFF' }}>AI</CustomText>
          </View>
          <CustomText
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: appTheme.text,
            }}>
            AI-Optimized Seat
          </CustomText>
        </View>
        <CustomText
          style={{
            color: appTheme.lightText,
            fontSize: 14,
          }}>
          Desk B12 based on team collaboration
        </CustomText>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  cardView: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    ...CommonStyle.shadow,
  },
});

export default Home;
