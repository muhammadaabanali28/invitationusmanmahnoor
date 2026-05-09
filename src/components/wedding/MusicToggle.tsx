import { useEffect, useRef, useState } from "react";
import { Music2, VolumeX } from "lucide-react";

export function MusicToggle({ start }: { start: boolean }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!start || !audioRef.current) return;
    audioRef.current.volume = 0.35;
    audioRef.current
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }, [start]);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        loop
        src="https://cdn.pixabay.com/download/audio/2022/03/15/audio_1718e49cdd.mp3?filename=romantic-piano-loop-114172.mp3"
      />
      <button
        onClick={toggle}
        aria-label="Toggle music"
        className="fixed bottom-6 right-6 z-[60] flex h-12 w-12 items-center justify-center rounded-full glass text-gold animate-glow-pulse hover:scale-110 transition-transform"
      >
        {playing ? <Music2 size={20} /> : <VolumeX size={20} />}
      </button>
    </>
  );
}
