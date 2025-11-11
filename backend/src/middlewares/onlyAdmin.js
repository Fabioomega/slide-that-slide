function onlyAdmin(req, res, next) {
  if (req.user.role !== 1) {
    return res.status(403).json({ message: "Acesso permitido somente para administradores" });
  }
  next();
}

module.exports = onlyAdmin;
