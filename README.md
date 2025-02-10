
# Weather App UI Design - React Native Expo

This project is a weather app UI design created using a free Figma draft that I found. The goal of this project is to boost my knowledge in **Reanimated**, **Skia Components**, and **Component Management** in React Native. It showcases the design concepts in a fully functional React Native app built with **Expo**.

https://www.figma.com/design/AH8d9RMbL3u2BRPRzNwltI/Weather%2BApp%2BUI%2BDesign%2B%2528Community%2529_CLEAN?node-id=2-2214&p=f&t=lewUBRF8YluuOuLQ-0

## Features

- **Weather App UI**: A responsive and interactive UI based on a weather app design found in Figma.
- **Reanimated**: Utilized for animations to make the app feel smooth and interactive.
- **Skia Components**: Used for rendering high-performance graphics and custom designs.
- **Component Management**: Emphasizes the usage of well-structured and reusable components for easier maintenance and scalability.

## Technologies Used

- **React Native**: Main framework for building mobile applications.
- **Expo**: Used to speed up development and provide a better experience for testing the app.
- **React Native Reanimated**: For advanced animations and gestures.
- **Skia for React Native**: For rendering high-performance graphics in React Native apps.
- **React Navigation**: For handling navigation between different screens of the app.
- **Styled Components**: For styling and managing layout in a more modular way.

## Installation

Follow these steps to set up the project locally:

1. Clone the repository:
    ```bash
    git clone https://github.com/wolverine0606/weather_forecast_animated.git
    ```

2. Navigate into the project directory:
    ```bash
    cd weather_forecast_animated
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Set up a development build for Expo (since native code is required for Reanimated and Skia components):
    ```bash
    npx expo prebuild
    ```

   This command will generate the necessary native code and prepare the project for building. If you haven't previously installed the required dependencies or set up the native environment, Expo will prompt you to do so.

5. Start the app with Expo for ios simulator:
    ```bash
   npx expo run:ios
    ```

   This command will start the development build in **development mode** using Expo's custom development client. Scan the QR code in Expo Go on your device or use an Android/iOS emulator to test your app.

## Contributing

Feel free to fork the repository and submit a pull request with any improvements or features you may want to add. This project is for learning purposes, and any contributions are welcome!

## License

This project is open-source and available under the MIT License. See the [LICENSE](LICENSE) file for more information.
