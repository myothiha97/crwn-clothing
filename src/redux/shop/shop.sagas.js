import { call, put, takeEvery } from "redux-saga/effects";

import ShopActionTypes from "./shop.types";

import {
  firestore,
  convertCollectionsSnashotToMap,
} from "../../firebase/firebase.utils";

import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure,
} from "./shop.actions";

export function* fetchCollectionsAsyncSaga() {
  console.log("---SAGA func run-----");
  try {
    const collectionRef = firestore.collection("collections");
    const snapshot = yield collectionRef.get();
    const collectionMap = yield call(convertCollectionsSnashotToMap, snapshot);
    yield put(fetchCollectionsSuccess(collectionMap));
  } catch (ex) {
    yield put(fetchCollectionsFailure(ex.message));
  }
}

export function* fetchCollectionsStartSaga() {
  yield takeEvery(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsyncSaga
  );
}
