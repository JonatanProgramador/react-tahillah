import DataInterface from "../interface/DataInterface";
import PraiseService from "../services/apirest/PraiseService";

class PraiseModel {


    static async getPraises() {
        return await PraiseService.getAllPraises() as DataInterface[];
    }

    static async getPraise(id: number) {
        return await PraiseService.getById(id) as DataInterface;
    }

    static async createPraise(praise: DataInterface) {
         await PraiseService.createPraise(JSON.stringify(praise));
    }

    static async updatePraise(praise: DataInterface) {
        await PraiseService.updatePraise(JSON.stringify(praise));
    }

    static async deletePraise(id: number) {
        await PraiseService.deletePraise(id);
    }


}

export default PraiseModel;