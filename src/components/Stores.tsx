import { Button } from "../../components/ui/button";
import { Storelist } from "../shared/types";

export default function storeslist({stores}:Storelist){
    return (
        <>
       

        {stores.map((store) => (
            <div className="h-12 sm:h-10">
                <a 
                className="btn btn-primary sm:mb-0" 
                href={store.link} 
                rel="noopener" 
                target="_blank">
                    {store.src.trim().length>0?(<img
                    src={store.src}
                    alt={store.alt}
                    className="h-full object-contain"
                    />):null}
                </a>
            </div>
            ))}
            
        
        </>
    );
}
