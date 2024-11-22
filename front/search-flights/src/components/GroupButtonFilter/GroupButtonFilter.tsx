import { Button, ButtonGroup } from "@mui/material";
import React from "react";

interface Props {
  btnTextsArr: string[];
  onClickHandlers: (() => void)[];
}

export const GroupButtonFilter = ({ btnTextsArr, onClickHandlers }: Props) => {
  return (
    <ButtonGroup variant="outlined" aria-label="Basic button group" fullWidth>
      {btnTextsArr.map((text, idx) => (
        <Button key={idx} onClick={onClickHandlers[idx]}>
          {text}
        </Button>
      ))}
    </ButtonGroup>
  );
};