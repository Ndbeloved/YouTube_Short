import { useRef } from 'react'
import './App.css'
import SearchBar from './Components/SearchBar/SearchBar'
import VideoFrame from './Components/VideoFrame/VideoFrame'
import video1 from './assets/Videos/video1.mp4-min.mp4'
import video2 from './assets/Videos/video2-min.mp4'
import video3 from './assets/Videos/video3.mp4-min.mp4'

function App() {
  
  const videoBox = useRef(null)
  const videoId = 'YJDZcGSR3xw'  
  // https://youtube.com/shorts/YJDZcGSR3xw?si=JizZvLOgdhuSQq9R
  return (
    <section className='App'>
      <SearchBar />
      <div className="videos" ref={videoBox}>
        <VideoFrame bgColor={'green'} videoBox={videoBox} video={video1} />
        <VideoFrame bgColor={'red'} videoBox={videoBox} video={video2}/>
        <VideoFrame bgColor={'orange'} videoBox={videoBox} video={video3}/>
      </div>
    </section>
  )
}

export default App
