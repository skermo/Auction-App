import { EventSourcePolyfill } from "ng-event-source";
import { BASE_URL } from "../config";

const newNotificationsEventSourcePolyfill = (userId, token) => {
  return new EventSourcePolyfill(
    `${BASE_URL}/notifications/add-connection/${userId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
      heartbeatTimeout: 60000 * 15,
    }
  );
};

const newItemUpdateEventSourcePolyfill = () => {
  return new EventSourcePolyfill(`${BASE_URL}/items/add-connection`, {
    heartbeatTimeout: 60000 * 15,
  });
};

export const eventSourceService = {
  newNotificationsEventSourcePolyfill,
  newItemUpdateEventSourcePolyfill,
};
