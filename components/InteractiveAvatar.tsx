"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Lottie from "lottie-react";
import StreamingAvatar, {
  AvatarQuality,
  StreamingEvents,
  VoiceEmotion,
} from "@heygen/streaming-avatar";

import loadingAnimation from "@/public/Maslow Loading Animation.json";
import { STT_LANGUAGE_LIST } from "@/app/lib/constants";

export default function InteractiveAvatar() {
  const [isLoadingSession, setIsLoadingSession] = useState(false);
  const [stream, setStream] = useState<MediaStream>();
  const [knowledgeId] = useState<string>(
    process.env.NEXT_PUBLIC_KNOWLEDGE_ID!,
  );
  const [avatarId] = useState<string>(process.env.NEXT_PUBLIC_AVATAR_ID!);
  const [language, setLanguage] = useState<string>("en");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const mediaStream = useRef<HTMLVideoElement>(null);
  const avatar = useRef<StreamingAvatar | null>(null);
  let sessionTimeout: NodeJS.Timeout | null = null;

  async function fetchAccessToken() {
    try {
      const response = await fetch("/api/get-access-token", {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch access token: ${response.statusText}`);
      }
      const token = await response.text();
      return token;
    } catch (error) {
      console.error("Error fetching access token:", error);
      // Optionally, update UI to show an error message
    }
    return "";
  }

  async function startSession() {
    setIsLoadingSession(true);
    const newToken = await fetchAccessToken();
    avatar.current = new StreamingAvatar({ token: newToken });
    avatar.current.on(StreamingEvents.AVATAR_START_TALKING, (_e) => {});
    avatar.current.on(StreamingEvents.AVATAR_STOP_TALKING, (_e) => {});
    avatar.current.on(StreamingEvents.STREAM_DISCONNECTED, () => {
      endSession();
    });
    avatar.current?.on(StreamingEvents.STREAM_READY, (event) => {
      setStream(event.detail);
    });
    avatar.current?.on(StreamingEvents.USER_START, (_event) => {});
    avatar.current?.on(StreamingEvents.USER_STOP, (_event) => {});
    try {
      await avatar.current.createStartAvatar({
        quality: AvatarQuality.Medium,
        avatarName: avatarId,
        knowledgeId: knowledgeId,
        voice: { rate: 1.5, emotion: VoiceEmotion.EXCITED },
        language: language,
        disableIdleTimeout: true,
      });
      await avatar.current?.startVoiceChat({ isInputAudioMuted: false });
      sessionTimeout = setTimeout(() => {
        endSession();
      }, 10 * 60 * 1000);
    } catch (error) {
      console.error("Error starting avatar session:", error);
      // Optionally, update UI to show an error message
    } finally {
      setIsLoadingSession(false);
    }
  }

  async function endSession() {
    if (sessionTimeout) {
      clearTimeout(sessionTimeout);
      sessionTimeout = null;
    }
    await avatar.current?.stopAvatar();
    setStream(undefined);
  }

  useEffect(() => {
    return () => {
      endSession();
    };
  }, []);

  useEffect(() => {
    if (stream && mediaStream.current) {
      mediaStream.current.srcObject = stream;
      mediaStream.current.onloadedmetadata = () => {
        mediaStream.current!.play();
      };
    }
  }, [mediaStream, stream]);

  const selectedLanguage = STT_LANGUAGE_LIST.find(
    (lang) => lang.key === language,
  );

  return (
    <div className="w-full h-screen grid items-center justify-center">
      <div className="grid grid-rows-[auto_1fr_auto] w-full h-full">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 justify-items-center lg:justify-items-stretch items-center px-6 py-4 relative z-20 gap-4">
          {/* Language Selector */}
          <div className="relative lg:justify-self-start">
            <button
              className="flex flex-row items-center justify-between cursor-pointer rounded-lg px-4 py-3 bg-[#9CA4FF] w-[171px] h-[57px]"
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div>
                <span className="text-xs font-bold text-[#DCEFF6] text-left block">
                  Select language
                </span>
                <span className="font-bold text-white text-base text-left">
                  {selectedLanguage?.label || "English"}
                </span>
              </div>
              <Image
                alt="dropdown arrow"
                className="ml-2"
                height={13}
                src="/figma-assets/dropdown-arrow.png"
                width={22}
              />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 rounded-lg shadow-lg z-30 bg-[#9CA4FF] w-[171px] max-h-[200px] overflow-y-auto">
                {STT_LANGUAGE_LIST.map((lang) => (
                  <button
                    key={lang.key}
                    className="w-full text-left px-4 py-2 cursor-pointer hover:bg-opacity-80 text-white"
                    type="button"
                    onClick={() => {
                      setLanguage(lang.key);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Logo */}
          <div className="flex justify-center relative">
            <div className="relative w-[200px] h-[87px]">
              <Image
                alt="Rivalista Logo"
                className="object-contain"
                fill
                src="/figma-assets/rivalistalogo.svg"
              />
            </div>
          </div>

          {/* BETA */}
          <div className="flex items-center gap-4 lg:justify-self-end">
            <span className="font-bold text-white text-2xl">
              BETA
            </span>
          </div>
        </div>
        {/* Video Player */}
        <div className="relative w-full h-full px-6">
          {stream ? (
            <video
              ref={mediaStream}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
              title="Dr. Ann's Avatar"
            >
              <track kind="captions" />
            </video>
          ) : isLoadingSession ? (
            <div className="w-full h-full flex justify-center items-center bg-black bg-opacity-50">
              <Lottie
                animationData={loadingAnimation}
                loop={true}
                style={{ width: "150px", height: "150px" }}
              />
            </div>
          ) : (
            <div className="relative w-full h-full flex justify-center items-center bg-black bg-opacity-50">
              <Image
                alt="Ann Therapist"
                className="w-full h-full object-cover"
                fill
                src="/Alessandra.png"
                priority
              />
            </div>
          )}
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] items-end lg:items-center px-6 py-4 gap-4 justify-items-center lg:justify-items-stretch">
          {/* Main Title */}
          <div className="text-left">
            <h1 className="font-barlow-condensed font-bold italic leading-tight text-[30px] lg:text-[60px] max-w-4xl">
              <span className="text-[#9CA4FF]">YOUR </span>
              <span className="text-white">TRASH TALK THERAPY </span>
              <span className="text-[#9CA4FF]">BEGINS NOW</span>
            </h1>
          </div>

          {/* Action Button */}
          <div className="w-full lg:flex lg:justify-end">
            <button
              className="flex items-center justify-center gap-4 rounded-lg font-bold transition-opacity hover:opacity-90 bg-[#9CA4FF] w-full lg:w-[288px] h-[93px] text-[#DCEFF6] text-[32px] p-4"
              disabled={isLoadingSession}
              onClick={isLoadingSession ? () => {} : stream ? endSession : startSession}
            >
              {isLoadingSession ? (
                "Loading..."
              ) : stream ? (
                "End session"
              ) : (
                <>
                  <span className="pl-4 text-left leading-none">
                    TALK TRASH <span className="hidden lg:inline"><br /></span>
                    WITH DR. ANN
                  </span>
                  <Image
                    alt="button icon"
                    className="pr-4 h-[40px] w-[32px] lg:h-[79px] lg:w-[64px]"
                    height={79}
                    src="/figma-assets/button-icon.svg"
                    width={64}
                  />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
