import { useGSAP } from '@gsap/react'
import React, { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/all"
import ModelView from './ModelView'
import { useState, useRef } from 'react'
import { yellowImg } from '../utils'

import * as THREE from 'three'

import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { models, sizes } from "../constants";
import { animateWithGsapTimeline } from '../utils/animations'

gsap.registerPlugin(ScrollTrigger)

const Model = () => {
  const [size, setSize] = useState('small');
  const [model, setModel] = useState({
    title: 'iPhone 15 Pro in Natural Titanium',
    color: ['#8F8A81', '#FFE7B9', '#6F6C64'],
    img: yellowImg,
  })

  //setup camera control for modelView
  const cameraControlSmall = useRef(); // useRef to store the camera control for the small model
  const cameraControlLarge = useRef(); // useRef to store the camera control for the large model

  // model 
  const small = useRef(new THREE.Group()); // useRef to store the small model
  const large = useRef(new THREE.Group()); // useRef to store the large model

  // rotation value of each model
  const [smallRotation, setSmallRotation] = useState(0); // state to store the rotation value of the small model
  const [largeRotation, setLargeRotation] = useState(0); // state to store the rotation value of the large model

  const timeline = gsap.timeline();

  useEffect(() => {
    // if it's large, animate to small
    if(size === 'large') {
      animateWithGsapTimeline(timeline, small, smallRotation, '#view1', '#view2', {
        transform: 'translateX(-100%)', //removed from the view
        duration: 2
      })
    }
    // if it's small, animate to large
    if(size ==='small') {
      animateWithGsapTimeline(timeline, large, largeRotation, '#view2', '#view1', {
        transform: 'translateX(0)', //added to the view
        duration: 2
      })
    }
  }, [size])

  useGSAP(() => {
    gsap.to('#heading', { 
        scrollTrigger: {
           trigger: '#heading',
           start: 'top 90%',
           end: 'bottom 90%',
           scrub: 1,   
           toggleActions: "play none none reverse"
        },
        y: 0,
        opacity: 1 
    })
  }, []);
    
  return (
    <section className="common-padding">
      <div className="screen-max-width">
        <h1 id="heading" className="section-heading">
          Take a closer look.
        </h1>

        <div className="flex flex-col items-center mt-5">
          <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
            {/* ModelView component for small model*/}
            <ModelView 
              index={1}
              groupRef={small}
              gsapType="view1"
              controlRef={cameraControlSmall}
              setRotationState={setSmallRotation}
              item={model}
              size={size}
            />  
            {/* ModelView component for small model*/}
            <ModelView 
              index={2}
              groupRef={large}
              gsapType="view2"
              controlRef={cameraControlLarge}
              setRotationState={setLargeRotation}
              item={model}
              size={size}
            />

            <Canvas
              className="w-full h-full"
              style={{
                position: 'fixed',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                overflow: 'hidden'
              }}
              eventSource={document.getElementById('root')}
            >
              <View.Port />
            </Canvas>
          </div>

          <div className="mx-auto w-full">
            <p className="text-sm font-light text-center mb-5">{model.title}</p>

            <div className="flex-center">
              <ul className="color-container">
                {models.map((item, i) => (
                  <li key={i} className="w-6 h-6 rounded-full mx-2 cursor-pointer" style={{ backgroundColor: item.color[0] }} onClick={() => setModel(item)} />
                ))}
              </ul>

              <button className="size-btn-container">
                {sizes.map(({ label, value }) => (
                  <span key={label} className="size-btn" style={{ backgroundColor: size === value ? 'white' : 'transparent', color: size === value ? 'black' : 'white'}} onClick={() => setSize(value)}>
                    {label}
                  </span>
                ))}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Model