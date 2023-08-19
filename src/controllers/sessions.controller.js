import { sessionService } from "../services/session.service.js";
import { mailService } from "../services/mail.service.js";
export async function login(req, res) {
  try {
    const { email, password, rol } = req.body;
    console.log(rol,'control-sesion')
    const user = await sessionService.loginUser(email, password, rol);
    req.session.user = user;
    req.logger.debug("User logged in successfully");
    return res.send({
      status: "success",
      message: "Logged in",
      payload: req.session.user,
    });
  } catch (error) {
    req.logger.error("Error occurred during login");
    return res
      .status(500)
      .send({ status: "error", error: "Internal server error" });
  }
}

export async function resetPassword(req, res) {
  try {
    const { email, password } = req.body;
    const token = req.params.token;
    await sessionService.resetPassUser(email, password, token);
    req.logger.debug("password changed successfully");
    return res.send({ status: "success", message: "password changed" });
  } catch (error) {
    req.logger.error("Error occurred during reset paasword");
    return res
      .status(500)
      .send({ status: "error", error: "Internal server error" });
  }
}

export async function forgotPassword(req, res) {
  try {
    const { email } = req.body;
    const user = await sessionService.forgotPasswordUser(email);
    if (user) {
      mailService.sendPasswordResetEmail(email);

      return res.send({
        status: "success",
        message: "Email find",
        payload: email,
      });
    }
  } catch (error) {
    req.logger.error("Error occurred during forgot password");
    return res
      .status(500)
      .send({ status: "error", error: "Internal server error" });
  }
}

export async function logout(req, res) {
  try {
    const logoutData = req.session;
    console.log(logoutData, 'logout');
    await sessionService.logoutUser(logoutData);
    req.logger.debug("User logged out successfully");
    res.clearCookie("connect.sid");

    return res.send({
      status: "success",
      message: "User logged out successfully"
    });
  } catch (error) {
    req.logger.error("Error occurred during logout");
    return res.status(500).send({ status: "error", error: "Internal server error" });
  }
}
export async function register(req, res) {
  try {
    const { first_name, last_name, email, age, password, rol } = req.body;
    await sessionService.registerUser(
      first_name,
      last_name,
      email,
      age,
      password,
      rol.toUpperCase()
    );
    req.logger.debug("User registered successfully");
    return res.send({ status: "success", message: "User registered" });
  } catch (error) {
    req.logger.error("Error occurred during user registration: " + error);
    return res
      .status(500)
      .send({ status: "error", error: "Internal server error" });
  }
}

export function githubAuth(req, res) {
  sessionService.githubAuth();
  req.logger.warning("GitHub authentication initiated");
}

export function githubCallback(req, res) {
  req.session.user = sessionService.githubCallback(req);
  res.redirect("/");
}

export async function deleteUserByName(req, res) {
  const { email } = req.params;

  try {
    const result = await sessionService.deleteUserByName(email);
    return res.send({ status: "success", message: "User deleted" });
  } catch (error) {
    res.status(500).send({ status: "error", error: "Internal server error" });
  }
}
