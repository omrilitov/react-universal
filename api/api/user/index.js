import {AsyncRouter} from 'express-async-router';
import * as controller from './user.controller';
import {isAuthenticated} from '../../auth/auth.service';

const router = new AsyncRouter();

router.get('/', isAuthenticated(), controller.index);
router.post('/', controller.create);
router.get('/me', isAuthenticated(), controller.me);
router.put('/:id/password', isAuthenticated(), controller.changePassword);
router.get('/:id', isAuthenticated(), controller.show);
router.put('/:id', isAuthenticated(), controller.update);
router.delete('/:id', isAuthenticated(), controller.destroy);

export default router;
