export interface Event {
    id: number;
    name: string;
    date: string;
    capacity: number;
    registrationCount: number;
}

let events: Event[] = [
    { id: 1, name: "Tech Conference 2025", date: "2025-03-15T09:00:00.000Z", capacity: 200, registrationCount: 185 },
    { id: 2, name: "Startup Pitch Night", date: "2025-02-20T18:00:00.000Z", capacity: 50, registrationCount: 12 },
    { id: 3, name: "Web Dev Workshop", date: "2025-02-10T10:00:00.000Z", capacity: 30, registrationCount: 30 }
];

export const getAll = () => events;

export const getById = (id: number) => events.find(e => e.id === id);

export const create = (data: { name: string; date: string; capacity: number }) => {
    const newEvent: Event = { ...data, id: Date.now(), registrationCount: 0 };
    events.push(newEvent);
    return newEvent;
};

export const update = (id: number, data: Partial<Event>) => {
    const index = events.findIndex(e => e.id === id);
    if (index === -1) return null;
    events[index] = { ...events[index], ...data };
    return events[index];
};

export const remove = (id: number) => {
    const initialLength = events.length;
    events = events.filter(e => e.id !== id);
    return events.length !== initialLength;
};

export const getPopularityMetrics = (event: Event) => {
    const score = event.capacity === 0 ? 0 : Number(((event.registrationCount / event.capacity) * 100).toFixed(1));
    let tier = "New";
    if (score >= 90) tier = "Hot";
    else if (score >= 70) tier = "Popular";
    else if (score >= 50) tier = "Moderate";
    else if (score >= 25) tier = "Building";

    return {
        ...event,
        spotsRemaining: event.capacity - event.registrationCount,
        popularityScore: score,
        popularityTier: tier
    };
};