import { apab } from "../shared/data";
import { review } from "../shared/types";
import LineClamp from "./LineClamp";
import StoreIcons from "./storeicons";

export default function indireview(review:review){
        return ( 
            <div
    // key={review.}
    className="relative min-h-[15rem] w-60 sm:flex shadow-indigo-500/50 shadow-[0_0_15px_rgba(0,0,0,0.2)] rounded-2xl col-span-1 mx-5 xl:mx-4 mb-8  p-4 " >

    <div className="text-center">
        <h3 className="font-bold text-center m-4">{apab.get(review.appname)!}</h3>
        <LineClamp className="text-center" lines={2} text={review.review}/>
        {/* <h5 className="font-bold text-center m-4">{storename}</h5> */}

        {/* Removed the original flex div here as it's no longer needed for positioning StoreIcons */}
        {/* <div className="flex">
            <div className="absolute bottom-0">
                <StoreIcons {...{storename:review.storename,w:0}}/>
            </div>
        </div> */}
    </div>

    {/* This div is now absolutely positioned relative to the main card */}
    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
        <StoreIcons {...{storename:review.storename,w:0}}/>
    </div>
</div>
            );
}