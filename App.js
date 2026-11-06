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
  const [currentScreen, setCurrentScreen] = useState('home'); // 'home', 'files', 'creator', 'settings'
  
  // Video Creator State'leri
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
    setStatusText('İnternet taranıyor ve yerel AI senaryo hazırlıyor...');
    setTimeout(() => {
      setPrompt('Üretilen Senaryo: Yapay zekanın evrimi ve mobil cihazlarda otomatik içerik üretimi.');
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
          ? 'Video üretildi ve YouTube kanalınıza otomatik yükleme tetiklendi!'
          : 'Video başarıyla oluşturuldu ve dahili depolamaya kaydedildi.'
      );
    }, 3500);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* ANA SAYFA - 3 SEÇENEK */}
      {currentScreen === 'home' && (
        <View style={styles.homeContainer}>
          <Text style={styles.mainHeader}>🎬 AI Video Studio</Text>
          <Text style={styles.mainSub}>Tamamen Çevrimdışı & Telefonda Çalışır</Text>

          <View style={styles.menuContainer}>
            {/* 1. Dosyalara Göz At */}
            <TouchableOpacity
              style={styles.menuCard}
              onPress={() => setCurrentScreen('files')}
            >
              <Text style={styles.menuIcon}>📂</Text>
              <Text style={styles.menuTitle}>Dosyalara Göz At</Text>
              <Text style={styles.menuDesc}>Üretilen video ve senaryoları incele</Text>
            </TouchableOpacity>

            {/* 2. YT Video Oluştur ve Senaryo Yaz */}
            <TouchableOpacity
              style={styles.menuCard}
              onPress={() => setCurrentScreen('creator')}
            >
              <Text style={styles.menuIcon}>🎬</Text>
              <Text style={styles.menuTitle}>YT Video Oluştur & Senaryo</Text>
              <Text style={styles.menuDesc}>Manuel yaz veya AI ile otomatik üret</Text>
            </TouchableOpacity>

            {/* 3. Ayarlar */}
            <TouchableOpacity
              style={styles.menuCard}
              onPress={() => setCurrentScreen('settings')}
            >
              <Text style={styles.menuIcon}>⚙️</Text>
              <Text style={styles.menuTitle}>Ayarlar</Text>
              <Text style={styles.menuDesc}>YouTube entegrasyonu ve tercihler</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* 1. DOSYALAR EKRANI */}
      {currentScreen === 'files' && (
        <ScrollView contentContainerStyle={styles.subScreen}>
          <Text style={styles.screenHeader}>📂 Kayıtlı Dosyalar</Text>
          <View style={styles.card}>
            <Text style={styles.infoText}>Henüz cihazda kayıtlı bir video bulunmuyor.</Text>
          </View>
          <TouchableOpacity style={styles.backBtn} onPress={() => setCurrentScreen('home')}>
            <Text style={styles.backBtnText}>⬅️ Ana Menüye Dön</Text>
          </TouchableOpacity>
        </ScrollView>
      )}

      {/* 2. VİDEO OLUŞTUR VE SENARYO EKRANI */}
      {currentScreen === 'creator' && (
        <ScrollView contentContainerStyle={styles.subScreen}>
          <Text style={styles.screenHeader}>🎬 Video & Senaryo Motoru</Text>

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

          <View style={styles.card}>
            <Text style={styles.label}>
              {autoScript ? 'Aranacak Konu veya Gündem:' : 'Senaryonuz:'}
            </Text>
            <TextInput
              style={styles.textArea}
              multiline
              numberOfLines={4}
              placeholder={autoScript ? 'Örn: Uzay keşifleri...' : 'Senaryonuzu buraya yazın...'}
              placeholderTextColor="#888"
              value={prompt}
              onChangeText={setPrompt}
            />
            <TouchableOpacity style={styles.btnSecondary} onPress={handleGenerateScript}>
              <Text style={styles.btnSecText}>✨ Yerel AI ile Senaryo Üret</Text>
            </TouchableOpacity>
          </View>

          {loading && (
            <View style={styles.loadingBox}>
              <ActivityIndicator size="large" color="#6C5CE7" />
              <Text style={styles.loadingText}>{statusText}</Text>
            </View>
          )}

          <TouchableOpacity
            style={[styles.btnPrimary, loading && styles.btnDisabled]}
            onPress={handleCreateVideo}
            disabled={loading}
          >
            <Text style={styles.btnPrimaryText}>⚡ Videoyu Oluştur (Ham Güç)</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.backBtn} onPress={() => setCurrentScreen('home')}>
            <Text style={styles.backBtnText}>⬅️ Ana Menüye Dön</Text>
          </TouchableOpacity>
        </ScrollView>
      )}

      {/* 3. AYARLAR EKRANI */}
      {currentScreen === 'settings' && (
        <ScrollView contentContainerStyle={styles.subScreen}>
          <Text style={styles.screenHeader}>⚙️ Ayarlar</Text>

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
                ? '🔴 Aktif: Üretilen videolar doğrudan YouTube kanalınıza yüklenir.'
                : '⚪ Pasif: Videolar yalnızca cihazda saklanır.'}
            </Text>
          </View>

          <TouchableOpacity style={styles.backBtn} onPress={() => setCurrentScreen('home')}>
            <Text style={styles.backBtnText}>⬅️ Ana Menüye Dön</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F1A',
  },
  homeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  mainHeader: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
  },
  mainSub: {
    fontSize: 14,
    color: '#8A8A9E',
    marginBottom: 30,
  },
  menuContainer: {
    width: '100%',
    maxWidth: 350,
  },
  menuCard: {
    backgroundColor: '#1E1E2E',
    borderRadius: 12,
    padding: 18,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#2D2D44',
  },
  menuIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  menuTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  menuDesc: {
    color: '#8A8A9E',
    fontSize: 12,
  },
  subScreen: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 60,
  },
  screenHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#1E1E2E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  label: {
    color: '#FFF',
    fontSize: 14,
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
    minHeight: 90,
    marginBottom: 10,
  },
  btnSecondary: {
    backgroundColor: '#2D2D44',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnSecText: {
    color: '#A29BFE',
    fontWeight: '600',
    fontSize: 13,
  },
  btnPrimary: {
    backgroundColor: '#6C5CE7',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 5,
  },
  btnDisabled: {
    backgroundColor: '#444',
  },
  btnPrimaryText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  infoText: {
    color: '#6A6A80',
    fontSize: 13,
  },
  loadingBox: {
    alignItems: 'center',
    marginVertical: 10,
  },
  loadingText: {
    color: '#A29BFE',
    marginTop: 5,
    fontSize: 12,
  },
  backBtn: {
    marginTop: 20,
    padding: 12,
    alignItems: 'center',
  },
  backBtnText: {
    color: '#8A8A9E',
    fontSize: 14,
    fontWeight: '600',
  },
});
