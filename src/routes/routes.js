import { HAWAII_TRAILS_API } from '../constants';

// Trails
export const FEATURES_ROUTE = `${HAWAII_TRAILS_API}/api/features`;
export const TRAILS = `${HAWAII_TRAILS_API}/api/features/trails`;
export const PARKS = `${HAWAII_TRAILS_API}/api/features/parks`;
export function getFeaturePath(id) {
    return `${FEATURES_ROUTE}/feature/${id}`;
}
// POST
export const POST_CHECKIN_ROUTE = `${HAWAII_TRAILS_API}/api/check-in`;
