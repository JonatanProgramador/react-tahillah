import SessionInterface from "../../interface/SessionInterface";


class SessionService {

     static readonly url = `${import.meta.env.VITE_URL_SERVER}/session/`;

     static async getByUser() {
        const response = await fetch(this.url+'searchByUser', {credentials:'include'});

        const session = response.status === 200?await response.json():null;
        return session as SessionInterface;
    }

    static async create(input:string) {
          const response = await fetch(this.url,{
            method:"POST",
            body:input,
            headers:{"Content-Type":"application/json"},
            credentials:"include"
         });
         return response.status;
    }

    static async update (input:string) {
      const response = await fetch(this.url,{
            method:"PATCH",
            body:input,
            headers:{"Content-Type":"application/json"},
            credentials:"include"
         });
         return response.status;
    }

    static async getById(id:string) {
        const response = await fetch(this.url+id);
        const session = await response.json();
        return session;
    }
}

export default SessionService;