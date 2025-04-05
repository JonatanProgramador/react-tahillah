import DataInterface from "../../interface/DataInterface";

class PraiseService {


    static setPraise(praise?: DataInterface): void {
        const jsonPraises = localStorage.getItem('praises');
        if (praise) {
            let praises = jsonPraises ? JSON.parse(jsonPraises) : [] as Array<DataInterface>;
            const exitPraise = praises.find((pra: DataInterface) => pra.id === praise.id) ? true : false;
            
            if (!exitPraise) {
                praises.push(praise);
            } else {
                praises = praises.map((pra:DataInterface) => pra.id === praise.id ? praise : pra);
                console.log(praise);
            }
            localStorage.setItem('praises', JSON.stringify(praises));
        }
    }

    static getAllPraises() {
        const jsonPraises = localStorage.getItem('praises');
        if (jsonPraises) {
            return JSON.parse(jsonPraises) as Array<DataInterface>;
        }
        return [];
    }

    static deletePraise(id:number) {
        const jsonPraises = localStorage.getItem('praises');
        let praises = jsonPraises ? JSON.parse(jsonPraises) : [] as Array<DataInterface>;
        praises = praises.filter((pra:DataInterface) => pra.id !== id );
        localStorage.setItem('praises', JSON.stringify(praises));
    }
}

export default PraiseService;