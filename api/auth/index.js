import {Router} from 'express';
import localPassport from './local/passport';
import facebookPassport from './facebook/passport';
import googlePassport from './google/passport';
import localRoute from './local';
import facebookRoute from './facebook';
import googleRoute from './google';

localPassport();
facebookPassport();
googlePassport();

const router = new Router();

router.use('/local', localRoute);
router.use('/facebook', facebookRoute);
router.use('/google', googleRoute);

export default router;