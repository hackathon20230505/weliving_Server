import verify from "../auth/auth-jwt.js";


export const authJWT = (req, res, next) => {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split('Bearer ')[1];
      const result = verify(token);
      if (result.ok) {
        req.id = result.id;
        console.log("req",req)
        console.log("req.headers",req.headers)
        req.role = result.role;
        next();
      } else {
        res.status(401).send({
          ok: false,
          message: result.message,  
        });
      }
    }
  };

  
