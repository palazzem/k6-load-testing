import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  scenarios: {
    homepage: {
      executor: 'constant-vus',
      exec: 'homepage',
      vus: 1,
      duration: '5s',
    },
    login: {
      executor: 'constant-vus',
      exec: 'login',
      vus: 1,
      duration: '5s',
      startTime: '5s',
    },
  },
};

export function homepage () {
  const res = http.get('http://test.k6.io');

  check(res, {
    'status is 200': r => r.status === 200,
  });

  sleep(1);
}

export function login () {
  const params = {
    token: 'token',
    id: '42',
  }

  const res = http.get('http://test.k6.io/login', params);

  // Check if the result is a 200 or count it as failure
  check(res, {
    'status is 200': r => r.status === 200,
  });

  // Sleep the VU for 1 second to make stable number of requests
  // for the `options.duration` time
  sleep(1);
}
