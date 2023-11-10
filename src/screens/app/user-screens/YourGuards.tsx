import React, {useState, useEffect} from 'react';

import {
  View,
  SafeAreaView,
  Image,
  StyleSheet,
  ImageSourcePropType,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Text,
} from 'react-native';

import {useRoute, RouteProp} from '@react-navigation/native';

import LogoBackground from '../../../components/general/LogoBackground';
import {Avatar} from '../../../assets/images';

import {Colors, UI} from '../../../styles/custom';

import MainOverlayHeader from '../../../components/general/MainOverlayHeader';
import BorderedCardWithText from '../../../components/general/BorderedCardWithText';
import MemberShipPlusBanner from '../../../components/general/MemberShipPlusBanner';
import {getJobById} from '../../../api-clients/apiServices';
import {BASE_URL} from '../../../api';

const NUM_COLUMNS = 3;

const styles = StyleSheet.create({
  icon: {
    maxWidth: 32,
    maxHeight: 32,
    borderRadius: 100,
  },
  bodyText: {
    color: Colors.DarkGray,
    marginVertical: '10%',
    paddingLeft: 10,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 12,
    gap: 7,
  },
  gridItem: {
    width: Dimensions.get('window').width / NUM_COLUMNS - 16,
    padding: '0.45%',
  },
});

const Guards = [
  {
    id: 1,
    text: 'Guard 1',
    to: 'guard-profile',
    icon: <Image source={Avatar as ImageSourcePropType} style={styles.icon} />,
  },
  {
    id: 2,
    text: 'Guard 2',
    to: 'guard-profile',
    icon: <Image source={Avatar as ImageSourcePropType} style={styles.icon} />,
  },
  {
    id: 3,
    text: 'Guard 3',
    to: 'guard-profile',
    icon: <Image source={Avatar as ImageSourcePropType} style={styles.icon} />,
  },
  {
    id: 4,
    text: 'Guard 4',
    to: 'guard-profile',
    icon: <Image source={Avatar as ImageSourcePropType} style={styles.icon} />,
  },
];

interface Params {
  orderId: string;
  completed?: boolean;
}

export default function YourGuards() {
  const {params} = useRoute<RouteProp<Record<string, Params>, string>>();
  const [guard, setGuard] = useState([]);
  const [hasCompletedJob, setHasCompletedJob] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  type guardsType = {
    guard: {
      address: string;
      contact: string;
      gender: string;
      id: number;
      licenseNumber: string;
      name: string;
      picture: string;
      previousExperience: string;
      qualification: string;
      yearsOfExperience: number;
    };
  };

  const getjobHandle = async () => {
    try {
      setIsLoading(true);
      const res = await getJobById(params?.orderId);
      console.log(res);
      setGuard(res?.job_guards);
      if (res?.status == 'completed') {
        setHasCompletedJob(true);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (params?.orderId) {
      getjobHandle();
    }
  }, []);
  console.log(params, 'params your guard');
  console.log(guard, 'guard list');
  console.log(hasCompletedJob, 'hasCompletedJob ');
  return (
    <SafeAreaView style={[UI.flexFull, {backgroundColor: '#fff'}]}>
      <LogoBackground />
      <View style={[UI.justifyCenter, UI.flexFull]}>
        <View style={[UI.paddingX]}>
          <ScrollView
            contentContainerStyle={{flexGrow: 1, paddingBottom: 10}}
            showsVerticalScrollIndicator={false}>
            <MainOverlayHeader
              textTop="YOUR GUARDS WILL ARRIVED ON MENTIONED"
              textBottom="DATE, TIME AND DESTINATION"
            />
            {guard.length > 0 ? (
              <View style={[styles.gridContainer]}>
                {guard &&
                  guard.map(({guard}: guardsType) => {
                    console.log(guard?.id, '879879879879');
                    return (
                      <View key={guard?.id} style={styles.gridItem}>
                        <BorderedCardWithText
                          icon={
                            guard?.picture ? (
                              <Image
                                source={{uri: BASE_URL + '/' + guard?.picture}}
                                style={{
                                  height: 40,
                                  width: 40,
                                  borderRadius: 100,
                                  marginTop: 0,
                                }}
                              />
                            ) : (
                              <Image
                                source={Avatar as ImageSourcePropType}
                                style={styles.icon}
                              />
                            )
                          }
                          title={guard?.name}
                          nextPage={{
                            path: 'guard-profile',
                            params: {
                              userId: guard?.id,
                              orderId: params?.orderId,
                              completed: params?.completed
                                ? false
                                : hasCompletedJob,
                            },
                          }}
                        />
                      </View>
                    );
                  })}
              </View>
            ) : (
              <View style={{paddingVertical: 24,alignItems:'center'}}>
                {isLoading ? (
                  <ActivityIndicator color={Colors?.DarkBlue} size={24} />
                ) : (
                  <Text style={{color:'red'}}>No guards have accepted this job yet.</Text>
                )}
              </View>
            )}
            <MemberShipPlusBanner />
            {/* {!params.completed && (
              <>
                <Text style={[fontSizes.pri, styles.bodyText]}>
                  Your guards will arrive on mentioned Date, Time and
                  Destination
                </Text>
                <View style={[UI.alignCenter]}>
                  <Button
                    roundedFull
                    onPress={() => navigation.navigate('user-dashboard')}
                    gradient={true}
                    text="Done"
                  />
                </View>
              </>
            )} */}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}
