import { userRepository } from "../dao/repositories/users.repository.js";
import{mailService} from "../services/mail.service.js"
export async function updateUserRole(req, res) {
  try {
    const { uid } = req.params;
    const { route } = req;

    let newRole;
    if (route.path.includes("/premium")) {
      
      newRole = "PREMIUM";
    } else if (route.path.includes("/user")) {
      newRole = "USER";
    } else {
      return res.status(400).json({ message: "Invalid route" });
    }

    const user = await userRepository.updateUserRole(uid, newRole);

    res.json({ message: "User role updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: ` ${error} ` });
  }
}

export async function updateUserDocumentStatus(req, res) {
  try {
    
    const { uid } = req.params;
    const uploadedDocuments = req.files

    await userRepository.updateUserDocumentStatus(uid, uploadedDocuments)

    return res.status(200).json({ message: "Documentos subidos y estado del usuario actualizado." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al subir documentos y actualizar el estado del usuario." });
  }


}
export async function addCartToUser(req, res) {
  try {
    const { userId } = req.params;

    const resultMessage = await userRepository.addCartToUser(userId);

    res.status(200).json({ message: "Carrito agregado exitosamente", payload: resultMessage });
  } catch (error) {
    if (error.message === "Usuario no encontrado") {
      res.status(404).json({ message: "Error de usuario", payload: { error: error.message } });
    } else {
      console.error(error);
      res.status(500).json({ message: "Error del servidor", payload: { error: "Ocurrió un error en el servidor" } });
    }
  }
}

export async function getAllUsers(req, res) {
  try {
    const allUsers = await userRepository.getAllUsers();

    res.status(200).json({ message: "Lista de usuarios obtenida exitosamente", payload: allUsers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error del servidor", payload: { error: "Ocurrió un error en el servidor" } });
  }
}

export async function cleanupInactiveUsers(req, res) {
  try {
    const allUsers = await userRepository.cleanupInactiveUsers();
console.log(allUsers, 'aca')
    const deletedUsersEmails = allUsers.deletedEmails;

    for (const email of deletedUsersEmails) {
      const mailSubject = "Ups! Usuario eliminado";
      const mailContent = `<div><h1>Debido a su inactividad su usuario ha sido borrado</h1></div>`;
      
      await mailService.createTransportEmail(email, mailSubject, mailContent);
    }

    res.status(200).json({ message: "Usuarios inactivos durante últimos 20 minutos eliminados exitosamente", payload: allUsers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error del servidor", payload: { error: "Ocurrió un error en el servidor" } });
  }
}
