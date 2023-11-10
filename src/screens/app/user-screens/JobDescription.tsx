import React, {useState, useEffect} from 'react';

import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  ActivityIndicator,
} from 'react-native';

import {useRoute, RouteProp, useFocusEffect} from '@react-navigation/native';

import LogoBackground from '../../../components/general/LogoBackground';

import {Colors, UI, boxShadow} from '../../../styles/custom';

import JobDescriptionTable from '../../../components/general/JobDescriptionTable';
import StartJob from '../../../components/screens/job-description/StartJob';
import Button from '../../../components/ui/Button';

import {UserStackNavigationProp} from '../../../lib/types';

import {useAppContext} from '../../../store/AppContext';
import MemberShipPlusBanner from '../../../components/general/MemberShipPlusBanner';
import {
  acceptjob,
  endJob,
  getJobById,
  startJob,
} from '../../../api-clients/apiServices';
import {useToast} from '../../../hooks/useToast';
import Toast from 'react-native-toast-message';

interface Params {
  orderId: string;
  orderName: string;
  completed?: boolean;
  accepted?: boolean;
  cancelled?: boolean;
}

export default function JobDescription({
  navigation,
}: {
  navigation: UserStackNavigationProp;
}) {
  const {params} = useRoute<RouteProp<Record<string, Params>, string>>();
  const [job, setJob] = useState<any>([]);

  const {state} = useAppContext();
  const {userType} = state;

  const {rejectToast, resolveToast} = useToast();

  console.log(params.orderId, 'order id in job description page');
  console.log(params, 'asd');

  const getjobHandle = async () => {
    try {
      const res = await getJobById(params.orderId);
      console.log(res);
      setJob(res);
    } catch (err) {
      console.log(err);
    }
  };

  const acceptJobHandler = async () => {
    try {
      const res = await acceptjob(params.orderId);
      resolveToast(
        "You've accepted the job. Start a chat with the client to discuss further details.",
        '',
      );
      getjobHandle();
      setTimeout(() => {
        navigation.pop(); // Navigate back one screen
        navigation.pop(); // Navigate back one more screen
        navigation.pop(); // Navigate back one more screen
        navigation.navigate('current-order', params ?? params); // Navigate back one more screen
      }, 300);
    } catch (err) {
      console.log(err);
    }
  };

  const startJobHandler = async () => {
    let res;
    try {
      if (job?.hasStartedJob) {
        res = await endJob(params?.orderId);
        resolveToast('Job Completed', '');
      } else {
        res = await startJob(params?.orderId);
        resolveToast('Job Started', '');
      }
      getjobHandle();
      console.log(res, 'job start');
    } catch (err) {
      console.log(err);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getjobHandle();
    }, []),
  );
  return (
    <SafeAreaView style={[UI.flexFull, {backgroundColor: '#fff'}]}>
      <LogoBackground />
      <View style={[UI.flexFull, UI.justifyCenter]}>
        {Object.keys(job).length > 0 ? (
          <ScrollView>
            <View style={[UI.paddingX]}>
              {params.completed && !params.cancelled && (
                <Text
                  style={{
                    color: '#fff',
                    textAlign: 'center',
                    marginBottom: 20,
                    marginTop: 20,
                    fontSize: 13,
                    backgroundColor: Colors.DarkBlue,
                    borderRadius: 9,
                    paddingVertical: 13,
                  }}>
                  Job Completed 
                </Text>
              )}
              <JobDescriptionTable data={job} navigation={navigation} />
              {params.completed && userType !== 'guard' && (
                <View style={[{marginTop: 20, marginBottom: 20}]}>
                  <Button
                    roundedFull
                    onPress={() =>
                      navigation.navigate('your-guards', {
                        orderId: params.orderId,
                        completed: true,
                      })
                    }
                    gradient={true}
                    text="Rate Guard"
                  />
                </View>
              )}
              {/* {userType == 'guard' && !params.completed && !params.accepted && ( */}
              {userType == 'guard' && (
                <View
                  style={[
                    UI.flexRow,
                    UI.flexFull,
                    {marginTop: 20, marginBottom: 20, gap: 12},
                  ]}>
                  {job?.hasAcceptedJob ? (
                    <View style={{flex: 1}}>
                      <Button
                        isLoading={false}
                        roundedFull
                        style={{paddingHorizontal: 20}}
                        onPress={() =>
                          resolveToast(
                            'You have already accepted this job.',
                            'Job Already Accepted',
                          )
                        }
                        gradient={true}
                        text="Accepted"
                      />
                    </View>
                  ) : (
                    <View style={{flex: 1}}>
                      <Button
                        isLoading={false}
                        roundedFull
                        style={{paddingHorizontal: 20}}
                        onPress={acceptJobHandler}
                        gradient={true}
                        text="Accept"
                      />
                    </View>
                  )}
                  {/* <View style={{ flex: 1 }}>
                  <Button
                    isLoading={false}
                    roundedFull
                    style={{
                      paddingHorizontal: 20,
                      backgroundColor: '#fff',
                      ...boxShadow.pri,
                    }}
                    textStyles={{ color: Colors.DarkGray }}
                    onPress={() => { }}
                    gradient={false}
                    text="Cancel"
                  />
                </View> */}
                </View>
              )}
              {userType === 'guard' && params.accepted && (
                <StartJob
                  startJobHandler={startJobHandler}
                  hasAcceptedJob={job?.hasAcceptedJob}
                  coords={job?.coordinates}
                  hasStartedJob={job?.hasStartedJob}
                  hasCompletedJob={job?.hasCompletedJob}
                />
              )}
              <View style={{marginTop: 14}}>
                <MemberShipPlusBanner />
              </View>
            </View>
          </ScrollView>
        ) : (
          <View
            style={{
              flex: 1,
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ActivityIndicator color={Colors?.DarkBlue} size={24} /> 
          </View>
        )}
        <Toast />
      </View>
    </SafeAreaView>
  );
}
