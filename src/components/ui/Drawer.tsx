import React, {SetStateAction, Dispatch, ReactNode} from 'react';

import {ScrollView} from 'react-native';

import {Drawer} from 'react-native-drawer-layout';

import DrawerContent from '../general/DrawerContent';
import {Colors} from '../../styles/custom';

interface DrawerProps {
  children: ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function CustomDrawer({children, open, setOpen}: DrawerProps) {
  return (
    <Drawer
      open={open}
      drawerStyle={{backgroundColor: Colors.DarkBlue}}
      style={{padding: 0, height: 0}}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      renderDrawerContent={() => {
        return (
          <ScrollView>
            <DrawerContent onClose={() => setOpen(false)} />
          </ScrollView>
        );
      }}>
      {children}
    </Drawer>
  );
}
