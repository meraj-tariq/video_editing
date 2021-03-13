/* eslint-disable import/no-cycle */
import { showLoading, hideLoading } from 'react-redux-loading-bar';

export function showLoadingBar() {
  import('../Store').then((module) => {
    const store = module.default;
    store.dispatch(showLoading());
  });
}

export function hideLoadingBar() {
  import('../Store').then((module) => {
    const store = module.default;
    store.dispatch(hideLoading());
  });
}
