import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { rightImg, watchImg } from "../utils"
import { ScrollTrigger } from "gsap/all"
import VideoCarousel from "./VideoCarousel"
gsap.registerPlugin(ScrollTrigger)

const Highlights = () => {

  useGSAP(() => {
    gsap.to('#title', {
      scrollTrigger: {
        trigger: '#title',
        start: 'top 85%', // when the top of the trigger hits the 80% top of the viewport
        end: 'bottom 60%',
        scrub: 2, // smooth scrubbing, takes 1 second to reach the end value
       // markers: true, // optional: add markers to the scroller to debug
       toggleActions: "play none none reverse" // play the animation when the trigger is visible, reverse when it is not
      },
      opacity: 1, 
      y: 0 ,
      ease: "power2.out"
      })
    gsap.to('.link', {
      scrollTrigger: {
        trigger: '.link',
        start: 'top 85%',
        end: 'bottom 60%',
        scrub: 2,
        toggleActions: "play none none reverse"
      },
      opacity: 1,
      y: 0, 
      duration: 1,
      stagger: 0.25 ,
       ease: "back.out(1.7)"
    })
  }, [])

  return (
    <section id="highlights" className="w-screen overflow-hidden h-full common-padding bg-zinc">
      <div className="screen-max-width">
        <div className="mb-12 w-full md:flex items-end justify-between">
          <h1 id="title" className="section-heading">Get the highlights.</h1>
          
          <div className="flex flex-wrap items-end gap-5">
            <p className="link">
              Watch the film
              <img src={watchImg} alt="watch" className="ml-2" />
            </p>
            <p className="link">
              Watch the event
              <img src={rightImg} alt="right" className="ml-2" />
            </p>
          </div>
        </div>
      </div>
    <VideoCarousel />
    </section>
  )
}

export default Highlights