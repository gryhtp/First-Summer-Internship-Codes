import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Platform,
  SafeAreaView,
} from 'react-native';
import NfcManager, { NfcEvents } from 'react-native-nfc-manager';
import AndroidPrompt from './AndroidPrompt';

function Game() {
  const [start, setStart] = React.useState(null);
  const [duration, setDuration] = React.useState(0);
  const androidPromptRef = React.useRef();
  let NfcDetails;

  React.useEffect(() => {
    let count = 0;
    NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag) => {
      
      count++;
      NfcDetails = tag;
      console.warn(JSON.stringify(tag));
      if (Platform.OS === 'android') {
        androidPromptRef.current.setHintText(`${count}...`);
      } else {
        NfcManager.setAlertMessageIOS(`${count}...`);
      }

      if (count > 0) {
        NfcManager.unregisterTagEvent().catch(() => 0);
        setDuration((new Date().getTime() - start.getTime()) / 1000);

        if (Platform.OS === 'android') {
          androidPromptRef.current.setVisible(false);
        }
      }
    });

    return () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    };
  }, [start]);

  async function scanTag() {
    await NfcManager.registerTagEvent();
    if (Platform.OS === 'android') {
      androidPromptRef.current.setVisible(true);
    }
    setStart(new Date());
    setDuration(0);
  }

  return (
    <View style={styles.wrapper}>
      <SafeAreaView />
      <View style={styles.content}>
        {(duration > 0 && (
          <Text style={styles.minLabel}>{duration} S</Text>
        ))}
      </View>

      <TouchableOpacity onPress={scanTag}>
        <View style={{borderRadius: 20, backgroundColor: "white", marginVertical: 10, marginHorizontal: 10}}>
          <Text style={styles.playLabel}>Okumaya başlamak için tıklayınız</Text>
        </View>
      </TouchableOpacity>


      <AndroidPrompt
        ref={androidPromptRef}
        onCancelPress={() => {
          NfcManager.unregisterTagEvent().catch(() => 0);
        }}
      />
      <SafeAreaView />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    fontSize: 40,
    color: 'black',
    marginBottom: 10,
  },
  minLabel: {
    fontSize: 32,
    color: 'black',
    textAlign: 'center',
  },
  playLabel: {
    fontSize: 28,
    color: 'black',
    textAlign: 'center',
    backgroundColor: "tomato"
  },
  btn: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: 'white',
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Game;