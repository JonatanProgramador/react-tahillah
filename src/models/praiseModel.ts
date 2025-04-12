import PraiseInterface from "../interface/PraiseInterface";
import PraiseService from "../services/apirest/PraiseService";

class PraiseModel {

    static async getPraises() {
        return await PraiseService.getAllPraises() as PraiseInterface[];
    }

    static async getPraise(id: string) {
        return await PraiseService.getById(id) as PraiseInterface;
    }

    static async createPraise(praise: PraiseInterface) {
         await PraiseService.createPraise(JSON.stringify(praise));
    }

    static async updatePraise(praise: PraiseInterface) {
        await PraiseService.updatePraise(JSON.stringify(praise), praise._id);
    }

    static async deletePraise(id: string) {
        await PraiseService.deletePraise(id);
    }

}

export default PraiseModel;