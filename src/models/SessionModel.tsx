import SessionInterface from "../interface/SessionInterface";
import SessionService from "../services/apirest/SessionService";


export default class SessionModel {
    static async createSession(session: SessionInterface):Promise<boolean> {
         const response = await SessionService.create(JSON.stringify(session));
         return response===200;
    }


    static async updateSession(session: SessionInterface):Promise<Boolean> {
        const response = await SessionService.update(JSON.stringify(session));
        return response===200;
    }

    static async getSession(id:string):Promise<SessionInterface> {
        return await SessionService.getById(id);
    }

     static async getSessionByUser():Promise<SessionInterface> {
        return await SessionService.getByUser();
    }
}