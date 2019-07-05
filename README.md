# HAXcms Webhooks Runner

This is a webhooks runner to trigger rebuilds deployed HAXcms sites.


## Installation

This is made up of a docker express server listening to webhooks from github, a docker redis server, and a node runner subscribed to redis server events.  The node runner runs on the host machine so we need to install node and p2m on the machine

```bash
cd /var/www
git clone https://github.com/heyMP/haxcms-webhooks.git
```

Add the WEBHOOKS_PATH to the environment variables
```bash
WEBHOOKS_PATH=/var/www/webhooks
```

