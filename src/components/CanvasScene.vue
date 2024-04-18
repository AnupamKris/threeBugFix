<template>
  <div class="home">
    <TresCanvas clear-color="#d3ff9a" window-size id="canvas">
      <TresPerspectiveCamera :position="camPosition" :look-at="[0, 0, 0]" :fov="45" />
      <TresAmbientLight :intensity="10" />
      <OrbitControls />
      <primitive :object="scene" />
    </TresCanvas>
    <div class="down">
      <input v-model="slide" type="range" :min="0" :max="100" />
    </div>
  </div>
</template>

<script setup>
import {
  useGLTF,
  OrbitControls,
  useAnimations,
} from '@tresjs/cientos';
import * as THREE from 'three';

import boxes from '../boxes.glb';


const camPosition = [5, 5, 5];

const { scene, nodes, animations, materials } = await useGLTF(boxes);
const { actions, mixer } = useAnimations(animations, scene);

const slide = ref(0);

const playAnimation = () => {
  Object.keys(actions).forEach((key) => {
    actions[key].setLoop(THREE.LoopOnce, 0);
    actions[key].clampWhenFinished = true;
    actions[key].play();
  });
};


onMounted(() => {
  playAnimation();
});
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  position: relative;

  .down {
    position: absolute;
    z-index: 10;
    bottom: 50px;
    left: 50%;
    transform: translateX(-50%);

    button {
      // background: #d3ff9a;
      border: none;
      outline: none;
    }
  }
}
</style>