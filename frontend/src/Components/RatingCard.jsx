import {React, useState} from "react";
import "./css/RatingCard.css";
import { Slider } from "@nextui-org/react";

function RatingCard() {
  const [value, setValue] = useState(0);
  return (
    <div className="Rating">
      <h1>Rate this Course</h1>
      <div className="flex flex-col gap-2 w-full h-full max-w-md items-start justify-center">
        <Slider
          aria-label="Rating"
          size="lg"
          color="warning"
          onChangeEnd={setValue}
          className="max-w-md"
          step={0.1}
          maxValue={5.0}
          minValue={1.00}
         
        />
        <p className="text-default-500 font-medium text-small">
          Your Rating : {value} / 5
        </p>
      </div>
    </div>
  );
}

export default RatingCard;
