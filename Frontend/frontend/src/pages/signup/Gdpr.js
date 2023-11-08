import React, { useEffect, useState } from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import "./gdpr.scss";
const Gdpr = ({ handleCheckbox }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    handleCheckbox(!isChecked);
  };

  return (
    <div className="GdprContainer">
      <div style={{ display: "flex", alignItems: "center" }}>
        <Checkbox.Root
          onCheckedChange={handleCheckboxChange}
          className="CheckboxRoot"
          id="c1"
        >
          <Checkbox.Indicator className="CheckboxIndicator">
            <CheckIcon
              style={{ width: "20px", height: "20px", paddingTop: "3px" }}
            />
          </Checkbox.Indicator>
        </Checkbox.Root>
      </div>
      <div className="text">
        <span>
          I consent GrowGenius to ........ See our <a> privacy policy </a>
          and <a> terms & conditions </a> for your rights under GDPR.
        </span>
      </div>
    </div>
  );
};

export default Gdpr;
