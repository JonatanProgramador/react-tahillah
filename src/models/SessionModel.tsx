import SessionInterface from "../interface/SessionInterface";
import SessionService from "../services/apirest/SessionService";


export default class SessionModel {
    static async createSession(session: SessionInterface):Promise<boolean> {
         const response = await SessionService.create(JSON.stringify(session));
         return response===200;
    }


    static async updateSession(session: SessionInterface) {
        const response = await SessionService.update(JSON.stringify(session));
        return response===200;
    }
}