import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  scenarios: {
    homepage: {
      executor: 'constant-vus',
      exec: 'homepage',
      vus: 1,
      duration: '5m',
    },
    login: {
      executor: 'constant-vus',
      exec: 'login',
      vus: 1,
      duration: '5m',
      startTime: '5m',
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

  check(res, {
    'status is 200': r => r.status === 200,
  });

  sleep(1);
}
