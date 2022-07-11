function auth(req, res, next) {
  const token = req.header('X-auth-token');
  if (!token) res.status(401).send('Access denied no token provided');
}
