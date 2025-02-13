"use client";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");

  const generateLink = () => {
    if (!name || !place) return alert("Please fill in both fields");

    const inviteLink = `${window.location.origin}/invite?name=${encodeURIComponent(name)}&place=${encodeURIComponent(place)}`;

    if (navigator.share) {
      navigator
        .share({
          title: "Valentine's Invite",
          text: `I've got a question for you! Click the link:`,
          url: inviteLink,
        })
        .catch(console.error);
    } else {
      prompt("Copy this link and send it:", inviteLink);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/homeBG.mp4" type="video/mp4" />
      </video>
      
      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/30 z-10" />
      
      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-heading text-white mb-8 drop-shadow-lg text-center">
          Ask Them Out !!🫂
        </h1>
        <div className="w-full max-w-md px-4">
          <input
            type="text"
            placeholder="Crush's Name"
            className="w-full mb-4 p-3 border rounded-lg font-bold text-black bg-white/90"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Date Location"
            className="w-full mb-6 p-3 border rounded-lg font-bold text-black bg-white/90"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
          />
          <button
            onClick={generateLink}
            className="w-full py-3 bg-pink-500 text-white rounded-lg shadow-lg hover:bg-pink-700 transition-colors font-pangolin text-lg"
          >
            Generate & Share
          </button>
        </div>
      </div>
    </div>
  );
}