import express from "express";
import userRoutes from "./user/user.route";
import adminRoutes from "./admin/admin.route";
import documentRoutes from "./document/document.route";
import subscriptionRoutes from "./subscription/subscription.route";
import chatRoutes from "./chat/chat.route";
import calendarRoutes from "./schedule/calendar.route";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/admin", adminRoutes);
router.use("/documents", documentRoutes);

// router.use("/subscription/webhook", express.raw({ type: "application/json" }));
router.use("/subscription", subscriptionRoutes);
router.use("/chat", chatRoutes);
router.use("/calendar", calendarRoutes);

export default router;
