const express = require('express');
const router = express.Router();
const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const { authJwt } = require("../middlewares");
const musiccontroller = require("../controllers/music.controller");

 

router.post("/api/auth/signup",[
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );
  router.post("/api/auth/signin", controller.signin);
  
  router.post("/api/auth/signout", controller.signout);
  
  router.post("/api/music/add", [authJwt.verifyToken], musiccontroller.add);
  
  router.post("/api/music/list", [authJwt.verifyToken], musiccontroller.list);
  
  router.get("/api/music/one/:id", [authJwt.verifyToken], musiccontroller.fatchOne);
  
  router.get("/api/music/count", musiccontroller.count);

  router.put("/api/music/update", [authJwt.verifyToken], musiccontroller.update);

  router.post("/api/music/search", musiccontroller.search);

  router.delete("/api/music/delete/:id", [authJwt.verifyToken], musiccontroller.deleteData);

  module.exports = router;
  










