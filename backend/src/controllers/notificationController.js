import { query } from "../config/db.js";

export async function listNotifications(req, res) {
  const rows = await query("SELECT * FROM notifications WHERE user_id = :userId ORDER BY created_at DESC", { userId: req.user.id });
  res.json(rows);
}

export async function markNotificationRead(req, res) {
  await query("UPDATE notifications SET is_read = true WHERE id = :id AND user_id = :userId", {
    id: req.params.id,
    userId: req.user.id
  });
  res.json({ message: "Notification marked as read" });
}
