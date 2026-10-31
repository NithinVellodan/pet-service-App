// require Pod::Executable.execute_command('node', ['-p',
//   'require.resolve(
//     "react-native/scripts/react_native_pods.rb",
//     {paths: [process.argv[1]]},
//   )', __dir__]).strip

// platform :ios, '13.4'

// use_frameworks! :linkage => :static

// prepare_react_native_project!

// flipper_config = ENV['NO_FLIPPER'] == "1" ? FlipperConfiguration.disabled : FlipperConfiguration.enabled

// linkage = ENV['USE_FRAMEWORKS']
// if linkage != nil
//   Pod::UI.puts "Configuring Pod with #{linkage}ally linked Frameworks".green
//   use_frameworks! :linkage => linkage.to_sym
// end
// pod 'Firebase', :modular_headers => true
// pod 'FirebaseCoreInternal', :modular_headers => true
// pod 'GoogleUtilities', :modular_headers => true
// pod 'FirebaseCore', :modular_headers => true

// target 'PetToPlace' do
//   pod 'Google-Maps-iOS-Utils','4.2.2'
//   rn_maps_path = '../node_modules/react-native-maps'
//   pod 'react-native-google-maps', :path => rn_maps_path
//   config = use_native_modules!
//   flags = get_default_flags()

//   use_react_native!(
//     :path => config[:reactNativePath],
//     :hermes_enabled => flags[:hermes_enabled],
//     :fabric_enabled => flags[:fabric_enabled],
//     # :flipper_configuration => flipper_config,
//     :app_path => "#{Pod::Config.instance.installation_root}/.."
//   )

//   target 'PetToPlaceTests' do
//     inherit! :complete
//   end

//   post_install do |installer|
//     react_native_post_install(
//       installer,
//       config[:reactNativePath],
//       :mac_catalyst_enabled => false
//     )
//     __apply_Xcode_12_5_M1_post_install_workaround(installer)
//   end
// end
