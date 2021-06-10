import { compose, createStore, applyMiddleware } from "redux"
import logger from "redux-logger"
import { persistStore, persistReducer } from "redux-persist"
import thunkMiddleware from "redux-thunk"

import rootReducer from "@redux/reducers"

const middleware = [thunkMiddleware]

if (process.env.NODE_ENV === "development") {
  middleware.push(logger)
}

const persistConfig = {
  keyPrefix: "",
  key: "root",
  blacklist: ["search", "video"],
  debug: true,
  timeout: null,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = createStore(
  persistedReducer,
  compose(applyMiddleware(...middleware))
)

export const persistor = persistStore(store)

export default function initizalize() {
  return { persistor, store }
}
//-
