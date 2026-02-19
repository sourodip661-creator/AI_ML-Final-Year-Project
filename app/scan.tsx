import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CameraTab from "../components/Feature/CameraTab";
import SoundTab from "../components/Feature/SoundTab";
import { colors, radii, spacing } from "../lib/theme";

type TabType = "camera" | "sound";

export default function ScanScreen() {
  const { tab } = useLocalSearchParams<{ tab: TabType }>();
  const [activeTab, setActiveTab] = useState<TabType>(tab ?? "camera");
  const router = useRouter();

  // Sync state when route param changes (e.g. navigating from FeatureSection)
  useEffect(() => {
    if (tab === "sound" || tab === "camera") {
      setActiveTab(tab);
    }
  }, [tab]);

  // Update both local state AND the URL param so router stays in sync
  const handleTabChange = (newTab: TabType) => {
    setActiveTab(newTab);
    router.setParams({ tab: newTab });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color={colors.text} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Scan mode</Text>

        {/* Placeholder to balance the back button */}
        <View style={styles.backButton} />
      </View>

      {/* Tab Switcher */}
      <View style={styles.tabSwitcherWrapper}>
        <View style={styles.tabSwitcher}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === "sound" && styles.tabButtonActive,
            ]}
            onPress={() => handleTabChange("sound")}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.tabButtonText,
                activeTab === "sound" && styles.tabButtonTextActive,
              ]}
            >
              By Sound
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === "camera" && styles.tabButtonActive,
            ]}
            onPress={() => handleTabChange("camera")}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.tabButtonText,
                activeTab === "camera" && styles.tabButtonTextActive,
              ]}
            >
              By Camera
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tab Content */}
      <View style={styles.content}>
        {activeTab === "camera" ? (
          <CameraTab onShowSnapTips={() => {}} />
        ) : (
          <SoundTab />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
    marginTop: spacing.xxl,
    backgroundColor: colors.background,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.text,
    textAlign: "center",
  },
  tabSwitcherWrapper: {
    alignItems: "center",
    paddingVertical: spacing.sm,
    backgroundColor: colors.background,
  },
  tabSwitcher: {
    flexDirection: "row",
    backgroundColor: colors.surfaceVariant,
    borderRadius: radii.lg,
    padding: 4,
  },
  tabButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xl,
    borderRadius: radii.md,
    minWidth: 110,
    alignItems: "center",
  },
  tabButtonActive: {
    backgroundColor: colors.background,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabButtonText: {
    fontSize: 15,
    fontWeight: "400",
    color: colors.textSecondary,
  },
  tabButtonTextActive: {
    fontWeight: "600",
    color: colors.text,
  },
  content: {
    flex: 1,
  },
});
