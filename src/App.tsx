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
import { animated, useSpring, useSprings, useTrail } from '@react-spring/three';
import { Kiwi } from './fruit_components/Kiwi';
import { Apple } from './fruit_components/Apple';
import { Avocado } from './fruit_components/Avocado';
import { Ginger } from './fruit_components/Ginger';
import { Lime } from './fruit_components/Lime';
import { Lychee } from './fruit_components/Lychee';
import { Pears } from './fruit_components/Pears';
import { Pomegranate } from './fruit_components/Pomegranate';

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

interface FruitProps {
  shopIsActive: boolean;
  matcap: THREE.Texture;
}
const Fruits: React.FC<FruitProps> = ({ shopIsActive, matcap }) => {
  const fruitGroupRef = useRef<Mesh>(null!);
  const kiwi = useRef<Mesh>(null!);
  const apple = useRef<Mesh>(null!);
  const avocado = useRef<Mesh>(null!);
  const ginger = useRef<Mesh>(null!);
  const lime = useRef<Mesh>(null!);
  const lychee = useRef<Mesh>(null!);
  const pear = useRef<Mesh>(null!);
  const pomegranate = useRef<Mesh>(null!);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    kiwi.current.rotation.y = time / 4;
    apple.current.rotation.y = time / 4;
    avocado.current.rotation.y = time / 4;
    ginger.current.rotation.y = time / 4;
    lime.current.rotation.y = time / 4;
    lychee.current.rotation.y = time / 4;
    pear.current.rotation.y = time / 4;
    pomegranate.current.rotation.y = time / 4;
  });

  const fruits = [
    {
      text: 'Kiwi',
      ref: kiwi,
      fruit: <Kiwi />,
      scale: shopIsActive ? 20 : 0.001,
      position: shopIsActive ? [0, 2, 0] : [0, 10, 0],
      delay: 50
    },
    {
      text: 'Apple',
      ref: apple,
      fruit: <Apple />,
      scale: shopIsActive ? 20 : 0.001,
      position: shopIsActive ? [3, 2, 0] : [0, 10, 0],
      delay: 100
    },
    {
      text: 'Avocado',
      ref: avocado,
      fruit: <Avocado />,
      scale: shopIsActive ? 20 : 0.001,
      position: shopIsActive ? [6, 2, 0] : [0, 10, 0],
      delay: 150
    },
    {
      text: 'Ginger',
      ref: ginger,
      fruit: <Ginger />,
      scale: shopIsActive ? 3 : 0.001,
      position: shopIsActive ? [0, -1, 0] : [0, 10, 0],
      delay: 200
    },
    {
      text: 'Lime',
      ref: lime,
      fruit: <Lime />,
      scale: shopIsActive ? 20 : 0.001,
      position: shopIsActive ? [3, -1, 0] : [0, 10, 0],
      delay: 250
    },
    {
      text: 'Lychee',
      ref: lychee,
      fruit: <Lychee />,
      scale: shopIsActive ? 20 : 0.001,
      position: shopIsActive ? [6, -1, 0] : [0, 10, 0],
      delay: 300
    },
    {
      text: 'Asian Pear',
      ref: pear,
      fruit: <Pears />,
      scale: shopIsActive ? 20 : 0.001,
      position: shopIsActive ? [0, -4, 0] : [0, 10, 0],
      delay: 350
    },
    {
      text: 'Pomegranate',
      ref: pomegranate,
      fruit: <Pomegranate />,
      scale: shopIsActive ? 20 : 0.001,
      position: shopIsActive ? [3, -4, 0] : [0, 10, 0],
      delay: 400
    }
  ];

  const springs = useSprings(
    fruits.length,
    fruits.map(({ ref, ...config }) => config)
  );

  return (
    <group ref={fruitGroupRef}>
      {springs.map((spring, i) => (
        <animated.group
          position={spring.position}
          scale={spring.scale}
          ref={fruits[i].ref}
        >
          {fruits[i].fruit}
        </animated.group>
      ))}
    </group>
  );
};

const EnterText = () => {
  const ref = useRef<Mesh>(null!);
  const about = useRef<Mesh>(null!);
  const shop = useRef<Mesh>(null!);
  const contact = useRef<Mesh>(null!);

  const [active, setActive] = useState(false);
  const [aboutHovered, setAboutHovered] = useState(false);
  const [shopHovered, setShopHovered] = useState(false);
  const [contactHovered, setContactHovered] = useState(false);

  const [shopIsActive, setShopActive] = useState(false);
  const [aboutIsActive, setAboutActive] = useState(false);
  const [contactIsActive, setContactActive] = useState(false);

  const TextAnimated = animated(Text3D);
  const matcap = useTexture('/matcaps/736655_D9D8D5_2F281F_B1AEAB.png');

  const { position, scale } = useSpring({
    position: active ? [0, 0, -50] : [0, 0, 0],
    scale: active ? 0.01 : 1
  });

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
        setAboutHovered((state) => !state);
        break;
      case 'Shop':
        setShopHovered((state) => !state);
        break;
      case 'Contact':
        setContactHovered((state) => !state);
        break;
    }
  };

  const handleMenuClick = (key: string) => {
    switch (key) {
      case 'About':
        setAboutActive((state) => !state);
        break;
      case 'Shop':
        setShopActive((state) => !state);
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
              onClick={() => handleMenuClick(menuItems[i].text)}
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
      <Fruits shopIsActive={shopIsActive} matcap={matcap} />
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
        {/* <Cloud opacity={0.1} speed={0.3} width={10} depth={1.5} segments={50} /> */}

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
