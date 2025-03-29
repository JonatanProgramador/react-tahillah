import DataInterface from "../interface/DataInterface";
import PraiseService from "../services/localstorage/PraiseService";

class PraiseModel {
    private praises: DataInterface[];

    constructor() {
        PraiseService.setPraises();
        this.praises = PraiseService.getAllPraises();
    }

    getPraises() {
        return this.praises;
    }

    setPraise(praise:DataInterface) {
        this.praises.push(praise);
    }
}

export default PraiseModel;