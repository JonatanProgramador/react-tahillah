import PraiseInterface from "../../interface/PraiseInterface";

class PraiseService {


    static setPraise(praise?: PraiseInterface): void {
        const jsonPraises = localStorage.getItem('praises');
        if (praise) {
            let praises = jsonPraises ? JSON.parse(jsonPraises) : [] as Array<PraiseInterface>;
            const exitPraise = praises.find((pra: PraiseInterface) => pra._id === praise._id) ? true : false;
            
            if (!exitPraise) {
                praises.push(praise);
            } else {
                praises = praises.map((pra:PraiseInterface) => pra._id === praise._id ? praise : pra);
                console.log(praise);
            }
            localStorage.setItem('praises', JSON.stringify(praises));
        }
    }

    static getAllPraises() {
        const jsonPraises = localStorage.getItem('praises');
        if (jsonPraises) {
            return JSON.parse(jsonPraises) as Array<PraiseInterface>;
        }
        return [];
    }

    static deletePraise(id:number) {
        const jsonPraises = localStorage.getItem('praises');
        let praises = jsonPraises ? JSON.parse(jsonPraises) : [] as Array<PraiseInterface>;
        praises = praises.filter((pra:PraiseInterface) => pra._id !== id );
        localStorage.setItem('praises', JSON.stringify(praises));
    }
}

export default PraiseService;