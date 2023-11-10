import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native';

import { useRoute, RouteProp, useFocusEffect } from '@react-navigation/native';

import { Briefcase, MessageSquare, XCircle, User2 } from 'lucide-react-native';

import { Colors, UI } from '../../../../styles/custom';

import ActionWithIcon from '../../../../components/ui/ActionWithIcon';

import { YourGuardsBrown } from '../../../../assets/images';
import Popconfirm from '../../../../components/ui/Popconfirm';
import { useAppContext } from '../../../../store/AppContext';
import { getJobById } from '../../../../api-clients/apiServices';

interface Params {
  orderId: number;
  orderName: string;
  userId: number;
}

const styles = StyleSheet.create({
  icon: {
    maxWidth: 25,
    maxHeight: 25,
  },
});

const UserRoutes = [
  {
    id: 1,
    icon: (
      <Image
        style={styles.icon}
        source={YourGuardsBrown as ImageSourcePropType}
      />
    ),
    text: 'Guards',
    to: 'your-guards',
  },
  {
    id: 2,
    icon: <MessageSquare color={Colors.Brown} size={22} strokeWidth={1.6} />,
    text: 'Chat',
    to: 'chat',
  },
  {
    id: 3,
    icon: <Briefcase color={Colors.Brown} size={22} strokeWidth={1.6} />,
    text: 'Job Detail',
    to: 'job-description',
  },
  {
    id: 4,
    icon: <XCircle color={Colors.Brown} size={22} strokeWidth={1.6} />,
    text: 'Cancel Job',
    to: 'job-description',
  },
];



export default function OrderDetail() {
  const { params } = useRoute<RouteProp<Record<string, Params>, string>>();
  const [cancelJobModal, setCancelJobModal] = useState(false);
  const { state } = useAppContext();
  const { userType, userId } = state;
  const [job, setJob] = useState<any>([])
  const [isMounted, setIsMounted] = useState(true);

  const [GuardRoutes, setGuardRoutes] = useState([
    {
      id: 3,
      icon: <Briefcase color={Colors.Brown} size={22} strokeWidth={1.6} />,
      text: 'Job Detail',
      to: 'job-description',
    },
    {
      id: 4,
      icon: <User2 color={Colors.Brown} size={22} strokeWidth={1.6} />,
      text: "View Client's Profile",
      to: 'user-detail',
    },
  ]
  )


  const getjobHandle = async () => {
    const chatRoute = {
      id: 2,
      icon: <MessageSquare color={Colors.Brown} size={22} strokeWidth={1.6} />,
      text: 'Chat',
      to: 'chat',
    }
    try {
      const chatRouteExists = GuardRoutes.some((route) => route.to === 'chat');
      console.log(chatRouteExists, "chat route exist")

      const res = await getJobById(params.orderId)

      console.log(res?.job_guards, "res")

      if (res?.hasAcceptedJob && !chatRouteExists) {

        setGuardRoutes((prevMessages) => [chatRoute, ...prevMessages]);
      }
    } catch (err) {
      console.log(err)
    }
  }


  useEffect(() => {
    getjobHandle()
  }, [])


  return (
    <SafeAreaView style={[UI.flexFull, { backgroundColor: '#fff' }]}>
      <View style={[UI.justifyCenter, UI.flexFull]}>
        <View style={[UI.paddingX, { gap: 16 }]}>
          {userType !== 'guard'
            ? UserRoutes.map(i => (
              <ActionWithIcon
                params={{ orderId: params.orderId }}
                key={i.id}
                to={i.to ? i.to : null}
                onPress={
                  i.id === 4
                    ? () => {
                      setCancelJobModal(true);
                    }
                    : false
                }
                icon={i.icon}
                text={i.text}
                textStyle={{ color: Colors.Brown }}
              />
            ))
            : GuardRoutes.map(i => (
              // i.id === 4 ?
              <ActionWithIcon
                params={{ userId: params?.userId, orderId: params?.orderId, accepted: true }}
                key={i.id}
                to={i.to ? i.to : null}
                icon={i.icon}
                text={i.text}
                textStyle={{ color: Colors.DarkGray }}
              />
              //  :
              // <ActionWithIcon
              //   params={{ orderId: params.orderId, accepted: true }}
              //   key={i.id}
              //   to={i.to ? i.to : null}
              //   icon={i.icon}
              //   text={i.text}
              //   textStyle={{ color: Colors.DarkGray }}
              // />
            ))}
        </View>
        <Popconfirm
          isLoading={false}
          modalVisible={cancelJobModal}
          setModalVisible={setCancelJobModal}
          onConfirm={() => { }}
        />
      </View>
    </SafeAreaView>
  );
}
