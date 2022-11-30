import React, { Suspense, useMemo, useRef, useState } from 'react';
import {
  Center,
  Cloud,
  Float,
  OrbitControls,
  Stars,
  Text3D,
  useTexture
} from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import THREE, { BufferAttribute, Fog, Mesh, MeshStandardMaterial } from 'three';
import { useControls, folder } from 'leva';
import { animated, useSpring, useSprings } from '@react-spring/three';

// function Particles({ count = 10000 }) {
//   const ref = useRef();

//   // cache this value, don't re-compute
//   const points = useMemo(() => {
//     const p = new Array(count).fill(0).map((v) => (0.5 - Math.random()) * 7.5);
//     console.log(p);
//     return new BufferAttribute(new Float32Array(p), 3);
//   }, [count]);

//   // useFrame((root, delta) => {
//   //   points.
//   // })

//   return (
//     <points>
//       <bufferGeometry>
//         <bufferAttribute attach={'attributes-position'} {...points} />
//       </bufferGeometry>
//       <pointsMaterial
//         size={0.01}
//         threshold={0.1}
//         color={0xff00ff}
//         sizeAttenuation={true}
//       />
//     </points>
//   );
// }

const EnterText = () => {
  const ref = useRef<Mesh>(null!);
  const about = useRef<Mesh>(null!);
  const shop = useRef<Mesh>(null!);
  const testimonials = useRef<Mesh>(null!);
  const contact = useRef<Mesh>(null!);

  const [active, setActive] = useState(false);
  const [aboutHovered, setAboutActive] = useState(false);
  const [shopHovered, setShopActive] = useState(false);
  const [testimonialHovered, setTestimonialActive] = useState(false);
  const [contactHovered, setContactActive] = useState(false);

  const TextAnimated = animated(Text3D);

  const { position, scale } = useSpring({
    position: active ? [0, 0, -50] : [0, 0, 0],
    scale: active ? 0.01 : 1
  });

  const matcap = useTexture('/matcaps/736655_D9D8D5_2F281F_B1AEAB.png');

  const menuItems = [
    {
      ref: about,
      text: 'About',
      position: active ? [-9, 3.5, 0] : [-20, 2, 0],
      color: aboutHovered ? 'hotpink' : 'white',
      delay: 50
    },
    {
      ref: shop,
      text: 'Shop',
      position: active ? [-9, 2.5, 0] : [-20, 2, 0],
      color: shopHovered ? 'orange' : 'white',
      delay: 100
    },
    {
      ref: contact,
      text: 'Contact',
      position: active ? [-9, 1.5, 0] : [-20, 2, 0],
      color: contactHovered ? 'gold' : 'white',
      delay: 200
    }
  ];

  const springs = useSprings(
    menuItems.length,
    menuItems.map(({ ref, ...config }) => config)
  );

  const handleHover = (key: string) => {
    switch (key) {
      case 'About':
        setAboutActive((state) => !state);
        break;
      case 'Shop':
        setShopActive((state) => !state);
        break;
      case 'Testimonials':
        setTestimonialActive((state) => !state);
        break;
      case 'Contact':
        setContactActive((state) => !state);
        break;
    }
  };

  return (
    <>
      <Suspense fallback={null}>
        <Center>
          <Float>
            <animated.mesh>
              <TextAnimated
                font={'/fonts/Neuropol_Regular.json'}
                bevelEnabled
                bevelSize={0.05}
                letterSpacing={0.1}
                ref={ref}
                size={1.5}
                onClick={() => setActive((state) => !state)}
                position={position}
                scale={scale}
              >
                Enter
                <meshMatcapMaterial matcap={matcap} />
              </TextAnimated>
            </animated.mesh>
          </Float>
        </Center>
      </Suspense>
      <group>
        {springs.map((spring, i) => (
          <animated.mesh>
            <TextAnimated
              ref={menuItems[i].ref}
              font={'/fonts/Neuropol_Regular.json'}
              bevelEnabled
              bevelSize={0.05}
              letterSpacing={0.1}
              size={0.5}
              position={spring.position}
              onPointerOver={() => handleHover(menuItems[i].text)}
              onPointerOut={() => handleHover(menuItems[i].text)}
            >
              {menuItems[i].text}
              <animated.meshMatcapMaterial
                matcap={matcap}
                color={spring.color}
              />
            </TextAnimated>
          </animated.mesh>
        ))}
      </group>
    </>
  );
};

function App() {
  const ThreeScene = () => {
    return (
      <Canvas camera={{ position: [0, 0, 8] }}>
        {/**
         * Cameras
         */}

        {/**
         * Lights
         */}
        <ambientLight />
        <directionalLight position={[3, 9, 1]} color="#fff" intensity={2} />
        {/**
         * Controls
         */}

        <OrbitControls makeDefault={true} />
        {/**
         * Helpers
         */}

        {/**
         * Environment
         */}
        <Stars />
        <Cloud opacity={0.1} speed={0.3} width={10} depth={1.5} segments={50} />

        {/**
         * Objects
         */}

        {/**
         * Text
         */}

        <EnterText />
      </Canvas>
    );
  };

  return (
    <div className="canvasFulLScreened">
      <ThreeScene />
    </div>
  );
}

export default App;
