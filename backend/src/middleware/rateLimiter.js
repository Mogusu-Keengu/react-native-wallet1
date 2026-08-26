import ratelimiter from "./upstash.js";

const rateLimiter = async (req, res, next) => {
    try {
        // Fixed variable name here (added 'er')
        const { success } = await ratelimiter.limit("my-rate-limit");

        if (!success) {
            return res.status(429).json({
                message: "Too many requests, please try again later."
            });
        }

        next(); // CRITICAL: Allows the request to move on to your actual route!
    } catch (error) {
        console.log("Rate limit error", error);
        next(error);
    }
}

export default rateLimiter;