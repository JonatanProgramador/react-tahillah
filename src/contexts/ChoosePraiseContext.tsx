import { createContext, ReactNode, useState } from "react";



interface props {
  children: ReactNode;
}

interface ThemeContextType {
  choosedPraise: string;
  setChosePraise: (value:string) => void;
}

export const chooseContext = createContext<ThemeContextType>({
  choosedPraise:"",
  setChosePraise: ()=>{}
});

export const ChoosePraiseConstext:React.FC<props> = ({children}) => {

    const [choosedPraise, setChosePraise] = useState("");

    return (<chooseContext.Provider value={{choosedPraise, setChosePraise}}>
        {children}
        </chooseContext.Provider>
    );
}



