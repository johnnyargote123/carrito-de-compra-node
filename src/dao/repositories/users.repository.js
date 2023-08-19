import { sessionMongo } from "../mongo/session.mongo.js";
export class UserRepository {
  async updateUserRole(uid, newRole) {
    try {
      const user = await sessionMongo.findOneByEmail(uid);
  
      if (!user) {
        throw new Error("User not found");
      }
      if(newRole === 'PREMIUM'){
        const requiredDocuments = ["Identificacion", "Comprobante de domicilio", "Comprobante de estado de cuenta"];
  
        const hasAllRequiredDocuments = requiredDocuments.every(docName =>
          user.documents.some(doc => doc.name.includes(docName))
        );
        if (!hasAllRequiredDocuments) {
          throw new Error("User has not uploaded all required documents");
        }
          
      user.rol = newRole;
      await sessionMongo.updateUserByEmail(uid, { rol: user.rol });
  
      return user.rol;
      }
      if(newRole === 'USER'){
  
        user.rol = newRole;
        await sessionMongo.updateUserByEmail(uid, { rol: user.rol });
    
        return user.rol;
      }

    } catch (error) {
      throw new Error(` ${error} : Identificacion , Comprobante de domicilio, Comprobante de estado de cuenta`);
    }
  }

  async updateUserDocumentStatus(uid, uploadedDocuments) {
    try {

      const user = await sessionMongo.findOneByEmail(uid);
  
      const transformedDocuments = uploadedDocuments.document.map((document, index) => {
        return {
          id: index + 1,
          name: document.originalname,
          reference: document.filename,
          fieldname: document.fieldname,
        };
      });
  
      const transformedProfiles = uploadedDocuments.profile.map((profile, index) => {
        return {
          name: profile.originalname,
          reference: profile.filename,
          fieldname: profile.fieldname,
        };
      });
  
      const updatedDocuments = [];
      const updatedProfiles = [];
  
      for (const doc of transformedDocuments) {
        const existingDocument = user.documents.find(existingDoc => existingDoc.name === doc.name);
        if (!existingDocument) {
          const updatedDocument = {
            name: doc.name,
            reference: `http://localhost:8080/${doc.fieldname}/${doc.reference}`,
          };
  
          await sessionMongo.updateUserByEmail(uid, {
            $push: { documents: updatedDocument },
          });
  
          updatedDocuments.push(updatedDocument);
        }
      }
  
      for (const profile of transformedProfiles) {
        const existingProfile = user.documents.find(existingProf => existingProf.name === profile.name);
        if (!existingProfile) {
          const updatedProfile = {
            name: profile.name,
            reference: `http://localhost:8080/${profile.fieldname}/${profile.reference}`,
          };
  
          await sessionMongo.updateUserByEmail(uid, {
            $push: { documents: updatedProfile },
          });
  
          updatedProfiles.push(updatedProfile);
        }
      }
  
      return {
        updatedDocuments,
        updatedProfiles,
      };
    } catch (error) {
      console.error("Error updating documents:", error);
      return {
        updatedDocuments: [],
        updatedProfiles: [],
      };
    }
  }

  async addCartToUser(userId) {
    try {
      return await sessionMongo.addCartToUser(userId);
    } catch (error) {
      throw new Error("Error al agregar el carrito al usuario desde el repositorio");
    }
  }

  async  getAllUsers(){
    try {
      const users = await sessionMongo.getAllUsers()

      const simplifiedUserData = users.map(user => {
        return {
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          rol: user.rol

        };
      });
  
      return simplifiedUserData;
    } catch (error) {
      throw new Error("Error al llamar todos los usuarios");
    }
  }
  async cleanupInactiveUsers() {
  try {
    const resultMessage = await sessionMongo.deleteInactiveUsers();
    return resultMessage
  } catch (error) {
    console.error(error);
  }
}
}

export const userRepository = new UserRepository();
