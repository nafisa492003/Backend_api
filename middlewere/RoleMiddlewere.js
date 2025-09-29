const RoleMiddlewere = (requiredRole) => {
    return (req, res, next) => {
      if (!req.session.user || !req.session.user.isVerified) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      if (req.session.user.role !== requiredRole) {
        return res.status(403).json({ error: "Forbidden: Access denied" });
      }
      next();
    };
  };
  
  module.exports = RoleMiddlewere;
  