# WordPress Hybrid Client

 This is a fork of some work in original project that uses Ionic 2. There are a lot of changes an new components, and original repo is going to work in another path.


![screenshots](http://julienrenaux.fr/wp-content/uploads/2015/07/devices.jpg)

## Chat

[![Join the chat at https://gitter.im/shprink/wordpress-hybrid-client](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/shprink/wordpress-hybrid-client)

## Features

- [X] Posts
- [X] Pages
- [X] Custom posts
- [X] Taxonomies (Category, Tag and custom)
- [X] Authors
- [X] Search
- [X] Push Notifications
- [X] Custom templates (overwrite any template of the app)
- [X] Social sharing
- [X] Admob support
- [X] Sass variables
- [X] Parameters Page
      - Language switch [English|French|Chinese|Spanish|Polish|German|Portuguese|Italian|Dutch|Russian|Turkish|Urdu]
      - Accessibility (Post font size)
- [X] Image cache on device
- [X] App rate plugin
- [X] Syntax highlighter
- [X] Offline (Bookmarks)
- [X] Comments (Submitting is not supported yet)
- [X] Progressive Web App (manifest & Service Workers)
- [X] Google Analytics
- [X] Custom ads
- [X] Onesignal notifications.
- [X] Streaming plugin

## Built with WPHC

* Android
  * https://play.google.com/store/apps/details?id=com.shprinkinc.wordpresshybridclient
  * https://play.google.com/store/apps/details?id=com.anotherplanet.korkubilimi
  * https://play.google.com/store/apps/details?id=com.anotherplanet.metallicaonline
  * https://play.google.com/store/apps/details?id=com.anotherplanet.pinkfloyd
  * http://hiwaldorf.com/app/
  * https://play.google.com/store/apps/details?id=com.notmyfault
  * https://play.google.com/store/apps/details?id=com.ek.klootschieten
  * https://play.google.com/store/apps/details?id=ca.siksik.SikSikYFB
  * https://play.google.com/store/apps/details?id=com.trouidees.nuustoep&hl=en
  * https://play.google.com/store/apps/details?id=com.myeternalsymphony
  * https://play.google.com/store/apps/details?id=com.common_tales.CommonTales
  * https://play.google.com/store/apps/details?id=com.xvilo.jonginnop2
  * https://play.google.com/store/apps/details?id=com.xvilo.regio25
  * https://play.google.com/store/apps/details?id=de.esv1927.app
  * http://play.google.com/store/apps/details?id=com.mirzapurnews
  * https://play.google.com/store/apps/details?id=br.com.receitascompletas
* IOS
  * https://itunes.apple.com/cn/app/id1030393337
  * https://itunes.apple.com/us/app/not-my-fault./id886617889
  * https://itunes.apple.com/us/app/ek-klootschieten-2016/id1095442611
  * https://itunes.apple.com/ca/app/siksik-iqaluit-city-guide/id935965604
  * https://itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=1083903483&mt=8
  * https://itunes.apple.com/us/app/blog-da-suzye/id1117503697
  * https://itunes.apple.com/us/app/roma-tattoo/id1117043450
  * https://itunes.apple.com/us/app/blog-da-amanda-coutinho/id1114539494
  * https://itunes.apple.com/de/app/common-tales/id1106806336
  * https://itunes.apple.com/nl/app/regio25/id1067826417?mt=8
  * https://itunes.apple.com/nl/app/jonginnop/id1073451236?mt=8
  * https://itunes.apple.com/us/app/id1132170549
  * https://itunes.apple.com/us/app/suz-blog/id1145036348

## Quick Start

### Prerequisites

- Git
- NodeJS (>= 4)
- NPM (>= 3)
- [Yarn](https://yarnpkg.com/en/docs/install)

This installation works on both OSX and Linux. Windows is not supported yet,

```
# Clone and use the latest version
$ git clone --depth 1 https://github.com/shprink/wordpress-hybrid-client.git && cd wordpress-hybrid-client
# List all versions
$ git tag
$ git checkout <the-latest-version>

# Install
$ yarn

# Run on the browser
$ npm start
```

Open http://localhost:8080/webpack-dev-server/ in Chrome (the only browser supported). You should see the application running with `http://dev.julienrenaux.fr/wp-json` backend.

To go further please read the documentations.

## Documentation

If you have just cloned the repository,  [INSTALLATION](docs/INSTALLATION.md) is the recommended starting point. Here is the documentation index:

### Installation

Read the manual: [INSTALLATION](docs/INSTALLATION.md)

### Configuration

Read the manual: [CONFIGURATION](docs/CONFIGURATION.md)

### Development

Read the manual: [DEVELOPMENT](docs/DEVELOPMENT.md)

### Push Notifications

Read the manual: [PUSHNOTIFICATIONS](docs/PUSHNOTIFICATIONS.md)

### Build Android & iOS

Read the manual: [BUILD](docs/BUILD.md)

### Release Android & iOS

Read the manual: [RELEASE.md](docs/RELEASE.md)

### Splashscreens and Icons

Read the manual: [SPLASHICONS](docs/SPLASHICONS.md)

## Project public API

```
# Installation
npm run installWPHC (auto ran post npm install)

# Dev server
npm start

# Dump files in www
npm run dumpdev
npm run dumpprod

# Install Cordova
npm run restore

# Run Cordova
npm run android
npm run ios
npm run iosEmulator

# Cordova build
npm run buildAndroid
npm run buildProdAndroid
npm run buildIOS
npm run buildProdIOS
```

## Contribute

WordPress hybrid Client is Open Source, If you are interested in helping, please read the following:

### Pull Request Guidelines

When in doubt, keep your pull requests small. To give a PR the best chance of getting accepted, do not bundle more than one "feature" or bug fix in one PR. Doing so makes it very hard to accept it if one of the fixes has issues.

It's always best to create two smaller PRs than one big one.

### Style

Follow .editconfig
