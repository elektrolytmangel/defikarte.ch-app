# Getting started with ReactNative and expo

```
npx expo run:ios --device
npx expo run:android --device
```

todo: use for geolocation
https://github.com/timfpark/react-native-location

# production build for testflight

```
npx tsc withxCode15DuplicateSignatureFix.ts --watch --skipLibCheck
eas build --platform ios --local --profile production
```
