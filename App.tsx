
import React, { useState, Suspense, useRef, useEffect, useMemo } from 'react';
import { 
  Briefcase, Code, BookOpen, Mic, Award, ChevronDown, 
  Box, Wind, Cpu, Video, Plane, Snowflake, Waves, Zap, Rocket,
  Linkedin, Instagram, ExternalLink, Activity
} from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, Float, MeshDistortMaterial, Sphere, PerspectiveCamera, 
  Text, Stars, Sparkles, Cloud, Float as DreiFloat, Environment
} from '@react-three/drei';
import * as THREE from 'three';

import professionalData from './data/professional';
import adventureData from './data/adventure';
import { AdventureItem } from './types';

// --- Shared Components ---

const SectionHeading: React.FC<{ title: string; icon?: React.ReactNode; dark?: boolean }> = ({ title, icon, dark }) => (
  <div className="flex items-center gap-3 mb-8">
    {icon && <div className={`p-2 ${dark ? 'bg-white/10 text-white' : 'bg-blue-100 text-blue-600'} rounded-lg`}>{icon}</div>}
    <h2 className={`text-3xl md:text-5xl font-bold font-display ${dark ? 'text-white' : 'text-slate-900'}`}>{title}</h2>
  </div>
);

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={`bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300 ${className}`}>
    {children}
  </div>
);

// --- 3D Adventure Assets ---

const PrinterScene = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const headRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      const scale = (Math.sin(t * 0.5) + 1) / 2;
      meshRef.current.scale.set(1.5, scale * 1.5, 1.5);
      meshRef.current.position.y = (scale * 1.5) / 2 - 0.75;
    }
    if (headRef.current) {
      headRef.current.position.x = Math.sin(t * 4) * 1.2;
      headRef.current.position.z = Math.cos(t * 3) * 1.2;
      headRef.current.position.y = meshRef.current ? meshRef.current.position.y + (meshRef.current.scale.y / 2) + 0.2 : 0;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.8, 0]}>
        <planeGeometry args={[4, 4]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.1} />
      </mesh>
      <mesh ref={meshRef}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#00f2ff" emissive="#00f2ff" emissiveIntensity={2} wireframe />
      </mesh>
      <group ref={headRef}>
        <mesh>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#ff0055" emissive="#ff0055" />
        </mesh>
        <pointLight color="#ff0055" intensity={2} distance={2} />
      </group>
    </group>
  );
};

// Dynamic Wind Particles to simulate wind resistance
const WindResistance = () => {
  const count = 120;
  const meshRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const speed = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
      speed[i] = 0.15 + Math.random() * 0.35;
    }
    return { pos, speed };
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;
    const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 2] += particles.speed[i]; // Move towards camera to simulate flight speed
      if (positions[i * 3 + 2] > 10) positions[i * 3 + 2] = -10;
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.pos}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.04} 
        color="#ffffff" 
        transparent 
        opacity={0.15} 
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

const DroneScene = () => {
  const droneRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (droneRef.current) {
      // Dynamic Pathing
      const targetX = Math.sin(t * 0.7) * 2.0;
      const targetZ = Math.cos(t * 0.4) * 1.5;
      const targetY = Math.sin(t * 1.1) * 0.4; // Altitude changes
      
      // Smooth interpolation for "physics-like" movement
      droneRef.current.position.x = THREE.MathUtils.lerp(droneRef.current.position.x, targetX, 0.05);
      droneRef.current.position.z = THREE.MathUtils.lerp(droneRef.current.position.z, targetZ, 0.05);
      droneRef.current.position.y = THREE.MathUtils.lerp(droneRef.current.position.y, targetY, 0.05);
      
      // Banking Turns (Roll) based on horizontal change
      const roll = (Math.sin(t * 0.7) * -0.5);
      droneRef.current.rotation.z = THREE.MathUtils.lerp(droneRef.current.rotation.z, roll, 0.05);
      
      // Pitch based on forward/backward "acceleration"
      const pitch = (Math.cos(t * 0.4) * 0.3);
      droneRef.current.rotation.x = THREE.MathUtils.lerp(droneRef.current.rotation.x, pitch, 0.05);
      
      // Slight yaw to look into the turn
      droneRef.current.rotation.y = THREE.MathUtils.lerp(droneRef.current.rotation.y, Math.sin(t * 0.35) * 0.4, 0.03);
    }
  });

  return (
    <group>
      <WindResistance />
      <group ref={droneRef} scale={1.2}>
        {/* Frame */}
        <mesh>
          <boxGeometry args={[2, 0.1, 0.2]} />
          <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[2, 0.1, 0.2]} />
          <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Motors & Props */}
        {[ [1,1], [1,-1], [-1,1], [-1,-1] ].map((pos, i) => (
          <group key={i} position={[pos[0], 0.1, pos[1]]}>
            <mesh>
              <cylinderGeometry args={[0.1, 0.1, 0.2]} />
              <meshStandardMaterial color="#444" metalness={1} />
            </mesh>
            <DreiFloat speed={20} rotationIntensity={0} floatIntensity={0}>
               <mesh rotation={[0, 0, 0]}>
                  <boxGeometry args={[0.9, 0.01, 0.08]} />
                  <meshStandardMaterial color="#00ff00" transparent opacity={0.4} blending={THREE.AdditiveBlending} />
               </mesh>
            </DreiFloat>
          </group>
        ))}
        {/* FPV Camera Pod */}
        <mesh position={[0, 0.2, 0.5]}>
           <boxGeometry args={[0.3, 0.3, 0.4]} />
           <meshStandardMaterial color="#111" />
           <mesh position={[0, 0, 0.2]}>
              <sphereGeometry args={[0.08, 8, 8]} />
              <meshStandardMaterial color="#000" emissive="#00ff00" emissiveIntensity={0.5} />
           </mesh>
        </mesh>
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
      </group>
    </group>
  );
};

const ParaglideScene = () => {
  return (
    <group scale={1.5}>
      <DreiFloat speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[0, 1, 0]} rotation={[0.2, 0, 0]}>
          <torusGeometry args={[1.5, 0.05, 16, 100, Math.PI]} />
          <meshStandardMaterial color="#ff9900" side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 0, 0]}>
           <capsuleGeometry args={[0.1, 0.3, 4, 8]} />
           <meshStandardMaterial color="#fff" />
        </mesh>
      </DreiFloat>
      {/* Fix: Replaced invalid 'width' and 'depth' props with 'bounds' prop for the Cloud component */}
      <Cloud opacity={0.5} speed={0.4} bounds={[10, 1, 1.5]} segments={20} />
    </group>
  );
};

const SkiingScene = () => {
  return (
    <group>
      <Sparkles count={200} scale={10} size={2} speed={0.5} color="white" />
      <mesh rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -2, 0]}>
        <planeGeometry args={[20, 20, 32, 32]} />
        <MeshDistortMaterial color="#eef" speed={1} distort={0.2} roughness={0} />
      </mesh>
      <DreiFloat speed={5} rotationIntensity={2} floatIntensity={1}>
        <group rotation={[0, Math.PI / 4, 0]}>
          <mesh position={[-0.2, 0, 0]}>
            <boxGeometry args={[0.1, 0.02, 1.5]} />
            <meshStandardMaterial color="#ff0000" />
          </mesh>
          <mesh position={[0.2, 0, 0]}>
            <boxGeometry args={[0.1, 0.02, 1.5]} />
            <meshStandardMaterial color="#ff0000" />
          </mesh>
        </group>
      </DreiFloat>
    </group>
  );
};

// --- Portfolio Views ---

const ProfessionalPortfolio: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20 space-y-32">
      <section id="about" className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <SectionHeading title="About Me" icon={<Code size={24} />} />
          <p className="text-xl text-slate-600 leading-relaxed">
            {professionalData.about}
          </p>
          <div className="mt-8 flex gap-4">
            <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-slate-100 min-w-[120px]">
              <div className="text-3xl font-bold text-blue-600">{professionalData.experienceYears}</div>
              <div className="text-sm text-slate-500 uppercase tracking-wider font-semibold">Experience</div>
            </div>
            <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-slate-100 min-w-[120px]">
              <div className="text-3xl font-bold text-blue-600">50+</div>
              <div className="text-sm text-slate-500 uppercase tracking-wider font-semibold">Projects</div>
            </div>
          </div>
        </div>
        <div className="relative">
          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800" alt="Gopal" className="rounded-3xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-500" />
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-600 rounded-3xl -z-10"></div>
        </div>
      </section>

      <section id="experience">
        <SectionHeading title="Experience" icon={<Briefcase size={24} />} />
        <div className="space-y-6">
          {professionalData.experience.map((exp, idx) => (
            <Card key={idx} className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/4">
                <div className="text-lg font-bold text-blue-600">{exp.startDate} - {exp.endDate}</div>
                <div className="text-slate-500 font-medium">{exp.location}</div>
              </div>
              <div className="md:w-3/4">
                <h3 className="text-2xl font-bold mb-1">{exp.designation}</h3>
                <div className="text-xl text-slate-700 mb-4">{exp.title}</div>
                <p className="text-slate-600">{exp.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section id="projects">
        <SectionHeading title="Projects" icon={<Zap size={24} />} />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {professionalData.projects.map((proj, idx) => (
            <a href={proj.link} key={idx} className="block group">
              <Card className="overflow-hidden p-0 h-full">
                <img src={proj.thumbnail} alt={proj.title} className="w-full h-48 object-cover transition-transform group-hover:scale-105" />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                    {proj.title}
                    <ExternalLink size={16} />
                  </h3>
                  <p className="text-slate-600 text-sm">{proj.description}</p>
                </div>
              </Card>
            </a>
          ))}
        </div>
      </section>

      <section id="blogs">
        <SectionHeading title="Latest Blogs" icon={<BookOpen size={24} />} />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {professionalData.blogs.map((blog, idx) => (
            <a href={blog.link} key={idx} className="block group">
              <Card className="overflow-hidden p-0 h-full">
                <img src={blog.thumbnail} alt={blog.title} className="w-full h-48 object-cover transition-transform group-hover:scale-105" />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">{blog.title}</h3>
                  <p className="text-slate-600 text-sm">{blog.description}</p>
                </div>
              </Card>
            </a>
          ))}
        </div>
      </section>

      <section id="talks">
        <SectionHeading title="Talks" icon={<Mic size={24} />} />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {professionalData.talks.map((talk, idx) => (
            <a href={talk.link} key={idx} className="block group">
              <Card className="overflow-hidden p-0 h-full">
                <img src={talk.thumbnail} alt={talk.title} className="w-full h-48 object-cover transition-transform group-hover:scale-105" />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">{talk.title}</h3>
                  <p className="text-slate-600 text-sm mb-4">{talk.description}</p>
                  <span className="text-blue-600 font-bold text-sm">Watch Session →</span>
                </div>
              </Card>
            </a>
          ))}
        </div>
      </section>

      <section id="certifications">
        <SectionHeading title="Certifications" icon={<Award size={24} />} />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {professionalData.certifications.map((cert, idx) => (
            <Card key={idx} className="overflow-hidden p-0 h-full">
              <img src={cert.thumbnail} alt={cert.title} className="w-full h-40 object-cover" />
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2">{cert.title}</h3>
                <p className="text-sm text-slate-500">{cert.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section id="education">
        <SectionHeading title="Education" />
        <div className="space-y-6">
          {professionalData.schooling.map((school, idx) => (
            <Card key={idx} className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold">{school.degree}</h3>
                <p className="text-slate-600">{school.institution}</p>
              </div>
              <div className="text-slate-500 font-medium">{school.year}</div>
            </Card>
          ))}
        </div>
      </section>

      <footer className="pt-20 border-t border-slate-200 text-center text-slate-500">
        <p>© 2024 {professionalData.name}. Built with React, Three.js & Tailwind CSS.</p>
        <div className="flex justify-center gap-6 mt-6 pb-12">
          <a href={professionalData.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
            <Linkedin size={20} />
            <span className="font-semibold">LinkedIn</span>
          </a>
          <a href={`mailto:${professionalData.email}`} className="flex items-center gap-2 hover:text-blue-600 transition-colors">
            <Briefcase size={20} />
            <span className="font-semibold">Work Email</span>
          </a>
        </div>
      </footer>
    </div>
  );
};

// --- Main Adventure View ---

const AdventurePortfolio: React.FC = () => {
  return (
    <div className="bg-slate-950 text-white pb-32">
      {/* 3D Printing Section */}
      <section className="min-h-screen grid md:grid-cols-2 gap-12 px-10 py-24 items-center border-b border-white/5">
        <div className="h-[400px] md:h-[600px] bg-slate-900 rounded-3xl overflow-hidden relative shadow-2xl shadow-blue-500/10">
          <Canvas shadows>
            <PerspectiveCamera makeDefault position={[0, 2, 5]} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1.5} />
            <Suspense fallback={null}>
              <PrinterScene />
            </Suspense>
            <OrbitControls enableZoom={false} />
          </Canvas>
          <div className="absolute top-6 left-6 flex items-center gap-2 bg-blue-600 px-4 py-2 rounded-full font-bold text-xs uppercase tracking-widest animate-pulse">
            <Activity size={14} />
            Print In Progress
          </div>
        </div>
        <div className="space-y-8">
          <SectionHeading title="3D Printing" icon={<Box size={24} />} dark />
          <p className="text-2xl text-white/60 leading-relaxed font-light">
            Bringing digital blueprints to life. I specialize in mechanical functional parts and custom drone components using various materials from PLA to Carbon Fiber PETG.
          </p>
          <div className="grid grid-cols-2 gap-4">
             <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
               <h4 className="text-blue-400 font-bold mb-2">Build Volume</h4>
               <p className="text-white/80">300x300x400mm</p>
             </div>
             <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
               <h4 className="text-blue-400 font-bold mb-2">Main Rig</h4>
               <p className="text-white/80">Prusa MK3S+</p>
             </div>
          </div>
        </div>
      </section>

      {/* Drone Section - Enhanced with dynamic movements & wind resistance */}
      <section className="min-h-screen grid md:grid-cols-2 gap-12 px-10 py-24 items-center border-b border-white/5">
        <div className="order-2 md:order-1 space-y-8">
          <SectionHeading title="FPV Drones" icon={<Wind size={24} />} dark />
          <p className="text-2xl text-white/60 leading-relaxed font-light">
            Engineering flight. From custom build frames to cinematic flight footage, I love the intersection of aerodynamics and embedded systems.
          </p>
          <div className="flex flex-wrap gap-3">
             {["5-inch Freestyle", "Sub-250g Long Range", "Cinewhoop", "DJI O3 Air Unit"].map((tag) => (
               <span key={tag} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-semibold text-white/40 italic">#{tag}</span>
             ))}
          </div>
        </div>
        <div className="order-1 md:order-2 h-[400px] md:h-[600px] bg-slate-900 rounded-3xl overflow-hidden relative shadow-2xl shadow-green-500/10">
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, 5]} />
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={1.5} />
            <Suspense fallback={null}>
              <DroneScene />
            </Suspense>
            <OrbitControls enableZoom={false} />
          </Canvas>
          <div className="absolute bottom-6 right-6 bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/10">
             <div className="text-xs text-white/40 uppercase tracking-widest font-bold mb-1">Telemetry Status</div>
             <div className="text-green-500 font-mono text-lg animate-pulse">READY FOR TAKEOFF</div>
          </div>
        </div>
      </section>

      {/* Paragliding Section */}
      <section className="min-h-screen relative overflow-hidden py-24 px-10 border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover opacity-20 grayscale"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-paraglider-flying-under-the-sun-41312-large.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="relative z-10 grid md:grid-cols-2 gap-20 items-center h-full">
           <div className="space-y-8">
              <SectionHeading title="Paragliding" icon={<Plane size={24} />} dark />
              <p className="text-2xl text-white/70 leading-relaxed font-light">
                Hike and Fly expert. Finding the perfect thermal and soaring above the clouds provides a perspective no computer screen can ever match.
              </p>
              <button className="flex items-center gap-4 bg-orange-600 px-8 py-4 rounded-full font-bold hover:bg-orange-700 transition-all shadow-xl shadow-orange-900/20">
                View Flight Logs <Activity size={20} />
              </button>
           </div>
           <div className="h-[500px]">
              <Canvas>
                 <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                 <ambientLight intensity={1} />
                 <Suspense fallback={null}>
                    <ParaglideScene />
                 </Suspense>
              </Canvas>
           </div>
        </div>
      </section>

      {/* Skiing Section */}
      <section className="min-h-screen grid md:grid-cols-2 gap-12 px-10 py-24 items-center">
        <div className="h-[400px] md:h-[600px] bg-slate-900 rounded-3xl overflow-hidden relative border border-white/5">
           <Canvas>
              <PerspectiveCamera makeDefault position={[0, 0, 5]} />
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <Suspense fallback={null}>
                 <SkiingScene />
              </Suspense>
           </Canvas>
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
              <div className="text-8xl font-black text-white/5 uppercase italic tracking-tighter">CARVE</div>
           </div>
        </div>
        <div className="space-y-8">
          <SectionHeading title="Skiing" icon={<Snowflake size={24} />} dark />
          <p className="text-2xl text-white/60 leading-relaxed font-light">
            Chasing the powder. From carving black diamonds to backcountry exploration, winters are for the mountains.
          </p>
          <div className="flex gap-4">
             <div className="flex-1 bg-white/5 p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-all">
                <h3 className="text-3xl font-bold mb-2">4,200m</h3>
                <p className="text-white/40 text-sm uppercase font-bold tracking-widest">Highest Peak</p>
             </div>
             <div className="flex-1 bg-white/5 p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-all">
                <h3 className="text-3xl font-bold mb-2">95km/h</h3>
                <p className="text-white/40 text-sm uppercase font-bold tracking-widest">Max Speed</p>
             </div>
          </div>
        </div>
      </section>

      <footer className="text-center py-24 border-t border-white/5">
         <h2 className="text-6xl font-display font-black mb-8 text-white/20">The Adventure Continues</h2>
         <a 
            href={adventureData.instagram} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 px-10 py-5 rounded-full font-bold text-xl hover:scale-110 transition-transform shadow-2xl shadow-pink-600/20"
          >
            <Instagram size={28} />
            Check My Instagram
          </a>
      </footer>
    </div>
  );
};

// --- App Root ---

const App: React.FC = () => {
  const [isAdventureMode, setIsAdventureMode] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [isAdventureMode]);

  return (
    <div className={`transition-colors duration-1000 ${isAdventureMode ? 'bg-slate-950' : 'bg-slate-50'}`}>
      <nav className="fixed top-0 left-0 right-0 z-[100] p-6 flex justify-between items-center pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
          <div className={`w-8 h-8 ${isAdventureMode ? 'bg-orange-600' : 'bg-blue-600'} rounded-full flex items-center justify-center transition-colors duration-500`}>
            <span className="text-white font-bold">G</span>
          </div>
          <span className={`font-bold ${isAdventureMode ? 'text-white' : 'text-slate-900'}`}>Gopal S.</span>
        </div>

        <div className="pointer-events-auto flex items-center gap-4">
          {!isAdventureMode ? (
             <a href={professionalData.linkedin} target="_blank" rel="noopener noreferrer" className="bg-white/50 backdrop-blur-md p-3 rounded-full hover:bg-blue-500 hover:text-white transition-all text-slate-600 border border-slate-200">
               <Linkedin size={18} />
             </a>
          ) : (
            <a href={adventureData.instagram} target="_blank" rel="noopener noreferrer" className="bg-white/10 backdrop-blur-md p-3 rounded-full hover:bg-pink-500 hover:text-white transition-all text-white/70 border border-white/10">
               <Instagram size={18} />
             </a>
          )}
          
          <button 
            onClick={() => setIsAdventureMode(!isAdventureMode)}
            className="relative w-48 h-12 bg-slate-200/50 dark:bg-slate-800/50 backdrop-blur-xl rounded-full p-1 transition-all duration-500 border border-slate-300 dark:border-slate-700 shadow-inner group"
          >
            <div className={`absolute inset-1 w-24 rounded-full transition-all duration-500 flex items-center justify-center gap-2 ${isAdventureMode ? 'translate-x-[88px] bg-orange-600 text-white' : 'translate-x-0 bg-white text-slate-900 shadow-md'}`}>
              {isAdventureMode ? <Rocket size={16} /> : <Briefcase size={16} />}
              <span className="text-xs font-bold uppercase tracking-wider">
                {isAdventureMode ? 'Adventure' : 'Pro'}
              </span>
            </div>
            <div className="flex justify-between px-6 items-center h-full text-[10px] font-bold text-slate-400 uppercase tracking-tighter pointer-events-none">
              <span>Pro</span>
              <span>Adv</span>
            </div>
          </button>
        </div>
      </nav>

      <header className={`relative h-screen flex items-center justify-center overflow-hidden ${isAdventureMode ? 'text-white' : 'text-slate-900'}`}>
        <div className="absolute inset-0 -z-10 opacity-30">
          <Canvas>
             <ambientLight intensity={0.5} />
             <DreiFloat speed={2}>
                <Sphere args={[1, 32, 32]} position={[2, 1, -2]}>
                   <MeshDistortMaterial color={isAdventureMode ? '#ff9900' : '#3b82f6'} speed={2} distort={0.4} />
                </Sphere>
             </DreiFloat>
             <DreiFloat speed={3}>
                <Sphere args={[0.5, 32, 32]} position={[-2, -1, -3]}>
                   <MeshDistortMaterial color={isAdventureMode ? '#ff0055' : '#94a3b8'} speed={3} distort={0.6} />
                </Sphere>
             </DreiFloat>
          </Canvas>
        </div>

        <div className="text-center space-y-6 max-w-4xl px-6 relative z-10">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest ${isAdventureMode ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 'bg-blue-100 text-blue-600 border border-blue-200'}`}>
            {isAdventureMode ? <Wind size={16} /> : <Code size={16} />}
            {isAdventureMode ? 'Chasing Adrenaline' : 'Building the Future UI'}
          </div>
          <h1 className="text-6xl md:text-9xl font-black font-display leading-tight tracking-tighter">
            {isAdventureMode ? (
              <>LIFE IN <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">3D</span></>
            ) : (
              <>CODE IN <span className="text-blue-600 underline decoration-blue-200 decoration-8 underline-offset-8">STYLE</span></>
            )}
          </h1>
          <p className="text-xl md:text-3xl text-slate-500 dark:text-white/40 max-w-3xl mx-auto font-light leading-relaxed">
            {isAdventureMode 
              ? "Exploring the vertical world through paragliding, high-speed carving, and FPV drone engineering."
              : "Senior Frontend Engineer specializing in high-performance React architectures and premium digital aesthetics."
            }
          </p>
          <div className="flex gap-4 justify-center pt-8">
             <button 
                onClick={() => {
                  const id = isAdventureMode ? 'adventure-content' : 'about';
                  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`flex items-center gap-2 px-10 py-5 rounded-full font-bold transition-all transform hover:scale-105 shadow-2xl ${isAdventureMode ? 'bg-white text-slate-950 shadow-white/10' : 'bg-slate-900 text-white shadow-slate-900/20'}`}
             >
                Dive In
                <ChevronDown size={20} />
             </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
          <ChevronDown size={32} />
        </div>
      </header>

      <div id="adventure-content"></div>
      <div id="pro-content"></div>

      <main>
        {isAdventureMode ? (
          <AdventurePortfolio />
        ) : (
          <ProfessionalPortfolio />
        )}
      </main>
    </div>
  );
};

export default App;
