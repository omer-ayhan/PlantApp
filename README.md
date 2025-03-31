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
- **State Management**: Redux Toolkit with Redux Persist
- **Navigation**: React Navigation (Native Stack & Bottom Tabs)

### UI & Performance

- **Styling**: React Native Size Matters
- **Animations**: React Native Reanimated & Lottie
- **Lists**: FlashList
- **Images**: FastImage
- **UI Components**:
  - Bottom Sheet
  - Linear Gradient
  - Blur effects
  - SVG support

### Development Tools

- **Type Checking**: TypeScript
- **Code Quality**: ESLint
- **Code Formatting**: Prettier
- **Git Hooks**: Husky
- **Commit Linting**: Commitlint
- **Testing**: Jest
- **Environment Variables**: React Native Dotenv

## Project Structure

```
src/
├── assets/          # Static assets (icons, images)
├── components/      # Reusable UI components
├── screens/         # Screen components
├── navigation/      # Navigation configuration
├── store/          # Redux store setup and slices
├── hooks/          # Custom React hooks
├── utils/          # Utility functions
└── types/          # TypeScript type definitions
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
