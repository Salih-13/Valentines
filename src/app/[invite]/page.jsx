"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Confetti from "react-confetti";

export default function InvitePage() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Someone";
  const place = searchParams.get("place") || "a special place";

  const [noClicks, setNoClicks] = useState(0);
  const [yesClicked, setYesClicked] = useState(false);
  const [noStyle, setNoStyle] = useState({});
  const [yesSize, setYesSize] = useState(1);
  const [responseText, setResponseText] = useState(`Will you go out with me to ${place}?`);
  const [message, setMessage] = useState(`Will you go out with me to ${place}?`);
  const [showVideo, setShowVideo] = useState(false); // <-- Define the showVideo state

  const responses = [
    "Alright, alright, no worries. But, what if I ask again... just for fun? Same spot, same date?",
    "That's cool, but I think I can make it even better... how about I try again, same place?",
    "Okay, no problem! But can I take a rain check for... right now? Same place, same date?",
    "I get it, but can I ask again? Maybe a little more charm this time... same spot?",
    "Alright, no stress, but how about we try again? Same place, same time, round two?",
    "Okay, but what if I promise it’ll be better this time? Same place, same date, second chance?",
    "That’s fine, but you haven’t seen my best moves yet... want to give it another go?",
    "No problem, but you’re sure you don’t want to change your mind? Same date, same place?",
    "I hear you, but how about I try again, and this time it’ll be extra fun?",
    "That’s okay, but I can’t help myself—how about I ask again? Same spot, same date!",
    // ... continue adding the rest of the responses in the array.
  ];

  useEffect(() => {
    if (noClicks >= 9) {
      setNoStyle({ position: "absolute", top: `${Math.random() * 80}%`, left: `${Math.random() * 80}%` });
    } else {
      setNoStyle({ transform: `scale(${1 - noClicks * 0.1})` });
      setYesSize(1 + noClicks * 0.15);
    }

    if (noClicks < responses.length) {
      setResponseText(responses[noClicks]);
      setMessage(responses[noClicks]);
    }
  }, [noClicks]);

  const handleYesClick = () => {
    setYesClicked(true);
    setMessage(""); // Hide the message when yes is clicked
    setShowVideo(true); // Show the video when 'Yes' is clicked
  };

  const handleNoClick = () => {
    setNoClicks(noClicks + 1);
  };

  const shareResponse = () => {
    const message = `I am ready to go out with you this Valentine's Day ❤️`;
    const shareData = {
      title: "Valentine's Response",
      text: message,
    };

    if (navigator.share) {
      navigator.share(shareData).catch(console.error);
    } else {
      prompt("Copy and send this message:", message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-100 relative">
      {yesClicked && <Confetti />}
      <h1 className="text-2xl font-bold text-red-600 text-center mb-6">{message}</h1>
      {!yesClicked ? (
        <div className="flex gap-4">
          <button
            style={{ transform: `scale(${yesSize})` }}
            onClick={handleYesClick}
            className="px-6 py-3 bg-green-500 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition-all"
          >
            Yes 😍
          </button>
          <button
            onClick={handleNoClick}
            style={noStyle}
            className="px-6 py-3 bg-gray-500 text-white font-bold rounded-lg shadow-md hover:bg-gray-700 transition-all"
          >
            No 🙄
          </button>
        </div>
      ) : (
        <div className="text-center mt-6">
          <h2 className="text-xl font-bold text-green-600">I knew you would say YES! 🎉</h2>
          <button
            onClick={shareResponse}
            className="mt-4 px-5 py-2 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Let him know! 💌
          </button>
        </div>
      )}

      {/* Video Section */}
      {showVideo && (
        <div className="absolute bottom-[180px] w-50px">
          <video 
            className="w-[200px] h-[200px]"
            autoPlay 
            loop 
            muted
            src="panda3.webm"
            type="panda.mp4"
          />
        </div>
      )}
    </div>
  );
}
