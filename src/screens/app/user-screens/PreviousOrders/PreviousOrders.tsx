import React, { useEffect, useState } from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Dimensions,
  ImageSourcePropType,
  Image,
  ActivityIndicator,
  Text
} from 'react-native';

import { Colors, UI } from '../../../../styles/custom';

import LogoBackground from '../../../../components/general/LogoBackground';

import BorderedCardWithText from '../../../../components/general/BorderedCardWithText';
import SearchInput from '../../../../components/ui/SearchInput';
import MemberShipPlusBanner from '../../../../components/general/MemberShipPlusBanner';
import { DashboardBanner } from '../../../../assets/images';
import { currentAndPreviousJobs } from '../../../../api-clients/apiServices';

const Orders = [
  {
    id: 1,
    title: 'China Town Bar',
    status: 'completed',
  },
  {
    id: 3,
    title: 'Lorem ipsum',
    status: 'completed',
  },
  {
    id: 4,
    title: 'California',
    status: 'completed',
  },
  {
    id: 2,
    title: 'China Town Bar',
    status: 'cancelled',
  },
];


export default function PreviousOrder() {
  
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  
    const getJobsHandle = async () => {
      try {
        setIsLoading(true)
        const res = await currentAndPreviousJobs("previous")
        setOrders(res)
  
      } catch (err) {
        console.log(err, "get order in Current component")
      }finally{
        setIsLoading(false)
      }
    }
  
    useEffect(() => {
      getJobsHandle()
    }, [])
  
    type orderType = {
      id: number;
      startTime: string;
      type: string;
      guardCount: number;
      address: string;
      coordinates: string;
      timeDuration: number;
      message: string;
      amount: number;
      status: string;
      createdAt: string;
      updatedAt: string;
      userId:number 
    }
  
  return (
    <SafeAreaView style={[UI.flexFull, { backgroundColor: '#fff' }]}>
      <LogoBackground />
      <ScrollView
        style={UI.paddingX}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'space-between',
        }}
        showsVerticalScrollIndicator={false}>
        <View style={[{ gap: 12, paddingBottom: 0, paddingTop: 10 }]}>
        <Image
            style={{
              width: '100%',
              borderRadius: 10,
              height: 80,
              resizeMode: 'cover',
            }}
            source={DashboardBanner as ImageSourcePropType}
          />
          <SearchInput />
          {/* USING ID IN PARAMS TO FETCH ORDER RELATED DATA */}
          {orders.length > 0 ?
          <View style={styles.gridContainer}>
            {orders.map((i:orderType) => (
              <View style={[styles.gridItem]} key={i.id}>
                <BorderedCardWithText
                  // nextPage={{
                  //   path: 'job-description',
                  //   params: {
                  //     completed: true,
                  //     cancelled:
                  //       i.status.toLocaleLowerCase() === 'cancelled'
                  //         ? true
                  //         : false,
                  //     id: i.id,
                  //   },
                  // }}
                  currentOrder
                  id={i?.id}
                  userId={i?.userId}
                  title={i?.type}
                />
              </View>
            ))}
          </View>:
          <View style={{paddingTop: 20, flex: 1,alignItems:'center'}}>
          {isLoading ? (
            <ActivityIndicator color={Colors?.DarkBlue} size={24} />
          ) : (
            <Text style={{color:'red'}}>No Jobs Available</Text>
          )}
        </View>
          }

          <MemberShipPlusBanner />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const NUM_COLUMNS = 3;

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 0,
    gap: 7,
  },
  gridItem: {
    width: Dimensions.get('window').width / NUM_COLUMNS - 16,
    padding: '0.45%',
  },
});
