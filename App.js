import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import Camera from './src/components/Camera';

const App = () => {
  return (
    <SafeAreaView>
      <Camera />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default App;
