import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  ImageSourcePropType,
  ActivityIndicator,
  Text
} from 'react-native';

import {Colors, UI} from '../../../../styles/custom';

import BorderedCardWithText from '../../../../components/general/BorderedCardWithText';
import LogoBackground from '../../../../components/general/LogoBackground';
import SearchInput from '../../../../components/ui/SearchInput';
import MemberShipPlusBanner from '../../../../components/general/MemberShipPlusBanner';
import {DashboardBanner} from '../../../../assets/images';
import {currentAndPreviousJobs} from '../../../../api-clients/apiServices';

const Orders = [
  {
    id: 1,
    title: 'China Town Bar',
    status: 'In Progress',
  },
  {
    id: 3,
    title: 'Lorem ipsum',
    status: 'In Progress',
  },
  {
    id: 4,
    title: 'California',
    status: 'In Progress',
  },
  {
    id: 5,
    title: 'California',
    status: 'In Progress',
  },
];

const NUM_COLUMNS = 3;

export default function CurrentOrder() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getJobsHandle = async () => {
    try {
      setIsLoading(true)
      const res = await currentAndPreviousJobs('current');
      setOrders(res);
    } catch (err) {
      console.log(err, 'get order in Current component');
    }finally{
      setIsLoading(false)
    }
  };

  useEffect(() => {
    getJobsHandle();
  }, []);
  console.log(orders[0], 'orders array 89898989()()()()(');

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
    userId: number;
  };
  return (
    <SafeAreaView style={[UI.flexFull, {backgroundColor: '#fff'}]}>
      <LogoBackground />
      <ScrollView
        style={[UI.paddingX]}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'space-between',
        }}>
        <View style={[{gap: 12, paddingBottom: 0, paddingTop: 10}]}>
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
          {orders.length > 0 ? (
            <View style={styles.gridContainer}>
              {orders.map((order: orderType) => (
                <View key={order?.id} style={styles.gridItem}>
                  <BorderedCardWithText
                    currentOrder
                    id={order?.id}
                    title={order?.type}
                    userId={order?.userId}
                  />
                </View>
              ))}
            </View>
          ) : (
            <View style={{paddingTop: 20, flex: 1,alignItems:'center'}}>
              {isLoading ? (
                <ActivityIndicator color={Colors?.DarkBlue} size={24} />
              ) : (
                <Text style={{color:'red'}}>No Jobs Available</Text>
              )}
            </View>
          )}
          <MemberShipPlusBanner />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

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
