# Viro Starter Kit

This is a [**React Native**](https://reactnative.dev) project, set up with `@reactvision/react-viro`.

## Install the application

...here is an apk file of the application which you can download and install on your phone...

## Creating and Running a Development Server for the Application

> **Note**: This project was built without the use of a React Native Framework such as Expo.

If you would like to modify the app, follow these instrucions to create and install an app-debug.apk file on your phone which is then connected to a Development Server to run the app on your phone with live updates (Hot Reloading).
 
## Step 1: Set up your Environment

Follow the [React Native - Environment Setup](https://reactnative.dev/docs/set-up-your-environment) instructions to enable you to run this project via Android Studio. 

## Step 2: Install Dependencies

```bash
npm install
```

> **Note**: This project was built for android, however if you would like to configure it to run on ios you will need to do the following:

### iOS only:

```bash
cd ios
pod install
cd ..
```
## Step 3: Connect your Device to a Development Server for the Application.

> **Warning**: Due to limitations of the Apple Simulator and the Android Emulator, you must run this project on a physical device.

Follow the [React Native - Running On Device](https://reactnative.dev/docs/running-on-device) instructions to run the app on your device.

## Step 4: Connect to the Development Server over WiFi

> **Note**: In order to freely experience the AR components of our project, we recommend you connect your device to the Development Server over WiFi.

First, you will need to start the Development Server using **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of the project:

```bash
npm start
```
Next, follow the instructions at the bottom of the [React Native - Running On Device](https://reactnative.dev/docs/running-on-device) page to connect your device to the Development Server over WiFi.

If everything is set up _correctly_, you should see the app running on your device.

This is one way to run the app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 5: Explore the Application

Now that the app is running on your device, take some time to explore its features. Interact with different components, test its functionality, and experience how it works in practice. Experiment with various elements to get a feel for the user experience and ensure everything is functioning as expected.

## Step 6: Modifying the Application

Now that you have successfully run the app and seen how it works, let's modify it.

1. Open one of the files in the `pages` folder in your text editor of choice and edit some lines.
2. Your changes should appear immediately. If not, for **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

## Troubleshooting: Unable to View Changes or Grey Screen on Opening the App (Cannot connect to Metro)

A lot of minor issues can be resolved by reloading the app.  

However, if your phone disconnects from the Development Server, commands given in the terminal on your computer will not reach your phone. You will need to complete the following steps in order to reconnect your phone to the Development Server.

### Step 1: Ensure the Development Server is running in a terminal on your computer.
>You can start it using:  
>   ```bash
>  npm start
>  ```
### Step 2: Ensure the app is open on your phone. 
If not, go to `All Apps` and tap on `RescueMe` to launch.
### Step 3: Open the Developer Menu on the app by shaking your phone while the app is open.
### Step 4: Tap the 'Reload' option to reload the app.

You should see a `bundling` message at the top of the app, and on the console ```BUNDLE ./index.js``` will appear. Once it has been bundled, the ```Running "RescueMe" ``` log should appear on the console.  
The app has now successfully connected to the Development Server and any changes made should appear in real-time. 

-------

## Getting Started

## Step 2: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
npm start
```

## Step 3: Start your Application

> **Warning**: Due to limitations of the Apple Simulator and the Android Emulator, you must run your project on a physical device.

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

```bash
# iOS
npx react-native run-ios
# Android
npx react-native run-android
```

If everything is set up _correctly_, you should see your new app running on your device.

#### Install CocoaPods

```bash
cd ios
pod install
cd ..
```

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 4: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

## Next Steps

Check out our [documentation](https://viro-community.readme.io/) for guides, examples, and more!

## Need help?

[Reach us in Discord.](https://discord.gg/YfxDBGTxvG) or submit an issue!
