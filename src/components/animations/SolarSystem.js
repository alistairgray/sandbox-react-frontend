import React, { useCallback, useMemo, useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import data from './lib/data.json';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

// Number of Planets
const numberOfPlanets = data.planets.length;

// Planet Position
const xInitialArray = data.planets.map(planet => planet.x);

// Planet Velocity
const vInitialArray = data.planets.map(planet => planet.v);

// Planet Mass
const masses = data.planets.map(planet => planet.m);

// TensorFlow
const xInitial = tf.tensor2d(xInitialArray, [numberOfPlanets, 3]);
const vInitial = tf.tensor2d(vInitialArray, [numberOfPlanets, 3]);
const G = tf.scalar(data.G);

// Calculate Acceleration (F/M = A)
function calcA(x){
    const unstackedX = tf.unstack(x);
    const accelerations = Array(numberOfPlanets).fill(tf.tensor1d([0,0,0]));

    for(let i = 0; i<numberOfPlanets; i++){
        const iX = unstackedX[i]
        for(let j = 0; j<numberOfPlanets; j++){
            const jX = unstackedX[j]
            const vector = tf.sub(jX, iX)
            const r = tf.norm(vector);

            const force = G.mul(masses[i])
                .mul(masses[j])
                .div(tf.pow(r,3));
            accelerations[i] = accelerations[i].add(force);
            accelerations[j] = accelerations[j].sub(force);

        } // for loop i
        accelerations[i] = accelerations[i].div(masses[i]);
    } // for loop i
    return tf.stack(accelerations);
} // calcA()



function SolarSystem(){
    const [pos, setPos] = useState(xInitialArray)
    const x = useRef(xInitial);
    const v = useRef(vInitial);
    // TODO: dtTensor throwing undefined errors
    const dtTensor = useMemo(() => tf.scalar(dt), [dt]);
    const compute = useCallback(() => {
        const [newX, newV] = tf.tidy(() => {
            const a = calcA(xInitial);
            const newX = x.current.add(tf.mul(v.current, dtTensor));
            const newV = v.current.add(tf.mul(a, dtTensor));

            return [newX, newV];
        });

        tf.dispose([x.current, v.current]);
        x.current = newX;
        v.current = newV;

        newX.array().then((newPos) => {
            setPos(newPos);
        });
    });
    

    return (
        <group>
            <ambientLight />
            <pointLight />
            <orbitControls arg={{camera}} />

            {pos.map((ppos, i) => {
                return (
                 <mesh key={`planet-${i}`} position={ppos}>
                     <sphereBufferGeometry 
                        args = {[i === 0 ? 0.2 : data.planets[i].r*50, 30, 30]}
                        attach="geometry"
                        />
                     <meshStandardMaterial 
                        color={data.planets[i].color} 
                        attach="material"
                        />
                </mesh>
                );
            })}
        </group>
    ); // return
}; // SolarSystem()

export default SolarSystem;