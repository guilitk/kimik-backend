import { userService } from "../services/user.service.js";

class UserController {
  async register(req, res, next) {
    try {
      await userService.register(req.body);
      res.status(200).json({ message: "USER_CREATED" });
    } catch (error) {
      if (error.message === "WRONG_USERNAME_OR_PASSWORD") {
        res.status(401).json({ error: error.message });
      } else {
        res.status(500).json({ error: "SERVER_ERROR" });
      }
    }
  }
}

export const userController = new UserController();
