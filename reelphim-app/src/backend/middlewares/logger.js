export const logger = (req, res, next) => {
    const clientIP = req.headers['x-forwarded-for'] || req.ip;
    console.log(`[${new Date().toISOString()}] IP: ${clientIP}, Method: ${req.method}, Path: ${req.path}`);
    next();
  };
  