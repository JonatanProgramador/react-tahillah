
class PraiseService {

    static readonly url = "http://localhost:3000/praise/";

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
            headers:{"Content-Type":"application/json"}
         });
         return response.status;
    }

    static async updatePraise(input:string, id:string) {
        const response = await fetch(this.url+id,{
            method:"PATCH",
            body:input,
            headers:{"Content-Type":"application/json"}
         });
         return response.status;
    }

    static async deletePraise(id:string) {
        const response = await fetch(this.url+id,{method:"DELETE"});
        return response.status;
    }

}

export default PraiseService;