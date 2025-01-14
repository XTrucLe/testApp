import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Camera, CameraView } from 'expo-camera';
import { BarcodeScanningResult } from 'expo-camera/build/Camera.types';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '@/components/navigation';

const QRCodeScreen = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);
  const [cameraRef, setCameraRef] = useState<CameraView | null>(null);
  const navigation = useNavigation<NavigationProps<'QRCodeScreen'>>();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }: BarcodeScanningResult) => {
    setScanned(true);
    navigation.navigate('MachineDataScreen', { machineId: Number(data) });
    alert(`Mã QR đã được quét! Loại: ${type}, Dữ liệu: ${data}`);
  };

  if (hasPermission === null) {
    return <Text>Đang xin quyền truy cập camera...</Text>;
  }
  if (hasPermission === false) {
    return <Text>Không có quyền truy cập camera!</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Quét Mã QR</Text>
      <CameraView
        style={styles.camera}        
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        ref={ref => setCameraRef(ref)}
      />
      {scanned && (
        <Button title={'Quét lại'} onPress={() => setScanned(false)} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  camera: {
    width: '100%',
    height: '80%',
  },
});

export default QRCodeScreen;
