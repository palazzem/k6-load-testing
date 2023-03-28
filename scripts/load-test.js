import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  vus: 5,
  duration: '5m',
};

export default function () {
  const res = http.get('https://www.google.com');

  // Check if the result is a 200 or count it as failure
  check(res, {
    'status is 200': r => r.status === 200,
  });

  // Sleep the VU for 1 second to make stable number of requests
  // for the `options.duration` time
  sleep(1);
}
