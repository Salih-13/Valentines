"use client";
import { useState } from "react";
import { fireEmojiConfetti } from "@/components/magicui/emoji-confetti";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const { toast } = useToast();

  const generateLink = async () => {
    if (!name || !place) {
      toast({
        title: "Missing information",
        description: "Please fill in both name and location",
        variant: "destructive",
      });
      return;
    }

    const inviteLink = `${window.location.origin}/invite?name=${encodeURIComponent(name)}&place=${encodeURIComponent(place)}`;
    setGeneratedLink(inviteLink);
    fireEmojiConfetti();

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Valentine's Invite",
          text: `I've got a question for you! Click the link:`,
          url: inviteLink,
        });
        toast({
          title: "Link shared!",
          description: "Your invite has been shared successfully",
        });
      } catch (error) {
        // Only show error if it's not a user cancellation
        if (error instanceof Error && error.name !== "AbortError") {
          toast({
            title: "Sharing failed",
            description: "You can use the copy button instead",
            variant: "destructive",
          });
        }
      }
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink);
      toast({
        title: "Link copied!",
        description: "You can now share it with your valentine!",
        duration: 2000,
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
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
          <Input
            type="text"
            placeholder="Crush's Name"
            className="mb-4 p-3 border rounded-lg font-bold text-black bg-white/90"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Date Location"
            className="mb-6 p-3 border rounded-lg font-bold text-black bg-white/90"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
          />
          <Button
            onClick={generateLink}
            className="w-full py-3 bg-pink-500 text-white rounded-lg shadow-lg hover:bg-pink-700 transition-colors font-pangolin text-lg"
          >
            Generate & Share
          </Button>

          {generatedLink && (
            <Card className="mt-6 p-4 bg-white/90 backdrop-blur-sm">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium text-gray-700">Your invite link:</p>
                <div className="flex gap-2">
                  <Input
                    readOnly
                    value={generatedLink}
                    className="bg-white/50"
                  />
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    size="icon"
                    className="shrink-0"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}