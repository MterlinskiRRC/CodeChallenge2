import { Request, Response } from 'express';
import * as eventService from '../services/eventServices';
import { HTTP_STATUS } from '../../../constants/httpConstants';

export const getHealth = (req: Request, res: Response) => {
    res.status(HTTP_STATUS.OK).send({ status: 'ok', uptime: process.uptime(), timestamp: new Date().toISOString(), version: "1.0.0" });
};

export const getAllEvents = (req: Request, res: Response) => {
    const events = eventService.getAll();
    res.status(HTTP_STATUS.OK).send({ count: events.length, events });
};

export const getEventById = (req: Request, res: Response) => {
    const event = eventService.getById(Number(req.params.id));
    event ? res.status(HTTP_STATUS.OK).send(event) : res.status(HTTP_STATUS.NOT_FOUND).send({ error: "Not Found" });
};

export const getPopularity = (req: Request, res: Response) => {
    const event = eventService.getById(Number(req.params.id));
    if (!event) return res.status(HTTP_STATUS.NOT_FOUND).send({ error: "Not Found" });
    res.status(HTTP_STATUS.OK).send(eventService.getPopularityMetrics(event));
};

export const createEvent = (req: Request, res: Response) => {
    const { name, date, capacity } = req.body;
    if (!name || !date || capacity === undefined) return res.status(HTTP_STATUS.BAD_REQUEST).send({ error: "Missing fields" });
    res.status(HTTP_STATUS.CREATED).send(eventService.create({ name, date, capacity }));
};

export const updateEvent = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (!id) return res.status(HTTP_STATUS.BAD_REQUEST).send({ error: "ID required" });
    const updated = eventService.update(id, req.body);
    updated ? res.status(HTTP_STATUS.OK).send(updated) : res.status(HTTP_STATUS.NOT_FOUND).send({ error: "Not Found" });
};

export const deleteEvent = (req: Request, res: Response) => {
    const success = eventService.remove(Number(req.params.id));
    success ? res.status(HTTP_STATUS.OK).json({ message: "Deleted" }) : res.status(HTTP_STATUS.NOT_FOUND).json({ error: "Not Found" });
};