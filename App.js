import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Switch,
  ScrollView,
  ActivityIndicator,
  Alert
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [autoScript, setAutoScript] = useState(false);
  const [autoYoutube, setAutoYoutube] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusText, setStatusText] = useState('');

  const handleGenerateScript = () => {
    if (!prompt && !autoScript) {
      Alert.alert('Hata', 'Lütfen bir konu yazın veya otomatik senaryo aramasını açın.');
      return;
    }
    setLoading(true);
    setStatusText('İnternet araştırılıyor ve yerel AI senaryo hazırlıyor...');
    setTimeout(() => {
      setPrompt('Örnek Senaryo: Yapay zeka ve mobil cihazların geleceği hakkında 30 saniyelik animasyon metni.');
      setLoading(false);
      setStatusText('');
    }, 2000);
  };

  const handleCreateVideo = () => {
    if (!prompt) {
      Alert.alert('Hata', 'Lütfen önce bir senaryo yazın veya üretin.');
      return;
    }
    setLoading(true);
    setStatusText('Telefonun ham gücüyle video ve animasyon render ediliyor...');
    setTimeout(() => {
      setLoading(false);
      setStatusText('');
      Alert.alert(
        'Başarılı!',
        autoYoutube
          ? 'Video üretildi ve YouTube hesabınıza otomatik yükleme başlatıldı!'
          : 'Video başarıyla oluşturuldu ve galerinize kaydedildi.'
      );
    }, 3500);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar style="light" />
      <Text styles={styles.headerTitle}>🎬 AI Video Creator</Text>
      <Text styles={styles.subTitle}>Telefonda Tamamen Çevrimdışı & Ücretsiz</Text>

      {/* Otomatik Senaryo Modu Switch */}
      <View style={styles.card}>
        <View style={styles.switchRow}>
          <Text style={styles.label}>İnternetten Otomatik Senaryo Bul</Text>
          <Switch
            value={autoScript}
            onValueChange={setAutoScript}
            thumbColor={autoScript ? '#6C5CE7' : '#f4f3f4'}
          />
        </View>
      </View>

      {/* Senaryo Girdi Alanı */}
      <View style={styles.card}>
        <Text style={styles.label}>
          {autoScript ? 'Aranacak Konu veya Fikir:' : 'Senaryonuz:'}
        </Text>
        <TextInput
          style={styles.textArea}
          multiline
          numberOfLines={5}
          placeholder={
            autoScript
              ? 'Örn: Uzay araştırmalarındaki son gelişmeler...'
              : 'Senaryonuzu buraya yazın...'
          }
          placeholderTextColor="#888"
          value={prompt}
          onChangeText={setPrompt}
        />
        
        <TouchableOpacity style={styles.btnSecondary} onPress={handleGenerateScript}>
          <Text style={styles.btnText}>✨ Yerel AI ile Senaryo Üret</Text>
        </TouchableOpacity>
      </View>

      {/* YouTube Ayarı */}
      <View style={styles.card}>
        <View style={styles.switchRow}>
          <Text style={styles.label}>YouTube Otomatik Yükleme</Text>
          <Switch
            value={autoYoutube}
            onValueChange={setAutoYoutube}
            thumbColor={autoYoutube ? '#FF0000' : '#f4f3f4'}
          />
        </View>
        <Text style={styles.infoText}>
          {autoYoutube
            ? '🔴 Video oluştuktan sonra doğrudan YouTube kanalınıza yüklenecek.'
            : '⚪ Video sadece telefon hafızasına kaydedilecek.'}
        </Text>
      </View>

      {/* Yüklenme Göstergesi */}
      {loading && (
        <View style={styles.loadingBox}>
          <ActivityIndicator size="large" color="#6C5CE7" />
          <Text style={styles.loadingText}>{statusText}</Text>
        </View>
      )}

      {/* Video Üret Butonu */}
      <TouchableOpacity
        style={[styles.btnPrimary, loading && styles.btnDisabled]}
        onPress={handleCreateVideo}
        disabled={loading}
      >
        <Text style={styles.btnPrimaryText}>⚡ Videoyu Oluştur (Telefon Gücü)</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#0F0F1A',
    padding: 20,
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 13,
    color: '#8A8A9E',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#1E1E2E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  label: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 8,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textArea: {
    backgroundColor: '#12121C',
    borderRadius: 8,
    color: '#FFF',
    padding: 12,
    textAlignVertical: 'top',
    minHeight: 100,
    marginBottom: 10,
  },
  btnSecondary: {
    backgroundColor: '#2D2D44',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnPrimary: {
    backgroundColor: '#6C5CE7',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  btnDisabled: {
    backgroundColor: '#444',
  },
  btnText: {
    color: '#A29BFE',
    fontWeight: '600',
  },
  btnPrimaryText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoText: {
    color: '#6A6A80',
    fontSize: 12,
    marginTop: 8,
  },
  loadingBox: {
    alignItems: 'center',
    marginVertical: 15,
  },
  loadingText: {
    color: '#A29BFE',
    marginTop: 8,
    fontSize: 13,
  },
});
