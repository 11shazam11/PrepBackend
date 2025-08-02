import { v4 as uuid } from "uuid";
import Trial from "./trialSchema.js";

const MAX_FREE_USES = 5;

const usageLimiter = async (req, res, next) => {
  const cookies = req.cookies;
  let userId = cookies.userId;

  if (!userId) {
    // First-time user, create a cookie + DB record
    userId = uuid();
    res.cookie("userId", userId, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: "strict",
    });

    // Create a new trial record in MongoDB
    await Trial.create({
      userId,
      operations: 0,
    });

    console.log("🎉 New user assigned:", userId);
    req.userData = { userId, operations: 0 };
    return next();
  }

  // Existing user, fetch from DB
  const userData = await Trial.findOne({ userId });

  if (!userData) {
    console.log("🧨 Cookie exists but DB record not found. Creating new.");
    await Trial.create({
      userId,
      operations: 0,
    });
    req.userData = { userId, operations: 0 };
    return next();
  }

  if (userData.operations >= MAX_FREE_USES) {
    return res
      .status(403)
      .json({ message: "🛑 Free usage over. Please upgrade." });
  }

  req.userData = userData;
  next();
};

export default usageLimiter;
