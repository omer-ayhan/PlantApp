# Plant App 🌱

A React Native application for plant care and management.

## Prerequisites

- Node.js (v18 or later)
- Yarn
- iOS: Xcode (latest version)
- Android: Android Studio (latest version)
- CocoaPods (for iOS)

## Environment Setup

1. Clone the repository:

```bash
git clone [repository-url]
cd plant-app
```

2. Install dependencies:

```bash
yarn install
```

3. Install iOS dependencies:

```bash
cd ios
bundle install
bundle exec pod install
cd ..
```

4. Create a `.env` file in the root directory with the following variables:

```bash
API_URL=https://dummy-api-jtg6bessta-ey.a.run.app
CDN_URL=https://d1fph6iyrbbbme.cloudfront.net
```

## Running the App

### Development

```bash
# Start Metro bundler
yarn start

# Run on iOS
yarn ios

# Run on Android
yarn android
```

### Production Build

```bash
# iOS
cd ios
xcodebuild -workspace PlantApp.xcworkspace -scheme PlantApp -configuration Release

# Android
cd android
./gradlew assembleRelease
```

## Technical Stack

### Core Technologies

- **Framework**: React Native v0.78.1
- **Language**: TypeScript
- **State Management**: Redux & Redux Toolkit with Redux Persist (react-redux, @reduxjs/toolkit)
- **API Management**: RTK Query for data fetching and caching (@reduxjs/toolkit)
- **Navigation**: React Navigation (Native Stack & Bottom Tabs)

### UI & Performance

- **Styling**: react-native-size-matters
- **Animations**: react-native-reanimated and lottie-react-native
- **Lists**: @shopify/flash-list
- **Images**: react-native-fast-image
- **UI Components**:
  - @gorhom/react-native-bottom-sheet
  - react-native-linear-gradient
  - @react-native-community/blur
  - react-native-svg
  - react-icomoon and svgps

### Development Tools

- **Type Checking**: TypeScript
- **Code Quality**: ESLint
- **Code Formatting**: Prettier
- **Git Hooks**: husky
- **Commit Linting**: @commitlint/config-conventional with husky
- **Testing**: Jest and React Native Testing Library
- **Environment Variables**: react-native-dotenv

## Project Structure

```
scripts/             # Custom scripts
|
src/
├── assets/          # Static assets (icons, images)
├── components/      # Reusable UI components
├── constants/       # Constants (routes, theme, colors)
├── screens/         # Screen components
├── navigation/      # Navigation stack and bottom tabs
├── store/           # Redux store, slices and RTK Query
├── hooks/           # Custom React hooks
├── lib/             # Utility functions
└── types/           # TypeScript type definitions
```

## Available Scripts

```bash
# Development
yarn start         # Start Metro bundler
yarn ios          # Run iOS app
yarn android      # Run Android app

# Code Quality
yarn check:lint   # Run ESLint
yarn check:type   # Run TypeScript type checking
yarn check:code   # Run both lint and type checks

# Icon Management
yarn svg:generate # Generate icon types and JSON from SVG files
```

## Troubleshooting

### Common Issues

1. **Metro Bundler Issues**

   ```bash
   # Clear Metro cache
   yarn start --reset-cache
   ```

2. **iOS Build Issues**

   ```bash
   cd ios
   pod deintegrate
   pod install
   ```

3. **Android Build Issues**
   ```bash
   cd android
   ./gradlew clean
   ```

For more detailed troubleshooting, please refer to the [React Native Troubleshooting Guide](https://reactnative.dev/docs/troubleshooting).
