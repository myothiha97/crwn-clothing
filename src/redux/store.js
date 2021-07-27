import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import { fetchCollectionsStartSaga } from "./shop/shop.sagas";
import thunk from "redux-thunk";

import logger from "redux-logger";

import rootReducer from "./root-reducer";

const sagaMiddleWare = createSagaMiddleware();

const middlewares = [logger, thunk];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

// sagaMiddleWare.run(fetchCollectionsStartSaga);

export const persistor = persistStore(store);

export default store;
