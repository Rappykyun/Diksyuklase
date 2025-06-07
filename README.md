# 📚 DIKSYUKLASE - Educational App

A React Native educational app for Filipino students with **native PDF viewing** capabilities.

## ✨ Features

- 🏠 **Beautiful Home Page** with gradient design
- 📚 **8 Educational Lessons** in Filipino
- 📄 **Native PDF Viewer** using react-native-pdf
- 🔍 **Zoom & Navigation** - Pinch to zoom, tap to navigate
- 📱 **Offline Support** - Works without internet
- 🎨 **Modern UI** with NativeWind (Tailwind CSS)
- 🚀 **Native Performance** - No WebView limitations

## 🔧 Development Build Required

**Important**: This app uses `react-native-pdf` which requires a **development build**. It will NOT work with Expo Go.

### 📱 How to Build & Run

#### Option 1: EAS Build (Recommended)

```bash
# Install EAS CLI
npm install -g @expo/eas-cli

# Login to Expo
eas login

# Configure build
eas build:configure

# Build for development
eas build --platform android --profile development
eas build --platform ios --profile development

# Install the build on your device
# Then run the development server
npx expo start --dev-client
```

#### Option 2: Local Development Build

```bash
# Generate native projects
npx expo run:android
# or
npx expo run:ios
```

### 🛠️ Setup Instructions

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd DIKSYUKLASE
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npx expo start --dev-client
   ```

4. **Build and install on device**
   - Use EAS Build or local build commands above
   - Install the generated APK/IPA on your device
   - Open the app and connect to the development server

## 📦 Key Dependencies

- **react-native-pdf** - Native PDF viewing
- **expo-router** - File-based navigation
- **nativewind** - Tailwind CSS for React Native
- **expo-linear-gradient** - Gradient backgrounds
- **expo-file-system** - File operations
- **expo-asset** - Asset management

## 📄 PDF Viewer Features

### 🎯 react-native-pdf Capabilities

- ✅ **Native Performance** - Hardware-accelerated rendering
- ✅ **Pinch-to-Zoom** - Smooth zooming with gestures
- ✅ **Page Navigation** - Tap or swipe to navigate
- ✅ **Scale Control** - Min/max zoom limits
- ✅ **Page Tracking** - Real-time page counter
- ✅ **Error Handling** - Graceful error recovery
- ✅ **Loading States** - Progress indicators
- ✅ **Link Support** - Interactive PDF links
- ✅ **Annotation Rendering** - PDF annotations support
- ✅ **RTL Support** - Right-to-left reading
- ✅ **Offline Caching** - Local file support

### 🔄 Comparison with Previous Solutions

| Feature           | WebView         | react-native-pdf  |
| ----------------- | --------------- | ----------------- |
| Performance       | ⚠️ Limited      | ✅ Native         |
| Zoom Quality      | ⚠️ Basic        | ✅ Smooth         |
| File Access       | ❌ Restricted   | ✅ Direct         |
| Platform Support  | ⚠️ Inconsistent | ✅ Cross-platform |
| Build Requirement | ✅ Expo Go      | ⚠️ Dev Build      |

## 🎨 UI Design

### 🏠 Home Page

- Yellow gradient background (#FFE868 to #FAF7BF)
- App icon and title
- Navigation buttons with shadows
- Comic Neue font

### 📚 Lessons Page

- 8 lessons with Filipino content
- Colorful cards with emojis
- Educational descriptions
- Smooth navigation

### 📄 PDF Viewer

- Green gradient header
- Real-time page counter
- Floating help buttons
- Native scroll and zoom

## 🔍 Technical Implementation

### PDF Loading Process

```typescript
// 1. Load PDF asset from bundle
const pdfAsset = Asset.fromModule(require("../../assets/pdfs/MODULE1.pdf"));
await pdfAsset.downloadAsync();

// 2. Copy to file system
const localUri = `${FileSystem.documentDirectory}MODULE${id}.pdf`;
await FileSystem.copyAsync({
  from: pdfAsset.localUri,
  to: localUri,
});

// 3. Display with react-native-pdf
<Pdf
  source={{ uri: localUri, cache: true }}
  onLoadComplete={handleLoadComplete}
  onPageChanged={handlePageChanged}
  style={{ flex: 1 }}
/>;
```

### Event Handlers

```typescript
const handleLoadComplete = (numberOfPages: number) => {
  setTotalPages(numberOfPages);
};

const handlePageChanged = (page: number) => {
  setCurrentPage(page);
};

const handleError = (error: any) => {
  setError("Hindi ma-display ang PDF.");
};
```

## 🚀 Performance Tips

1. **Enable Caching**: Use `cache: true` in PDF source
2. **Optimize Assets**: Compress PDF files when possible
3. **Preload**: Load PDFs during app initialization
4. **Error Boundaries**: Implement proper error handling
5. **Memory Management**: Dispose resources when navigating away

## 🛠️ Troubleshooting

### Common Issues

**❌ "Metro has encountered an error"**

- Solution: Clear Metro cache with `npx expo start --clear`

**❌ "react-native-pdf not found"**

- Solution: Ensure you're using a development build, not Expo Go

**❌ "PDF not loading"**

- Solution: Check file paths and ensure PDFs are in assets/pdfs/

**❌ "White screen on PDF page"**

- Solution: Verify PDF file integrity and local URI

### Build Issues

**❌ EAS Build fails**

- Check app.json configuration
- Ensure all dependencies are installed
- Verify Expo CLI version

## 📱 Device Compatibility

### ✅ Supported Platforms

- **Android** 5.0+ (API 21+)
- **iOS** 10.0+
- **Cross-platform** consistent behavior

### 📋 Testing Checklist

- [ ] PDF loads correctly
- [ ] Zoom gestures work
- [ ] Page navigation functions
- [ ] Error handling displays
- [ ] Performance is smooth
- [ ] Offline functionality

## 🎓 Learning Outcomes

This project demonstrates:

### 📱 React Native Concepts

- **Navigation**: Expo Router file-based routing
- **State Management**: useState and useEffect hooks
- **Component Architecture**: Reusable components
- **Styling**: NativeWind (Tailwind) implementation
- **File System**: Asset loading and file operations

### 🔧 Advanced Topics

- **Native Modules**: Integration with react-native-pdf
- **Development Builds**: EAS Build configuration
- **Performance**: Native rendering vs WebView
- **Error Handling**: Graceful fallbacks and user feedback
- **Mobile UX**: Touch gestures and responsive design

### 🎯 Best Practices

- **Offline-First**: Bundle assets with app
- **User Feedback**: Loading states and error messages
- **Performance**: Efficient rendering and memory usage
- **Cross-Platform**: Consistent behavior across devices
- **Accessibility**: Clear navigation and help features

---

## 📞 Support

For issues or questions about react-native-pdf integration:

1. Check the official [react-native-pdf documentation](https://github.com/wonday/react-native-pdf)
2. Review Expo development build guides
3. Test on physical devices for best results

**Happy Learning! 📚✨**
