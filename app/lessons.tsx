import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import "../globals.css";
import React from "react";

const Lessons = () => {
  const lessons = [
    {
      id: 1,
      title: "Aralin 1",
      about: "Panitikan sa Panahon ng Katutubo (Anyong Patula) ",
    },
    {
      id: 2,
      title: "Aralin 2",
      about: "Ibat ibang halimbawa ng Karunungang -Bayan",
    },
    {
      id: 3,
      title: "Aralin 3",
      about: "Mga Awiting-Bayan sa Panahon ng mga Katutubo",
    },
    {
      id: 4,
      title: "Aralin 4",
      about: "EPIKONG-BAYAN",
    },
    {
      id: 5,
      title: "Aralin 5",
      about: "Tekstong Impormasyonal",
    },
    {
      id: 6,
      title: "Aralin 6",
      about: "Tekstong Ekspositori ( Pagkakasunod-sunod)",
    },
    {
      id: 7,
      title: "Aralin 7",
      about: "Tekstong Ekspositori ( Sanhi at Bunga )",
    },
    {
      id: 8,
      title: "Aralin 8",
      about: "Panitikan sa Panahon ng  Katutubo (Anyong Patula )",
    },
  ];

  const handleLessonPress = (id: number) => {
    router.push(`/lesson/${id}`);
  };
  const handleBackPress = () => {
    router.back();
  };
  return (
    <View className="relative flex-1">
      <LinearGradient
        colors={["#FFE868", "#FAF7BF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        className="absolute inset-0"
      />

      <TouchableOpacity
        className="top-10 left-6 absolute z-10"
        onPress={() => router.back()}
      >
        <View className="p-3 bg-white border-2 border-orange-300 rounded-full shadow-lg">
          <Ionicons name="chevron-back" size={24} color="#7C3AED" />
        </View>
      </TouchableOpacity>

      <ScrollView
        className="flex-1 pt-16"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={true}
      >
        <View className="items-center px-8">
          <View className="rounded-3xl px-8 py-4 mb-8 bg-white border-4 border-orange-300 shadow-lg">
            <Text className="text-2xl font-bold text-purple-700">
              📚 MGA ARALIN 🌟
            </Text>
          </View>

          <View className="w-full max-w-xs">
            {lessons.map((lesson, index) => (
              <TouchableOpacity
                key={lesson.id}
                onPress={() => handleLessonPress(lesson.id)}
                className="rounded-3xl border-3 px-8 py-5 mb-5 border-green-600 shadow-xl"
                style={{
                  backgroundColor: index % 2 === 0 ? "#4ADE80" : "#22C55E",
                  elevation: 8,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 6,
                }}
              >
                <View className="flex-row items-center justify-between">
                  <Text className="text-xl font-bold text-white">
                    {lesson.title}
                  </Text>
                </View>

                <View className="flex-row mt-2">
                  <Text className="opacity-90 text-sm text-white">
                    {lesson.about}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <Text className="mt-6 text-lg font-bold text-center text-green-700">
            Kaya mo yan! 💪✨
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Lessons;
