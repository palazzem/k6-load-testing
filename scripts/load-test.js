import http from 'k6/http';
import { check } from 'k6';

export const options = {
  tags: {
    website: 'http://test.k6.io',
  },
  scenarios: {
    // Usage: uncomment the following configurations to enable the scenario.
    // If you need a new functions, just create a new one
    //
    // Scenario: equally hit all endpoints, one at a time
    // homepage: {
    //   executor: 'constant-vus',
    //   exec: 'homepage',
    //   vus: 5,
    //   duration: '2m',
    // },
    // login: {
    //   executor: 'constant-vus',
    //   exec: 'login',
    //   vus: 5,
    //   duration: '2m',
    //   startTime: '2m',
    // },
    //
    // Scenario: equally hit all endpoints together
    // homepage: {
    //   executor: 'constant-vus',
    //   exec: 'homepage',
    //   vus: 1,
    //   duration: '5m',
    // },
    // customerPage: {
    //   executor: 'constant-vus',
    //   exec: 'customerPage',
    //   vus: 1,
    //   duration: '1m',
    // },
    //
    // Scenario: stress test (try to break), 10 req/s granted (depending on available CPUs)
    // homepage: {
    //   executor: 'constant-arrival-rate',
    //   exec: 'homepage',
    //   preAllocatedVUs: 5,
    //   maxVUs: 50,
    //   duration: '60m',
    //   rate: 10,
    //   timeUnit: '1s',
    // },
  },
};

export function homepage () {
  const res = http.get('http://test.k6.io');

  check(res, {
    'status is 200': r => r.status === 200,
  });
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
}
