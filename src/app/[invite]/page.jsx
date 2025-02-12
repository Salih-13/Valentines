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
  const [videoVisible, setVideoVisible] = useState(false);
  const [message, setMessage] = useState(
    `${name}, are you ready to go on a date to ${place} this Valentine’s Day with me? ❤️`
  );

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
    "Alright, alright, but how about I make it even sweeter this time? Same place, same date?",
"I totally understand... but maybe we should give this another shot? Same place, same time?",
"Okay, but you know, I think I can win you over... want to give it another try?",
"Well, how about a second try? I’m convinced I can make this date amazing!",
"No problem, but just so you know, I’m gonna ask again, and this time you’ll be saying yes!",
"Alright, but don’t be surprised if I ask again... with more confidence this time!",
"I see how it is! But what if I promised it’d be the best date ever? Same spot?",
"That’s okay, but I’m still thinking we could make this work—wanna give me another shot?",
"I respect that, but I’m gonna try again—same date, same place... just a little extra charm!",
"Okay, but I think the universe wants me to ask again... Same place, same date?",
"Fair enough, but just so you know, I’m giving it one more go! Same time, same place?",
"That’s cool, but I’m still hopeful... how about a second chance? Same place, same time?",
"Alright, but what if I made it even more fun? How about a redo, same place?",
"That’s fine, but I’m just gonna go ahead and ask again—this time you’ll definitely say yes!",
"No worries, but I’m not giving up yet! Can I ask again with a little more flair?",
"Okay, I get it! But I’m still gonna ask... same place, same time—just a bit more irresistible!",
"Alright, alright! But maybe round two would be a better fit? Same spot, same date?",
"I see, but I’m still convinced I can win you over—how about I try again?",
"No worries! But I have a feeling you’ll say yes if I ask again... what do you think?",
"That’s cool, but how about we try this again? Same date, same place—this time better!",
"Okay, but I’m definitely giving it another shot! Same spot, same time—how about it?",
"No problem! But how about a second round? I’ve got a better plan this time!",
"Alright, alright... but just give me one more shot, I promise it’ll be worth it!",
"Fair enough, but can I try again? Same place, same date—this time I’m extra charming!",
"Okay, but how about I ask again with a twist? Same spot, same date, a little more magic!",
"That’s fine, but what if I made it impossible for you to say no this time?",
"I respect that, but I’m still gonna try my luck—how about it? Same place, same date?",
"Alright, alright! But what if the second time’s the charm? Same place, same time?",
"No problem, but how about we just give it another go? Same spot, same date—this time, even better!",
"I totally get it, but can I try again? I’ve got an even better plan for this same date!",
"Fair enough, but how about round two? Same place, same date, better mood?",
"Okay, but I’m not giving up yet—what if we give it another shot, right now?",
"I see, but how about a second chance? Same spot, same date, same charm?",
"Alright, no big deal! But can I try again, maybe with some extra magic this time?",
"That’s cool, but I think I can make it even better... want to give it another try?",
"Okay, I hear you... but what if I ask again? Same place, same time, just a bit more charm!",
"No worries! But I’m still giving it another shot—what do you say to round two?",
"Alright, but I’m not giving up yet! Same place, same time, let’s make it unforgettable!",
"That’s fine, but what if I promised it’ll be more fun this time? Same spot, same date?",
"Okay, no problem, but I’m going to give it another go—same place, same date!",
  ];

  useEffect(() => {
    if (noClicks >= 9) {
      setNoStyle({ position: "absolute", top: `${Math.random() * 80}%`, left: `${Math.random() * 80}%` });
    } else {
      setNoStyle({ transform: `scale(${1 - noClicks * 0.1})` });
      setYesSize(1 + noClicks * 0.15);
    }
  }, [noClicks]);

  const handleYesClick = () => {
    setYesClicked(true);
    setVideoVisible(true);
    setMessage("");
  };

  const handleNoClick = () => {
    setNoClicks(noClicks + 1);
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    setMessage(randomResponse);
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
            Let them know! 💌
          </button>
        </div>
      )}
      {videoVisible && (
        <div className="absolute bottom-[120px] w-50px">
          <video 
            className="w-[200px] h-[200px]"
            autoPlay 
            loop 
            muted
            src="panda3.webm"
            type="video/webm"
          />
        </div>
      )}
    </div>
  );
}
