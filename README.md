# mail-bot

## Installation:

### npm packages
> npm i

### Mocha globally
> sudo npm install mocha -g

### Running

1. Run selenium server
> java -jar selenium-server-standalone-3.0.1.jar

1.1  Set port
> java -jar selenium-server-standalone-3.0.1.jar -port 4445

2. Run test from mocha
> mocha path/to/test.js

### How to run on mobile phone

* download and install: android-server-2.21.0.apk, if needed install KiesSetup.exe or Kies_3.2.14113_3.exe
* download android SDK
* connect device and PC
* go to ~sdk/platform-tools/, there you will see 'adb(.exe)' file
* run from cmd 'adb devices' or '$./adb devices' to see list of connected devices, if list is empty install Keis (see 1.1)
* run from cmd 'adb forward tcp:8080 tcp:8080' to listen :8080 (use the same port for webdriver host f.e 'http://localhost:8080/wd/hub' )

###Appendix

Install apk to device from pc
$./adb -s \<serialId\> -e install -r  android-server.apk

Start the Android WebDriver application through the UI of the device or by running this command:
$./adb -s \<serialId\> shell am start -a android.intent.action.MAIN -n org.openqa.selenium.android.app/.MainActivity

You can start the application in debug mode, which has more verbose logs by doing:
$./adb -s \<serialId\> shell am start -a android.intent.action.MAIN -n org.openqa.selenium.android.app/.MainActivity -e debug true

You can close the application:
$./adb shell am force-stop org.openqa.selenium.android.app

Finally, we need to expose this server to the Selenium clients running the tests adding a port forward. Identify a PC local port that is not in use and execute this command:
adb -s \<device-id\> forward tcp:\<pc-port\> tcp:8080
