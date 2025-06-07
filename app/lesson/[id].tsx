import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Alert,
  ScrollView,
} from "react-native";
import Pdf from "react-native-pdf";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const LessonPDF = () => {
  const { id } = useLocalSearchParams();
  const [pdfUri, setPdfUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const lessonTitles: { [key: number]: string } = {
    1: "Aralin 1 - Panitikan sa Panahon ng Katutubo",
    2: "Aralin 2 - Karunungang-Bayan",
    3: "Aralin 3 - Mga Awiting-Bayan",
    4: "Aralin 4 - Epikong-Bayan",
    5: "Aralin 5 - Tekstong Impormasyonal",
    6: "Aralin 6 - Tekstong Ekspositori (Pagkakasunod-sunod)",
    7: "Aralin 7 - Tekstong Ekspositori (Sanhi at Bunga)",
    8: "Aralin 8 - Panitikan sa Panahon ng Katutubo",
  };

  const loadPDF = async () => {
    try {
      setLoading(true);
      setError(null);

      const pdfFiles: { [key: number]: any } = {
        1: require("../../assets/pdfs/MODULE1.pdf"),
        2: require("../../assets/pdfs/MODULE2.pdf"),
        3: require("../../assets/pdfs/MODULE3.pdf"),
        4: require("../../assets/pdfs/MODULE4.pdf"),
        5: require("../../assets/pdfs/MODULE5.pdf"),
        6: require("../../assets/pdfs/MODULE6.pdf"),
        7: require("../../assets/pdfs/MODULE7.pdf"),
        8: require("../../assets/pdfs/MODULE8.pdf"),
      };

      // Load PDF asset
      const pdfAsset = Asset.fromModule(pdfFiles[Number(id)]);
      await pdfAsset.downloadAsync();

      if (!pdfAsset.localUri) {
        throw new Error("PDF file not found");
      }

      const localUri = `${FileSystem.documentDirectory}MODULE${id}.pdf`;
      await FileSystem.copyAsync({
        from: pdfAsset.localUri,
        to: localUri,
      });

      setPdfUri(localUri);
    } catch (error) {
      console.error("PDF loading error:", error);
      setError("Hindi ma-load ang PDF. Subukan ulit.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPDF();
  }, [id]);

  const handleLoadComplete = (numberOfPages: number) => {
    setTotalPages(numberOfPages);
    console.log(`PDF loaded with ${numberOfPages} pages`);
  };

  const handlePageChanged = (page: number) => {
    setCurrentPage(page);
  };

  const handleError = (error: any) => {
    console.error("PDF Error:", error);
    setError("Hindi ma-display ang PDF. Subukan ulit.");
  };

  if (loading) {
    return (
      <LinearGradient colors={["#FFE868", "#FAF7BF"]} className="flex-1">
        <View className="items-center justify-center flex-1">
          <ActivityIndicator size="large" color="#22C55E" />
          <Text className="mt-4 text-lg font-bold text-green-700">
            📚 Loading PDF...
          </Text>
          <Text className="mt-2 text-sm text-green-600">
            Preparing your lesson materials
          </Text>
        </View>
      </LinearGradient>
    );
  }

  if (error) {
    return (
      <LinearGradient colors={["#FFE868", "#FAF7BF"]} className="flex-1">
        <View className="items-center justify-center flex-1 px-8">
          <Text className="mb-4 text-6xl">😔</Text>
          <Text className="mb-4 text-lg font-bold text-center text-red-600">
            {error}
          </Text>
          <TouchableOpacity
            onPress={loadPDF}
            className="px-6 py-3 bg-green-500 rounded-full"
          >
            <Text className="font-bold text-white">Subukan Ulit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.back()}
            className="px-6 py-3 mt-4 bg-gray-500 rounded-full"
          >
            <Text className="font-bold text-white">Bumalik</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <LinearGradient
        colors={["#22C55E", "#16A34A"]}
        className="px-4 pt-12 pb-4"
      >
        <View className="flex-row items-center justify-between mb-2">
          <TouchableOpacity
            onPress={() => router.back()}
            className="bg-white/20 p-2 rounded-full"
          >
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>

          <View className="flex-1 mx-4">
            <Text className="text-lg font-bold text-center text-white">
              📚 {lessonTitles[Number(id)] || `Aralin ${id}`}
            </Text>
          </View>

          <View className="bg-white/20 px-3 py-1 rounded-full">
            <Text className="text-sm font-semibold text-white">
              Page: {currentPage}
            </Text>
          </View>
        </View>
      </LinearGradient>

      {pdfUri && (
        <Pdf
          source={{ uri: pdfUri, cache: true }}
          onLoadComplete={handleLoadComplete}
          onPageChanged={handlePageChanged}
          onError={handleError}
          showsVerticalScrollIndicator={true}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={true}
          style={{
            flex: 1,
            width: screenWidth,
            height: screenHeight - 140,
          }}
          horizontal={false}
          enablePaging={true}
          enableRTL={false}
          enableAnnotationRendering={true}
          enableAntialiasing={true}
          fitPolicy={0}
          spacing={10}
          minScale={0.5}
          maxScale={3.0}
          scale={1.0}
          onLoadProgress={(percent) => {
            console.log(`Loading: ${Math.round(percent * 100)}%`);
          }}
          onScaleChanged={(scale) => {
            console.log(`Scale changed to: ${scale}`);
          }}
          onPressLink={(uri) => {
            console.log(`Link pressed: ${uri}`);
            Alert.alert("Link", `Gusto mo bang buksan ang link: ${uri}?`);
          }}
        />
      )}

      {/* Floating Controls */}
      {/* <View className="bottom-8 right-4 absolute p-2 bg-white rounded-full shadow-lg">
        <View className="flex-row">
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                "PDF Info",
                `📚 ${
                  lessonTitles[Number(id)]
                }\n📄 Page ${currentPage} of ${totalPages}\n📱 Native PDF Viewer\n🔍 Pinch to zoom\n👆 Tap to navigate`,
                [{ text: "OK" }]
              );
            }}
            className="p-3 mr-2 bg-blue-500 rounded-full"
          >
            <Ionicons name="information-circle" size={20} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                "PDF Help",
                "🔍 Pinch to zoom in/out\n👆 Tap to go to next page\n👈 Swipe to navigate\n📱 Rotate device for better view",
                [{ text: "Salamat!" }]
              );
            }}
            className="p-3 bg-green-500 rounded-full"
          >
            <Ionicons name="help-circle" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View> */}
    </View>
  );
};

export default LessonPDF;
