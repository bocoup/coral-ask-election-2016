import fetch from 'isomorphic-fetch';

const publicRoot = process.env.PUBLIC_URL;

export function getSummary() {
  return fetch(`${publicRoot}/data/mock-data.json`)
    .then(response => response.json());
}
