avdmanager --verbose create avd --name "Flutter" --package "system-images;android-31;google_apis;x86_64" --device "pixel_5" --tag "google_apis" --abi "x86_64"


wget https://dl.google.com/android/repository/commandlinetools-linux-6200805_latest.zip
mkdir -p Android/Sdk
unzip commandlinetools-linux-6200805_latest.zip -d Android/Sdk

export ANDROID_HOME=$HOME/Android/Sdk
# Make sure emulator path comes before tools. Had trouble on Ubuntu with emulator from /tools being loaded
# instead of the one from /emulator
export PATH="$ANDROID_HOME/emulator:$ANDROID_HOME/tools:$ANDROID_HOME/tools/bin:$ANDROID_HOME/platform-tools:$PATH"

sdkmanager --sdk_root=${ANDROID_HOME} "tools"

sdkmanager --update
sdkmanager --list
sdkmanager "build-tools;28.0.3" "platform-tools" "platforms;android-28" "tools"
sdkmanager --licenses

sudo apt install gradle
./sdkmanager "platform-tools" "platforms;android-26" "build-tools;26.0.3"

