import {AsyncStorage} from 'react-native';
import {createStore} from 'redux';
import {persistStore, autoRehydrate} from 'redux-persist';
import { composeWithDevTools } from 'remote-redux-devtools';
import reducers from './redux/reducers';

export default function createStoreWithMiddlewares() {
  // use Command + Ctrl + Arrow Up to open remote redux dev tools
  const store = createStore(reducers, composeWithDevTools(), autoRehydrate());
  persistStore(store, {
    storage: AsyncStorage,
    whitelist: ['recorder'] // add reducer name that will sync automatically with async storage
  });
  return store;
}
