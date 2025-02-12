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
          title: "Valentine’s Invite",
          text: `I've got a question for you! Click the link:`,
          url: inviteLink,
        })
        .catch(console.error);
    } else {
      prompt("Copy this link and send it:", inviteLink);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-pink-100">
      <h1 className="text-3xl font-bold text-red-500 mb-4">
        Ask Her Out Bro!!🫂
      </h1>
      <input
        type="text"
        placeholder="Her Name"
        className="mb-2 p-2 border rounded w-64 font-bold text-black"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Date Location"
        className="mb-4 p-2 border rounded w-64 font-bold text-black"
        value={place}
        onChange={(e) => setPlace(e.target.value)}
      />
      <button
        onClick={generateLink}
        className="px-4 py-2 bg-red-500 text-white rounded shadow-lg hover:bg-red-700"
      >
        Generate & Share
      </button>
    </div>
  );
}
