import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import NfcManager from 'react-native-nfc-manager';
import Game from './src/Game';

function App(props) {
  const [hasNfc, setHasNfc] = React.useState(null);
  const [enabled, setEnabled] = React.useState(null);

  React.useEffect(() => {
    async function checkNfc() {
      const supported = await NfcManager.isSupported();
      if (supported) {
        await NfcManager.start();
        setEnabled(await NfcManager.isEnabled());
      }
      setHasNfc(supported);
    }

    checkNfc();
  }, []);

  if (hasNfc === null) {
    return null;
  } else if (!hasNfc) {
    return (
      <View style={styles.wrapper}>
        <Text>Telefonunuz NFC desteklememektedir</Text>
      </View>
    );
  } else if (!enabled) {
    return (
      <View style={styles.wrapper}>
        <Text>NFC özelliğiniz açık değil</Text>

        <TouchableOpacity
          onPress={() => {
            NfcManager.goToNfcSetting();
          }}>
          <Text>NFC ayarlarına git</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={async () => {
            setEnabled(await NfcManager.isEnabled());
          }}>
          <Text>Tekrar deneyin</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return <Game/>;
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;