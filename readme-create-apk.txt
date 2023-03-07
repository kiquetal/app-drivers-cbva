cd android && APP_ENV=./env ./gradlew assembleRelease

adb -s <device> install android/app/build/outputs/apk/app-release.apk

