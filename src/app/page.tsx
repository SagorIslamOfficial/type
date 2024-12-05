'use client'
import KeyBoard from "@/components/custom/KeyBoard";
import RacingTrack from "@/components/custom/RacingTrack";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Home() {
  const [showKeyBoard, setShowKeyBoard] = useState(false);

  return (
    <>
      <div className="flex mt-4">
        <div className="mt-4 ml-4">
          <Button className="w-[14ch]" onClick={() => setShowKeyBoard(!showKeyBoard)} variant={'outline'} size={'sm'}>{showKeyBoard ? 'Hide keyboard' : 'Show Keyboard'}</Button>
        </div>
        <RacingTrack />
      </div>
      {showKeyBoard && <KeyBoard />}
    </>
  );
}
