import { ActionType } from './action';

function isPreloadReducer(isPreload = true, action = {}) {
  switch (action.type) {
    case ActionType.SET_IS_PRELOAD:
      return action.payload.isPreLoad;
    default:
      return isPreload;
  }
}

export default isPreloadReducer;
