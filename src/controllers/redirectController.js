import redisClient from "../config/redis.js";
import { findUrlByShortId } from "../models/urlModel.js";

export const redirectToLongUrl = async (req, res) => {
  try {
    const { shortId } = req.params;

    // Check if URL exists in Redis cache
    const cachedUrl = await redisClient.get(shortId);

    if (cachedUrl) {
      console.log("Cache hit for:", shortId);
      return res.redirect(cachedUrl);
      // return cachedUrl;
    }

    console.log("Cache miss, fetching from DB...");
    const url = await findUrlByShortId(shortId);

    if (!url) return res.status(404).send("Short URL not found");

    // Optional expiry check
    if (url.expiry && new Date(url.expiry) < new Date()) {
      return res.status(410).send("Link expired");
    }

    // Store in Redis for future lookups
    await redisClient.set(shortId, url.long_url, {
      EX: 60 * 60 * 24, // cache for 24 hours
    });

    console.log("Cached new entry:", shortId);

    // Redirect to original URL
    console.log("Redirecting to:", url.long_url);
    return res.redirect(url.long_url);
    // return url.long_url;
  } catch (err) {
    console.error("Redirect error:", err);
    return res.status(500).send("Internal Server Error");
  }
};
