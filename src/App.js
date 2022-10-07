import { useState } from "react";
import "./App.css";
import { Canvas} from "@react-three/fiber";
import { useGLTF, PerspectiveCamera, OrbitControls } from "@react-three/drei";
import {motion} from "framer-motion-3d"

export function Laptop({isOpen,...props}) {
  const { nodes, materials } = useGLTF('/laptop.glb')
  const variants = {
          open: {rotateX:(0 * Math.PI) / 180,
                  x:-0.03,
                  y:111.69,
                  z:2.84
                 },
          closed:{ rotateX:(105 * Math.PI) / 180,
                   x:0,
                   y:75,
                   z:39
                  }
  }
  return (
    <group {...props} dispose={null} position={[-0.03, -1, 0]}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.03} >
        <motion.group 
                    position={[-0.03, 111.69, 2.84]} 
                    scale={3.37}
                    initial={"closed"}
                    animate={isOpen?"open":"closed"}
                    transition={{
                      delay:0.5,
                      duration:1
                    }}
                    variants={variants}
                    
                    >
          <mesh geometry={nodes.Screen.geometry} material={materials.Namibia} position={[0.01, -33.13, -0.84]} scale={0.3} />
          <mesh geometry={nodes.Black_Inset.geometry} material={materials['Display Rim 1']} position={[0.01, -33.13, -0.84]} scale={0.3} />
          <mesh geometry={nodes.Rubber.geometry} material={materials['Display Rubber 1']} position={[0.01, -33.13, -0.84]} scale={0.3} />
          <mesh geometry={nodes.Screen_Back.geometry} material={materials['Body 2']} position={[0.01, -33.13, -0.84]} scale={0.3} />
        </motion.group>
        <mesh geometry={nodes.Keyboard.geometry} material={materials['Keyboard 2']} />
        <mesh geometry={nodes.Touch_Panel.geometry} material={materials['Touch Bar 1']} />
        <mesh geometry={nodes.Ports.geometry} material={materials['Ports 1']} />
        <mesh geometry={nodes.Touchpad.geometry} material={materials['Touchpad 1']} />
        <mesh geometry={nodes.Body.geometry} material={materials['Body 3']} />
      </group>
    </group>
  )
}


function App() {
  const [isOpen, setIsOpen] = useState(false)
  console.log(isOpen)
  return (
    <div className="container">
      <div className="preview">
        <Canvas>
          <ambientLight intensity={0.8} />
          <pointLight position={[10,10,50]} />
          <Laptop isOpen={isOpen}/>
          <PerspectiveCamera makeDefault position={[0,2,15]} />
          <OrbitControls />
        </Canvas>
      </div>
      <div className="footer">
        <label className="switch">
          <input
            type="checkbox"
            checked={isOpen}
            onClick={() => setIsOpen(!isOpen)}
          />
          <span className="slider"></span>
        </label>
      </div>
    </div>
  
  );
}

export default App;