import { authService } from "../services/auth.service.js";

class AuthController {
  async login(req, res, next) {
    try {
      const { accessToken, idToken, refreshToken } = await authService.login(
        req.body
      );
      res.status(200).json({ accessToken, idToken, refreshToken });
    } catch (error) {
      console.log(error);
      if (error.message === "WRONG_USERNAME_OR_PASSWORD") {
        res.status(401).json({ error: error.message });
      } else {
        res.status(500).json({ error: "SERVER_ERROR" });
      }
    }
  }

  async register(req, res, next) {
    try {
      await authService.register(req.body);
      res.status(200).json({ message: "USER_CREATED" });
    } catch (error) {
      if (error.message === "WRONG_USERNAME_OR_PASSWORD") {
        res.status(401).json({ error: error.message });
      } else {
        res.status(500).json({ error: "SERVER_ERROR" });
      }
    }
  }

  async refreshToken(req, res, next) {
    try {
      const { accessToken, idToken, refreshToken } =
        await authService.refreshToken(req.body);
      res.status(200).json({ accessToken, idToken, refreshToken });
    } catch (error) {
      if (error.message === "REFRESH_TOKEN_EXPIRED") {
        res.status(401).json({ error: error.message });
      } else {
        res.status(500).json({ error: "SERVER_ERROR" });
      }
    }
  }
}

export const authController = new AuthController();
