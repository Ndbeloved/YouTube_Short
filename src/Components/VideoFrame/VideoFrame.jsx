import { useEffect, useRef, useState } from 'react'
import './VideoFrame.css'

const VideoFrame = ({bgColor, videoBox, video}) => {
    const [singleMode, setSingleMode] = useState(true)
    const [startX, setStartX] = useState(0)
    const [deltaY, setDeltaY] = useState(0)
    const [isInViewport, setIsInViewport] = useState(false)
    const seeker = useRef(null)
    const bodySeeker = useRef(null)
    const videoRef = useRef(null)

    useEffect(()=>{
        if(!singleMode){
            videoBox.current.style.overflowY = 'hidden'
        }else{
            videoBox.current.style.overflowY = 'scroll'
        }
    }, [singleMode])

    useEffect(()=>{
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        }

        const observer = new IntersectionObserver(([entry])=>{
            console.log('intersecting')
            setIsInViewport(entry.isIntersecting)
        }, options)

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current);
            }
        };
    }, [videoRef])

    useEffect(() => {
        const videoCurrent = videoRef.current;
    
        if (isInViewport) {
          videoCurrent.play();
        } else {
          videoCurrent.pause();
        }
    
        return () => {
          videoCurrent.pause(); // Pause the video when component unmounts
        };
    }, [isInViewport]);



    const handleClosingTab = ()=>{
        if(!singleMode){
            setSingleMode(!singleMode)
        }
    }

    const handleMouseDown = (event)=>{
        setStartX(event.touches[0].clientX)
        setDeltaY(event.touches[0].clientY)
    }

    const handleMouseMove = (event)=>{
        const start =  startX
        const end = event.touches[0].clientX
        const moveY = event.touches[0].clientY
        if(deltaY + 30 < moveY || deltaY - 30 > moveY){
            //screen is moving in y-axis, neglect x movement
        }else{
            if(end-start > 50){
                const fullWidth = bodySeeker.current.offsetWidth
                let currentWidth = seeker.current.offsetWidth
                currentWidth += 5
                const percentage = Math.round((currentWidth / fullWidth) * 100)
                if(percentage <= 100){
                    seeker.current.style.width = `${percentage}%`
                }
            }
            else if(start - end > 50){
                const fullWidth = bodySeeker.current.offsetWidth
                let currentWidth = seeker.current.offsetWidth
                currentWidth -= 5
                const percentage = Math.round((currentWidth / fullWidth) * 100)
                if(percentage >= 0){
                    seeker.current.style.width = `${percentage}%`
                }
            }
        }
    }

    
    return (
        <div className={singleMode ? 'videoframe single' : 'videoframe'}>
            <div className={singleMode ? "main-video contain" : "main-video"} style={{background: bgColor}} onClick={handleClosingTab} onTouchStart={handleMouseDown} onTouchMove={handleMouseMove}>
                {singleMode ? (
                    <div className="action-btns">
                        <div id='wrapper'>
                            <i className='fa-regular fa-heart'></i>
                            10k
                        </div>
                        <div id='wrapper' onClick={()=>setSingleMode(!singleMode)}>
                            <i className='fa-regular fa-comment-dots'></i>
                            2k
                        </div>
                        <div id='wrapper'>
                            <i className='fa-solid fa-share'></i>
                            Share
                        </div>
                        <div id='wrapper'>
                            <i className='fa-solid fa-shuffle'></i>
                            Remix
                        </div>
                    </div>
                ) : <></>}

                <div className="seeker" ref={bodySeeker}>
                    <div className="bar" ref={seeker}></div>
                </div>

                <video muted loop controls={false} ref={videoRef}>
                    <source src={video} type="video/mp4"/>
                    Your browser does not support the video tag.
                </video>

            </div>
            <div className="comment">
                <div className="handle"></div>
            </div>


        </div>
    )
}

export default VideoFrame