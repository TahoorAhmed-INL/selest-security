import React from 'react';

import {View, Text, ScrollView, SafeAreaView, StyleSheet} from 'react-native';

import LogoBackground from '../../../components/general/LogoBackground';

import {Colors, UI} from '../../../styles/custom';

export default function TermsAndConditions() {
  return (
    <SafeAreaView style={[UI.flexFull, {backgroundColor: '#fff'}]}>
      <LogoBackground />
      <View>
        <ScrollView>
          <View style={[UI.paddingX, {paddingBottom: 14}]}>
            <Text style={styles.heading}>
              TERMS AND CONDITIONS OF USE FOR THE SECURITY AGENT RENTAL MOBILE
              APPLICATION
            </Text>
            <Text style={[styles.text]}>
              Between Selest Security Inc. ("the Agency") with its headquarters
              at 130-1200 BLVD St Martin O Laval (Quebec) H7S 2E4, and any
              person or entity that downloads and uses the Agency's mobile
              application for renting security agents by the unit ("the User").
            </Text>
            <Text style={styles.heading}>SERVICE DESCRIPTION</Text>
            <Text style={[styles.text]}>
              The Agency's mobile application allows Users to rent security
              agents by the unit for private events or personal needs. Users can
              reserve security agents through the mobile application for
              specific dates and times.
            </Text>
            <Text style={styles.heading}>
              COPYRIGHT AND INTELLECTUAL PROPERTY
            </Text>
            <Text style={[styles.text]}>
              The Agency's mobile application, including all content, graphics,
              images, logos, and text, is the exclusive property of the Agency
              or its licensees. The User may not copy, reproduce, distribute, or
              create derivative works of the mobile application or its content
              without the prior written permission of the Agency.
            </Text>
            <Text style={styles.heading}>USE OF THE MOBILE APPLICATION</Text>
            <Text style={[styles.text]}>
              The User must use the Agency's mobile application in a lawful
              manner and in compliance with all applicable laws and regulations.
              The User must not use the Agency's mobile application to engage in
              illegal or fraudulent activities.
            </Text>
            <Text style={styles.heading}>CONFIDENTIALITY</Text>
            <Text style={[styles.text]}>
              The Agency is committed to protecting the privacy of Users and
              personal information collected through the mobile application. The
              Agency will not disclose Users' personal information to third
              parties unless required by law.
            </Text>
            <Text style={styles.heading}>PAYMENT</Text>
            <Text style={[styles.text]}>
              The Agency will not be liable for any loss, damage, or harm
              suffered by the User in connection with the use of the mobile
              application or the rental of security agents by the unit. The User
              uses the mobile application and rents security agents by the unit
              at their own risk.
            </Text>
            <Text style={styles.heading}>LIABILITY</Text>
            <Text style={[styles.text]}>
              The Agency will not be liable for any loss, damage, or harm
              suffered by the User in connection with the use of the mobile
              application or the rental of security agents by the unit. The User
              uses the mobile application and rents security agents by the unit
              at their own risk.
            </Text>
            <Text style={styles.heading}>
              MODIFICATIONS TO THE TERMS AND CONDITIONS
            </Text>
            <Text style={[styles.text]}>
              The Agency reserves the right to modify these terms and conditions
              of use of the mobile application at any time and without notice.
              Continued use of the mobile application after the modification of
              the terms and conditions constitutes the User's acceptance of the
              modifications.
            </Text>
            <Text style={styles.heading}>APPLICABLE LAW</Text>
            <Text style={[styles.text]}>
              These terms and conditions of use of the mobile application will
              be governed by and interpreted in accordance with the laws of
              Quebec, Canada.
            </Text>
            <Text style={styles.heading}>DISPUTES</Text>
            <Text style={[styles.text]}>
              Any dispute arising from the use of the mobile application will be
              resolved by mediation in accordance with the rules of the Chambre
              de commerce du Québec. If mediation fails to resolve the dispute,
              the parties agree to submit the dispute to binding arbitration in
              accordance with the rules of the Arbitration Act of Quebec. The
              place of arbitration will be Quebec, Canada. The arbitral award
              will be final and binding in accordance with applicable law.
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 16,
    color: Colors.DarkBlue,
    textDecorationStyle: 'dotted',
    textDecorationColor: '#000',
    marginTop: 16,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  text: {
    fontSize: 12,
    color: Colors.DarkBlue,
  },
});
