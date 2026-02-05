import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function WaveCanvas() {
    const containerRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;

        // Scene - Light theme
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf5f5f7);
        scene.fog = new THREE.FogExp2(0xf5f5f7, 0.02);

        // Camera
        const camera = new THREE.PerspectiveCamera(
            60,
            container.offsetWidth / container.offsetHeight,
            1,
            1000
        );
        camera.position.set(0, 12, 30);
        camera.lookAt(0, 0, 0);

        // Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(container.offsetWidth, container.offsetHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Geometry
        const geometry = new THREE.PlaneGeometry(120, 60, 100, 60);

        // Material 1: Cyan layer
        const material1 = new THREE.MeshBasicMaterial({
            color: 0x06b6d4,
            wireframe: true,
            transparent: true,
            opacity: 0.35,
        });

        const plane1 = new THREE.Mesh(geometry, material1);
        plane1.rotation.x = -Math.PI / 2.2;
        plane1.position.y = -5;
        scene.add(plane1);

        // Material 2: Indigo layer
        const material2 = new THREE.MeshBasicMaterial({
            color: 0x6366f1,
            wireframe: true,
            transparent: true,
            opacity: 0.25,
        });

        const geometry2 = new THREE.PlaneGeometry(120, 60, 100, 60);
        const plane2 = new THREE.Mesh(geometry2, material2);
        plane2.rotation.x = -Math.PI / 2.2;
        plane2.position.y = -7;
        scene.add(plane2);

        // Material 3: Slate layer
        const material3 = new THREE.MeshBasicMaterial({
            color: 0x475569,
            wireframe: true,
            transparent: true,
            opacity: 0.15,
        });

        const geometry3 = new THREE.PlaneGeometry(120, 60, 100, 60);
        const plane3 = new THREE.Mesh(geometry3, material3);
        plane3.rotation.x = -Math.PI / 2.2;
        plane3.position.y = -9;
        scene.add(plane3);

        // Store original positions
        const positionAttribute1 = geometry.attributes.position;
        const positionAttribute2 = geometry2.attributes.position;
        const positionAttribute3 = geometry3.attributes.position;
        const count = positionAttribute1.count;

        const originalPositions: { x: number; y: number; z: number }[] = [];
        for (let i = 0; i < count; i++) {
            originalPositions.push({
                x: positionAttribute1.getX(i),
                y: positionAttribute1.getY(i),
                z: positionAttribute1.getZ(i),
            });
        }

        let time = 0;

        function animate() {
            animationRef.current = requestAnimationFrame(animate);
            time += 0.008;

            for (let i = 0; i < count; i++) {
                const orig = originalPositions[i];
                const wave1 = Math.sin(orig.x * 0.15 + time) * 2.5;
                const wave2 = Math.cos(orig.y * 0.25 + time * 0.7) * 1.2;
                const wave3 = Math.sin(orig.x * 0.1 + orig.y * 0.1 + time * 1.1) * 0.8;

                const z = wave1 + wave2 + wave3;

                positionAttribute1.setZ(i, z);
                positionAttribute2.setZ(i, z * 0.85);
                positionAttribute3.setZ(i, z * 0.7);
            }

            positionAttribute1.needsUpdate = true;
            positionAttribute2.needsUpdate = true;
            positionAttribute3.needsUpdate = true;

            plane1.rotation.z = Math.sin(time * 0.1) * 0.02;
            plane2.rotation.z = Math.sin(time * 0.1 + 0.3) * 0.02;
            plane3.rotation.z = Math.sin(time * 0.1 + 0.6) * 0.02;

            renderer.render(scene, camera);
        }

        animate();

        const handleResize = () => {
            const width = container.offsetWidth;
            const height = container.offsetHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            renderer.dispose();
            geometry.dispose();
            geometry2.dispose();
            geometry3.dispose();
            material1.dispose();
            material2.dispose();
            material3.dispose();
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 pointer-events-none z-0"
        />
    );
}
