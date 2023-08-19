function updateUserRoleMiddleware (req, res, next) {
    const { email } = req.body;
    if (email !== 'adminCoder@coder.com') {
      req.body.rol = 'USER';
    }

    
    next();
  };
  
  export default updateUserRoleMiddleware;