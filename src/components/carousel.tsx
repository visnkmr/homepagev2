'use client'
// import { Carousel } from '@trendyol-js/react-carousel';
import Carousel  from './Carousel/Carousel';
import './Carousel/Carousel.css';
import '../../styles/globals.css'
import { LazyLoadImage } from 'react-lazy-load-image-component';


export default function Caro(){
    return(
        <>
        {/* // <Carousel showArrows={true} dynamicHeight={false} > */}
        <div style={{width:1000}} className='hidden sm:block '>

        <Carousel show={2} infiniteLoop={true} withIndicator={true}>

            <div>

                <div className="screen1">
                    <a href='https://play.google.com/store/apps/developer?id=Vishnu+N+K' aria-label="google play page screenshot"
                    rel="noopener" 
                    target="_blank">
                        <picture>
                            <source media='(max-width: 767px)'
                                    sizes='1px'
                                    srcSet='blank.gif 1w'/>
                            <source media='(min-width: 768px)' 
                                    sizes='300px' 
                                    srcSet='
                                    https://cdn.jsdelivr.net/gh/visnkmr/visnkmr.github.io@main/images/gplay.webp 600w,                
                                    https://cdn.jsdelivr.net/gh/visnkmr/visnkmr.github.io@main/images/gplay.webp 300w'/>
                            <LazyLoadImage src='https://cdn.jsdelivr.net/gh/visnkmr/visnkmr.github.io@main/images/gplay.webp' alt='google play profile of vishnu n k'/>
                        </picture>
                        {/* <img  src="https://cdn.jsdelivr.net/gh/visnkmr/visnkmr.github.io@main/images/gp.png"></img> */}
                    </a>
                </div>
                </div><div>

                <div className="screen2">
                <a href='https://www.amazon.com/gp/mas/dl/android?p=io.github.visnkmr.bapl&showAll=1'
                    rel="noopener" aria-label='amazon appstore page screenshot'
                    target="_blank">
                        <picture>
                            <source media='(max-width: 767px)'
                                    sizes='1px'
                                    srcSet='blank.gif 1w'/>
                            <source media='(min-width: 768px)' 
                                    sizes='300px' 
                                    srcSet='
                                    https://cdn.jsdelivr.net/gh/visnkmr/visnkmr.github.io@main/images/amzstore.webp 600w,                
                                    https://cdn.jsdelivr.net/gh/visnkmr/visnkmr.github.io@main/images/amzstore.webp 300w'/>
                            <LazyLoadImage src='https://cdn.jsdelivr.net/gh/visnkmr/visnkmr.github.io@main/images/amzstore.webp' alt='amazon profile of vishnu n k'/>
                        </picture>
                    {/* <img src="https://cdn.jsdelivr.net/gh/visnkmr/visnkmr.github.io@main/images/amz.png"></img> */}
                </a>
                </div>

            </div>
            <div>

                <div className="screen3">
                    <a href='https://github.com/visnkmr'
                    aria-label='github page screenshot'
                    rel="noopener" 
                    target="_blank">
                        <picture>
                            <source media='(max-width: 767px)'
                                    sizes='1px'
                                    srcSet='blank.gif 1w'/>
                            <source media='(min-width: 768px)' 
                                    sizes='300px' 
                                    srcSet='
                                    https://cdn.jsdelivr.net/gh/visnkmr/visnkmr.github.io@main/images/ghub.webp 600w,                
                                    https://cdn.jsdelivr.net/gh/visnkmr/visnkmr.github.io@main/images/ghub.webp 300w'/>
                            <LazyLoadImage src='https://cdn.jsdelivr.net/gh/visnkmr/visnkmr.github.io@main/images/ghub.webp' alt='github profile of vishnu n k'/>
                        </picture>
                        {/* <img src="https://cdn.jsdelivr.net/gh/visnkmr/visnkmr.github.io@main/images/gho.png"></img> */}
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