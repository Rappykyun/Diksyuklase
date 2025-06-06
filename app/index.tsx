import { Text, View, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import "../globals.css";
import React from "react";
import { router } from "expo-router";

const Home = () => {
  const handleMgaAralin = () => {
    router.push("/lessons");
  };

  const handleLumabas = () => {
    console.log("Lumabas pressed!");
  };

  return (
    <View className=" relative flex-1">
      <LinearGradient
        colors={["#FFE868", "#FAF7BF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        className="absolute inset-0"
      />
      <View className="opacity-60 -top-9 absolute left-0">
        <Image
          source={require("../assets/dot-pattern.png")}
          style={{ width: 380, height: 280 }}
          resizeMode="contain"
        />
      </View>

      <View className="opacity-60 -bottom-9 absolute right-0">
        <Image
          source={require("../assets/dot-pattern.png")}
          style={{
            width: 380,
            height: 280,
            transform: [{ rotate: "180deg" }],
          }}
          resizeMode="contain"
        />
      </View>

      <View className="top-16 left-8 absolute w-32 h-32 bg-yellow-200 rounded-full opacity-50" />
      <View className="bottom-20 -left-12 opacity-30 absolute w-40 h-40 bg-yellow-200 rounded-full" />

      <View className="relative z-10 items-center justify-center flex-1 px-8">
        <Image
          source={require("../assets/icon.png")}
          className="w-52 h-52 mb-6 rounded-md"
          resizeMode="contain"
        />

        <Text className="font text-cente mb-16 text-3xl font-extrabold text-blue-600">
          PAGBATI !
        </Text>

        <View className="w-full max-w-xs space-y-6">
          <TouchableOpacity
            className="active:bg-green-600 active:scale-95 px-8 py-5 mb-4 bg-green-500 rounded-full shadow-lg"
            onPress={handleMgaAralin}
          >
            <Text className=" font-comic-bold text-lg font-bold tracking-wide text-center text-white">
              MGA ARALIN
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="active:bg-orange-600 active:scale-95 px-8 py-5 bg-orange-500 rounded-full shadow-lg"
            onPress={handleLumabas}
          >
            <Text className="text-lg font-bold tracking-wide text-center text-white">
              LUMABAS
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Home;
