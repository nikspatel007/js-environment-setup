import 'whatwg-fetch';
import getBaseUrl from './baseUrl';

const baseUrl = getBaseUrl();

export function getUsers() {
  return get('users');
}

function get(url) {
  return fetch(baseUrl + url).then(onSucess, onError);
}

function onSucess(response) {
  return response.json();
}

function onError(error) {
  console.log(error);
}
