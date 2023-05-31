'use client'
// import { Carousel } from '@trendyol-js/react-carousel';
import Carousel  from './Carousel/Carousel';
import './Carousel/Carousel.css';
import '../../styles/globals.css'


export default function Caro(){
    return(
        <>
        {/* // <Carousel showArrows={true} dynamicHeight={false} > */}
        <div style={{width:1000}} className='hidden sm:block'>

        <Carousel show={1}>

            <div>

                <div className="screen1">
                    <a href='https://play.google.com/store/apps/developer?id=Vishnu+N+K'
                    rel="noopener" 
                    target="_blank">
                        <img  src="https://cdn.jsdelivr.net/gh/visnkmr/hv2static@main/gp.png"></img>
                    </a>
                </div>
                </div><div>

                <div className="screen2">
                <a href='https://www.amazon.com/gp/mas/dl/android?p=io.github.visnkmr.bapl&showAll=1'
                    rel="noopener" 
                    target="_blank">
                    <img src="https://cdn.jsdelivr.net/gh/visnkmr/hv2static@main/amz.png"></img>
                </a>
                </div>

            </div>
            <div>

                <div className="screen3">
                    <a href='https://github.com/visnkmr'
                    rel="noopener" 
                    target="_blank">
                        <img src="https://cdn.jsdelivr.net/gh/visnkmr/hv2static@main/gho.png"></img>
                    </a>
                </div>
            </div>
        </Carousel>
        </div>

            {/* <div>

            <div className="screen">
                <img src="http://10.0.0.8:5000/gp.png"></img>
            </div>
            </div>
            <div>

            <div className="screen">
                <img src="http://10.0.0.8:5000/gp.png"></img>
            </div>
            </div> */}
            {/* // </Carousel> */}
        </>
                );
}