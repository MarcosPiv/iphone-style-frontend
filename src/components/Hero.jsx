import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { heroVideo, smallHeroVideo } from '../utils';
import { useEffect, useState } from 'react';

const Hero = () => {
  // using useState to set the video source based on the window width, mobile or desktop
  const [videoSrc, setVideoSrc] = useState(window.innerWidth < 760 ? smallHeroVideo : heroVideo)
  // using useGSAP hook to animate the hero and cta elements
  useGSAP(() => {
    gsap.to('#hero', { 
      opacity: 1, // animate the opacity to 1
      delay: 2, // delay the animation by 2 seconds
      duration: 4, // animate the opacity over 4 second
      y: 30 // animate the y position to 30 down
    })
    gsap.to('#cta', { 
      opacity: 1, 
      y: -50, 
      delay: 2,
    })
  }, [])

  // function to set the video source based on the window width
  const handleVideoSrcSet = () => {
    if(window.innerWidth < 760) {
      setVideoSrc(smallHeroVideo)
    } else {
      setVideoSrc(heroVideo)
    }
  }
  // useEffect to add event listener for window resize
  useEffect(() => {
    window.addEventListener('resize', handleVideoSrcSet);
    // cleanup function to remove the event listener
    return () => {
      window.removeEventListener('reisze', handleVideoSrcSet)
    }
  }, [])

  return (
    <section className="w-full nav-height bg-black relative">
    <div className="h-5/6 w-full flex-center flex-col">
      <p id="hero" className="hero-title">iPhone 16 Pro</p>
      <div className="md:w-10/12 w-9/12">
        <video className="pointer-events-none" autoPlay muted playsInline={true} key={videoSrc}>
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>
    </div>
    {/* opacity 0 to animate */}
    <div id="cta" className="flex flex-col items-center opacity-0 translate-y-20">
        <a href="#highlights" className="btn">Buy</a>
        <p className="font-normal text-xl">From $999</p>
      </div>
    </section>
  )
}

export default Hero