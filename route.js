let express = require('express');
let controller = require('./controller');
let apiRoutes = express.Router();

apiRoutes.get('/home',                 controller.home);

apiRoutes.post('/register',                controller.register);
apiRoutes.post('/login',                  controller.login);

apiRoutes.use(controller.middleware);

apiRoutes.put('/update',                   controller.update);






module.exports = apiRoutes;
  
