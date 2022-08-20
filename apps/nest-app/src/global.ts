import * as dns from 'node:dns';

export let nestAppIp: undefined | string = undefined;

dns.resolve4('crawler-app', (err, addresses) => {
  if (err) {
    console.error(err);
    return;
  }

  nestAppIp = addresses[0];
});
