import { Router } from 'express';
import * as ctrl from '../controllers/eventController';

const router = Router();
router.get('/health', ctrl.getHealth);
router.get('/events', ctrl.getAllEvents);
router.get('/events/:id', ctrl.getEventById);
router.get('/events/:id/popularity', ctrl.getPopularity);
router.post('/events', ctrl.createEvent);
router.put('/events/:id', ctrl.updateEvent);
router.delete('/events/:id', ctrl.deleteEvent);

export default router;