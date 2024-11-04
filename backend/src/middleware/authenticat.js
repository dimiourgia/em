const jwtProvider = require("../config/jwtProvider");
const userService = require("../services/user.service");

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Unauthorized", message: "Token not provided" });
    }

    const userId = jwtProvider.getUserIdFromToken(token);
    console.log('user id from token', userId);

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized", message: "Invalid token" });
    }

    const user = await userService.findUserById(userId);

    if (!user) {
      return res.status(404).json({ error: "Not Found", message: "User not found" });
    }

    req.user = user;
    next();
    
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error", message: error.message });
  }
};


const isAdmin = (req, res, next) => {
  try {
    if (!req.user || req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: "Forbidden", message: "Access denied" });
    }
    next();
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};


const isGoogleIdToken = (token) => {
  if (!isJwt(token)) return false;

  try {
    // Decode the JWT to inspect its claims (payload)
    const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString('utf-8'));

    // Check for typical Google ID token fields
    return payload.iss === 'https://accounts.google.com' || payload.iss === 'accounts.google.com';
  } catch (e) {
    return false;
  }
};

const isJwt = (token) => {
  if (!token) return false;

  const parts = token.split('.');
  if (parts.length !== 3) return false;

  try {
    // Validate Base64 or Base64URL encoding
    const [header, payload] = parts;
    const base64UrlPattern = /^[A-Za-z0-9-_]+$/; // Base64URL characters
    return base64UrlPattern.test(header) && base64UrlPattern.test(payload);
  } catch (e) {
    return false;
  }
};



module.exports = { authenticate, isAdmin };
