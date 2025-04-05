import PraiseInterface from "../interface/PraiseInterface";
import PraiseService from "../services/apirest/PraiseService";

class PraiseModel {


    static async getPraises() {
        return await PraiseService.getAllPraises() as PraiseInterface[];
    }

    static async getPraise(id: number) {
        return await PraiseService.getById(id) as PraiseInterface;
    }

    static async createPraise(praise: PraiseInterface) {
         await PraiseService.createPraise(JSON.stringify(praise));
    }

    static async updatePraise(praise: PraiseInterface) {
        await PraiseService.updatePraise(JSON.stringify(praise), praise.id);
    }

    static async deletePraise(id: number) {
        await PraiseService.deletePraise(id);
    }


}

export default PraiseModel;