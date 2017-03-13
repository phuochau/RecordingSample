import mockery from 'mockery'
require('react-native-mock/mock')
import m from 'module'
import path from 'path'
import fs from 'fs'
import * as rn from 'react-native'

// inject __DEV__ as it is not available when running through the tests
global.__DEV__ = true

// We enable mockery and leave it on.
mockery.enable()

// Silence the warnings when *real* modules load... this is a change from
// the norm.  We want to opt-in instead of opt-out because not everything
// will be mocked.
mockery.warnOnUnregistered(false)

// Mock any libs that get called in here
mockery.registerMock('react-native-vector-icons/MaterialIcons')

/*
* Sample mock Native Module
mockery.registerMock('react-native', {
  ...rn,
  NativeModules: {
    WebViewBridgeManager: {
      NavigationType: {}
    }
  }
})
*/

// Mock all images for React Native
const originalLoader = m._load
m._load = (request, parent, isMain) => {
  if (request.match(/.jpeg|.jpg|.png|.gif$/)) {
    return { uri: request }
  }

  if (request.match(/.html$/)) {  // ignore file types at here
    return null;
  }

  return originalLoader(request, parent, isMain)
}

var orig_findPath = m._findPath
m._findPath = function(request, paths) {
  var filename = orig_findPath(request, paths)
  if (!filename) {
    var cacheKey = JSON.stringify({request: request, paths: paths});
    for (var i = 0, PL = paths.length; i < PL; i++) {
      var basePath = path.resolve(paths[i], request);
      try {
        filename = fs.realpathSync(path.resolve(basePath, 'index.ios.js'), m._realpathCache);
      } catch (ex) {
        try {
          filename = fs.realpathSync(basePath + '.ios.js', m._realpathCache);
        } catch (ex) {

        }
      }
      if (filename) {
        m._pathCache[cacheKey] = filename;
      }
    }
  }
  return filename;
}
