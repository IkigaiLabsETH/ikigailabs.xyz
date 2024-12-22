import React, { FC } from 'react'
import { useVoice } from "@humeai/voice-react";

import { Button } from '../Button';

export const StartCall:FC = () => {
  const { status, connect } = useVoice();

  return(
    <Button
      className={"z-50 flex items-center gap-1.5"}
      onClick={() => {
        connect()
          .then(() => {})
          .catch(() => {})
          .finally(() => {});
      }}
    >
      {/* <span>
        <Phone
          className={"size-4 opacity-50"}
          strokeWidth={2}
          stroke={"currentColor"}
        />
      </span> */}
      <span>Call Eliza</span>
    </Button>
  )
}
