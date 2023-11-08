import { React, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Plant from "./Plant";
import { Cross2Icon } from "@radix-ui/react-icons";
import "./plantDialog.css";
import PlantSettings from "./plantSettings/PlantSettings";
const PlantDialog = ({
  img,
  name,
  age,
  condition,
  changeName,
  place,
  mode,
  threshold,
  update,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog.Root>
      <Dialog.Trigger
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <Plant img={img} name={name} age={age} condition={condition} />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">Plant Settings</Dialog.Title>
          <PlantSettings
            img={img}
            name={name}
            changeName={changeName}
            place={place}
            mode={mode}
            threshold={threshold}
            update={update}
          />
          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close">
              <Cross2Icon style={{ width: "22px", height: "22px" }} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
export default PlantDialog;
