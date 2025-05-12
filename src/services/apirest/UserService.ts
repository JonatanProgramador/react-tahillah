import UserInterface from "../../interface/UserInterface";


class UserService {

    static readonly url = `${import.meta.env.VITE_URL_SERVER}/`;

    static async login(user:UserInterface) {
        const credentials = btoa(`${user.name}:${user.password}`);
        const response = await fetch(this.url+"login",{
            headers:{'Authorization': `Basic ${credentials}`,"Content-Type":"application/json"},
            credentials:'include'
         });
         return response.status === 200;

    }

    static async isLogin() {
        const response = await fetch(this.url+"isLogin",{
            credentials:'include'
         });
         return await response.text() === "true";
    }

    static async logout() {
        const response = await fetch(this.url+"logout",{
            credentials:'include'
         });
         return await response.text() === "true";
    }
}

export default UserService;