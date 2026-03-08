
import { AdventureData } from '../types';

const adventureData: AdventureData = {
  "instagram": "https://instagram.com/gopal3008",
  "hobbies": [
    {
      "id": "3dprint",
      "title": "3D Printing",
      "description": "Started as a hobby, now it has become a passion. I love the process of creating physical objects from digital designs and solving everyday problems at home using 3D printing.",
      "details": ["Bambulap A1", "PETG/PLA"],
      "icon": "Box",
      "color": "bg-blue-500",
      "modelPath": "/models/printer.glb",
      "modelScale": 10,
      "effects": ["spin"],
      "reversed": false,
      "badge": "Print In Progress",
      "attribution": {
        "name": "Ultimaker 3 by Brian Yu [CC-BY] via Poly Pizza",
        "url": "https://poly.pizza/m/9E_ItHeURbb"
      }
    },
    {
      "id": "drones",
      "title": "Drones",
      "description": "One of my dreams is to build an FPV drone from scratch and fly it myself. I studied drone parts online, started buying the components, and built one. I even burned a few motors along the way. Through the process, I learned soldering, battery concepts, and FPV simulation, among other things.",
      "details": ["5-inch Freestyle", "Cinewhoop", "DJI O4 Air Unit"],
      "icon": "Wind",
      "color": "bg-red-500",
      "modelPath": "/models/Drone.glb",
      "modelScale": 3,
      "effects": ["flight", "wind", "stars"],
      "reversed": true,
      "badge": "READY FOR TAKEOFF",
      "attribution": {
        "name": "Drone by NateGazzard [CC-BY] via Poly Pizza",
        "url": "https://poly.pizza/m/DNbUoMtG3H"
      }
    },
    {
      "id": "pcbuild",
      "title": "PC Building",
      "description": "I love building PCs. It is kind of addictive exploring and comparing PC parts, buying each component, and assembling them. I just love it.",
      "details": ["Custom Water Cooling", "RTX 4090 Setup", "Cable Management"],
      "icon": "Cpu",
      "color": "bg-purple-500",
      "modelPath": "/models/pc.glb",
      "modelScale": 2,
      "effects": ["spin"],
      "reversed": false,
      "attribution": {
        "name": "Gaming Computer by Alex Safayan [CC-BY] via Poly Pizza",
        "url": "https://poly.pizza/m/5cN7W4ufoII"
      }
    },
    {
      "id": "editing",
      "title": "Video Editing",
      "description": "Whenever I go on a trip, I love capturing videos more than photos because videos bring back the real life moments whenever we watch them. I also love editing those videos and adding some music. My trip feels incomplete without editing a video.",
      "details": ["DaVinci Resolve", "VN"],
      "icon": "Video",
      "color": "bg-pink-500",
      "reversed": true
    },
    {
      "id": "paragliding",
      "title": "Paragliding",
      "description": "In December 2025, I started a solo trip to Bir, Himachal, and began my solo paragliding journey. By the end of the trip, I had completed my first solo paragliding flight and earned the P1 and P2 certifications. I also made some good friends with the same mindset as me. It was an adventurous trip.",
      "details": ["P1 and P2", "Thermal Soaring"],
      "icon": "Plane",
      "color": "bg-cyan-500",
      "modelPath": "/models/Parachute.glb",
      "modelScale": 0.2,
      "effects": ["float", "clouds"],
      "reversed": false,
      "videoBackground": "https://assets.mixkit.co/videos/preview/mixkit-paraglider-flying-under-the-sun-41312-large.mp4",
      "ctaLink": "https://app.flygaggle.com/viewRecording?p=eyJ1c2VySWQiOiJpU1ZaWVA3S3FSUXZLblhERUNweTJsQTlJaWgxIiwicmVjb3JkaW5nSWQiOiJpU1ZaLTE3NjYzNzg3NTU1NjAifQ%3D%3D",
      "ctaLabel": "View Flight Logs",
      "attribution": {
        "name": "Parachute by Poly by Google [CC-BY] via Poly Pizza",
        "url": "https://poly.pizza/m/3Z7vJ96JIEB"
      }
    },
    {
      "id": "skiing",
      "title": "Skiing",
      "description": "After paragliding, I went to Gulmarg, Jammu and Kashmir to learn skiing. It was tough, but I learned some basic moves like the snowplow, J-turn, and parallel turns. I plan to go to Gulmarg every year to improve my skiing skills.",
      "details": ["Skking"],
      "icon": "Snowflake",
      "color": "bg-indigo-500",
      "modelPath": "/models/Skier.glb",
      "modelScale": 0.5,
      "modelRotation": [-1.5708, -1, -1.5],
      "effects": ["spin", "sparkles", "snow"],
      "reversed": false,
      "watermark": "CARVE",
      "attribution": {
        "name": "Skier by apelab [CC-BY] via Poly Pizza",
        "url": "https://poly.pizza/m/6IOZN0Q6lHt"
      }
    },
    {
      "id": "surfing",
      "title": "Surfing",
      "description": "I tried surfing for two days in Chennai. I was able to stand on the surfboard twice. I plan to take proper classes in the future to learn surfing.",
      "details": ["Surfing"],
      "icon": "Waves",
      "color": "bg-emerald-500",
      "reversed": true
    }
  ]
};

export default adventureData;
