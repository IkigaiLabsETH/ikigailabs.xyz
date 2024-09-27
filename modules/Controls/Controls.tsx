import React, { FC } from 'react'
import { useVoice } from "@humeai/voice-react";
import { Mic, MicOff, Phone } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from '../Button';
import { cn } from '../../common/utils';
import { MicFFT } from '../MicFFT';
import { Toggle } from '../MicToggle';

export const Controls:FC = () => {
  const { disconnect, status, isMuted, unmute, mute, micFft } = useVoice();

  return (
    <div
      className={
        cn(
          "fixed bottom-0 left-0 w-full p-4 flex items-center justify-center z-50",
          "bg-gradient-to-t from-card via-card/90 to-card/0",
        )
      }
    >
      <AnimatePresence>
        {status.value === "connected" ? (
          <motion.div
            initial={{
              y: "100%",
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: "100%",
              opacity: 0,
            }}
            className={
              "p-4 border border-border rounded shadow-sm flex items-center gap-4 bg-white"
            }
          >
            <Toggle
              pressed={!isMuted}
              onPressedChange={() => {
                if (isMuted) {
                  unmute();
                } else {
                  mute();
                }
              }}
            >
              {isMuted ? (
                <MicOff className={"size-4 border-black stroke-black"} />
              ) : (
                <Mic className={"size-4 stroke-black"} />
              )}
            </Toggle>

            <div className={"relative grid h-8 w-48 shrink grow-0"}>
              <MicFFT fft={micFft} className={" fill-current"} />
            </div>

            <Button
              className={"flex items-center"}
              onClick={() => {
                disconnect();
              }}
            >
              {/* <div className='flex flex-row'>
                <span className='mr-2'>
                  <Phone
                    className={"size-4 opacity-50"}
                    strokeWidth={2}
                    stroke={"currentColor"}
                  />
                </span>
                <span>End Call</span>
              </div> */}
              End Call
            </Button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
