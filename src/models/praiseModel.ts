import PraiseInterface from "../interface/PraiseInterface";
import PraiseService from "../services/apirest/PraiseService";

class PraiseModel {

    static async getPraises() {
        return await PraiseService.getAllPraises() as PraiseInterface[];
    }

    static async getPraise(id: string) {
        return await PraiseService.getById(id) as PraiseInterface;
    }

    static async createPraise(praise: PraiseInterface):Promise<boolean> {
         const response = await PraiseService.createPraise(JSON.stringify(praise));
         return response===200;
    }

    static async updatePraise(praise: PraiseInterface):Promise<boolean> {
        const response = await PraiseService.updatePraise(JSON.stringify(praise), praise._id);
        return response===200;
    }

    static async deletePraise(id: string) {
        const response = await PraiseService.deletePraise(id);
        return response===200;
    }

    static async searchPraise(key:string, value:string, precise:boolean) {
        return await PraiseService.searchPraise(JSON.stringify({key:key, value:value, precise:precise})) as PraiseInterface[];
    }

}

export default PraiseModel;