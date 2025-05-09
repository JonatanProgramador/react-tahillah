
class PraiseService {

    static readonly url = `${import.meta.env.VITE_URL_SERVER}/praise/`;

    static async getAllPraises() {
    
        const response = await fetch(this.url);
        const praises = await response.json();
        return praises;
    }

    static async getById(id:string) {
        const response = await fetch(this.url+id);
        const praise = await response.json();
        return praise;
    }

    static async createPraise(input:string){
         const response = await fetch(this.url,{
            method:"POST",
            body:input,
            headers:{"Content-Type":"application/json"},
            credentials:"include"
         });
         return response.status;
    }

    static async updatePraise(input:string, id:string) {
        const response = await fetch(this.url+id,{
            method:"PATCH",
            body:input,
            headers:{"Content-Type":"application/json"},
            credentials:"include"
         });
         return response.status;
    }

    static async deletePraise(id:string) {
        const response = await fetch(this.url+id,{method:"DELETE", credentials:"include"});
        return response.status;
    }

    static async searchPraise(input:string) {
        const response = await fetch(this.url+"search",{
            method:"POST", 
            headers:{"Content-Type":"application/json"},
            body:input
        });
        const praises = await response.json();
        return praises;
    }

}

export default PraiseService;