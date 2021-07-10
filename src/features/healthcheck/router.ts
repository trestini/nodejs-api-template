import Router from 'koa-router';
const router = new Router();

import service from './service';

router.head("/ready", service.isReady);
router.head("/live", service.isLive);

export { router };

