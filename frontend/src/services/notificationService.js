import { ApiRequest } from "../config";

async function getUnreadNotifications(userId, token, pageNo) {
  const result = await ApiRequest(token).get(
    `/notifications/${userId}?pageNo=${pageNo}&pageSize=8`
  );
  return result.data || [];
}

async function deleteReadNotification(userId, token, id) {
  const result = await ApiRequest(token).delete(
    `/notifications/${userId}/${id}`
  );
  return result.data || [];
}

export const notificationService = {
  getUnreadNotifications,
  deleteReadNotification,
};
