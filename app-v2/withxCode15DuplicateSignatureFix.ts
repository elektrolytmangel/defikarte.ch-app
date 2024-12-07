import type { ConfigPlugin } from '@expo/config-plugins';
import { withXcodeProject } from '@expo/config-plugins';

/*
https://github.com/CocoaPods/CocoaPods/issues/12022
https://developer.apple.com/forums/thread/733461
in xCode 15, the signature files seems to be generated twice, which causes the build to fail.
*/

const withMyCustomBuildPhase: ConfigPlugin = (config) => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  return withXcodeProject(config, async (config) => {
    const xcodeProject = config.modResults;
    const shellScript: string = `if [ "$XCODE_VERSION_MAJOR" = "1600" ]; then
  echo "Remove signature files (Xcode 15 workaround)"
  find "$BUILD_DIR/\${CONFIGURATION}-iphoneos" -name "*.signature" -type f | xargs -r rm
fi`;

    xcodeProject.addBuildPhase([], 'PBXShellScriptBuildPhase', 'Fix Xcode 16 Bug', null, {
      shellPath: '/bin/sh',
      shellScript,
    });

    return config;
  });
};

export default withMyCustomBuildPhase;
