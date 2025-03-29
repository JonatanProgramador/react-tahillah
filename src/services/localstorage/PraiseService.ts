import DATA from "../../data";
import DataInterface from "../../interface/DataInterface";

class PraiseService {
    

    static setPraises(praises?:DataInterface):void{
        localStorage.setItem('praises', JSON.stringify(praises?praises:DATA));
    }

    static getAllPraises() {
        const jsonPraises = localStorage.getItem('praises');
        if (jsonPraises) {
            return JSON.parse(jsonPraises);
        }
        return [];
    }
}

export default PraiseService;