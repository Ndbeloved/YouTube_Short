import { useRef } from 'react'
import './App.css'
import SearchBar from './Components/SearchBar/SearchBar'
import VideoFrame from './Components/VideoFrame/VideoFrame'

function App() {
  
  const videoBox = useRef(null)
  const data = [
    {
      link: 'https://res.cloudinary.com/dyd7vmolq/video/upload/v1715119751/Shorts/tpbk2xb23nivk8nkv0go.mp4'
    },
    {
      link: 'https://res.cloudinary.com/dyd7vmolq/video/upload/v1715119752/Shorts/b0pgc2k4factjyr07tnb.mp4'
    },
    {
      link: 'https://res.cloudinary.com/dyd7vmolq/video/upload/v1715119753/Shorts/ealk2zhaj3fqnpamldvy.mp4'
    },
    {
      link: 'https://res.cloudinary.com/dyd7vmolq/video/upload/v1715119755/Shorts/iopos1tag4i6zwropt4g.mp4'
    },
    {
      link: 'https://res.cloudinary.com/dyd7vmolq/video/upload/v1715119755/Shorts/wequuct6szclu3fo4l17.mp4'
    },
    {
      link: 'https://res.cloudinary.com/dyd7vmolq/video/upload/v1715119764/Shorts/ngnasfdr1xugkn7lmsvw.mp4'
    },
  ]
  return (
    <section className='App'>
      <SearchBar />
      <div className="videos" ref={videoBox}>
        {data.map((elem, index)=>(
          <VideoFrame bgColor={'green'} videoBox={videoBox} video={elem.link} key={index}/>
        ))}
      </div>
    </section>
  )
}

export default App
