'use client'

interface LlimageProps {
    url: string;
}

export default function Llimage({url}: LlimageProps){
    return(
        <div className="flex items-center justify-center w-full h-[400px] bg-transparent rounded-2xl overflow-hidden">
            <img
                src={url}
                className="max-w-full max-h-full object-contain rounded-2xl"
            />
        </div>
    );
}