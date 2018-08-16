# naos

> A better Stellar wallet

## Usage

``` bash
# Install dependencies
yarn

# Build for production
yarn build
yarn build:<platform>

# Build, watch for changes and debug the application
yarn debug
yarn debug:<platform>

# Build, watch for changes and run the application
yarn watch
yarn watch:<platform>

# Clean the NativeScript application instance (i.e. rm -rf dist)
yarn clean
```

> When invoking the various npm scripts, omitting the platform will attempt to launch `tns` for both platforms, which will only work in a properly configured OSX environment.

For detailed instructions, see https://github.com/nativescript-vue/vue-cli-template