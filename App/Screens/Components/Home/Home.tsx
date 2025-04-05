/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import {
  CustomText,
  Layout,
  BottomModalContainer,
  IsAlertModal,
} from '@CommonComponent';
import { useIsFocused } from '@react-navigation/native';
import { ButtonComponent } from '@SubComponents';

import { useAppContext } from '@AppContext';
import { AppImages, CommonStyle } from '@Theme';
import { useCollection } from '../../../Hooks/useCollection';
import { Project, User } from '../../../Interfaces/interface';
import { useGetDoc } from '../../../Hooks/useGetDoc';

const Home = () => {
  const { appTheme } = useAppContext();
  const isFocused = useIsFocused();
  const [projects, setProjects] = useState<Project[]>([]);

  const {
    data: user,
    isLoading,
    error,
  }: { data: User; isLoading: boolean; error: any } = useCollection('users');

  useEffect(() => {
    const fetchProjects = async () => {
      if (!user?.currentProjects?.length) {
        setProjects([]);
        return;
      }

      try {
        const projectPromises = user.currentProjects.map(async projectId => {
          const doc = await firestore()
            .collection('projects')
            .doc(projectId)
            .get();

          if (doc.exists) {
            return { id: projectId, ...doc.data() } as Project;
          }
          return null;
        });

        const resolvedProjects = await Promise.all(projectPromises);
        setProjects(resolvedProjects.filter(Boolean) as Project[]);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setProjects([]);
      }
    };

    fetchProjects();
  }, [user?.currentProjects]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

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
              {user?.role}
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
              Not allocated
            </CustomText>
            <CustomText
              style={{
                color: appTheme.lightText,
              }}>
              2nd Floor, {user?.department}-Zone
            </CustomText>
          </View>
        </View>
      </View>
      {/* Current Project Section */}
      {(projects.length > 0 &&
        projects.map(project => {
          return (
            <View
              key={project.id}
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
                {project.name}
              </CustomText>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 5 }}>
                {user.techSkills.map((skill, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        backgroundColor: appTheme.background,
                        alignSelf: 'flex-start',
                        borderRadius: 16,
                        paddingHorizontal: 12,
                        paddingVertical: 4,
                        marginBottom: 16,
                      }}>
                      <CustomText style={{ color: appTheme.themeColor }}>
                        {skill}
                      </CustomText>
                    </View>
                  );
                })}
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
                  <CustomText style={{ color: appTheme.text }}>
                    DOE:{' '}
                  </CustomText>
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
                <CustomText style={{ color: appTheme.lightText }}>
                  +3 more
                </CustomText>
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
          );
        })) || (
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

              fontWeight: 'bold',
            }}>
            No project assigned
          </CustomText>
        </View>
      )}
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
