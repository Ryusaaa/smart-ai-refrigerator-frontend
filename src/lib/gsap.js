// client/src/lib/gsap.js
// Central GSAP plugin registration per update_v3.md Section 3.4

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Flip, Draggable, ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(useGSAP, Flip, Draggable, ScrollTrigger);

export { gsap, Flip, Draggable, ScrollTrigger, useGSAP };
