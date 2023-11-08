import React, { useEffect, useState } from "react";
import "./plantsettings.scss";
import { useUserContext } from "../../context/UserContext";
import * as Switch from "@radix-ui/react-switch";
import * as Dialog from "@radix-ui/react-dialog";

const PlantSettings = ({
  img,
  name,
  changeName,
  place,
  mode,
  threshold,
  update,
}) => {
  const { user, setUserData } = useUserContext();
  const locations = [
    "Office",
    "Bed Room",
    "Kitchen",
    "Balcony",
    "Roof",
    "Living Room",
    "Dining Room",
    "Garden",
  ];

  const [plantName, setPlantName] = useState(name);
  const [isAutomaticMode, setIsAutomaticMode] = useState(mode);
  const [selected, setSelected] = useState(place);
  const [newThreshold, setNewThreshold] = useState(threshold || " ");

  const handleInputChange = (event) => {
    setPlantName(event.target.value);
  };
  const handleSwitchToggle = () => {
    setIsAutomaticMode(!isAutomaticMode);
  };
  const handleSelectionChange = (value) => {
    setSelected(value);
  };
  const handleThresholdChange = (e) => {
    const value = e.target.value;
    if (value === "" || (value >= 0 && value <= 100)) {
      setNewThreshold(value);
    }
  };

  const updatePlant = () => {
    fetch(`http://3.124.188.58/api/plant/${img}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        plantName: plantName,
        mode: isAutomaticMode,
        location: selected,
        threshold: newThreshold,
      }),
    })
      .then((response) => {
        if (response.ok) {
          changeName(plantName);
          update(true);
        }
      })
      .catch((error) => {});
  };

  return (
    <div className="plant_settings">
      <div className="divcontent">
        <div className="divimg">
          <div className="round">
            <img src={`/assets/img/${img}.png`} alt={name} />
          </div>
          <div className="pname">
            <span>{name}</span>
          </div>
        </div>
        <div className="inputfield">
          <h4>Name</h4>
          <div className="givenname">
            <input type="text" onChange={handleInputChange} value={plantName} />
          </div>
        </div>

        <div className="placedIn">
          <h4>Placed In</h4>
          <div className="location">
            {locations.map((value, index) => (
              <h4
                key={index}
                onClick={() => handleSelectionChange(value)}
                className={value === selected ? "selected" : ""}
              >
                {value}
              </h4>
            ))}
          </div>
        </div>

        <form className="wateringmode">
          <h4>Watering Mode</h4>
          <div style={{ display: "flex", alignItems: "center" }}>
            <label
              className="Label"
              htmlFor="automatic-mode"
              style={{ paddingRight: 15 }}
            >
              Automatic mode
            </label>
            <Switch.Root
              className="SwitchRoot"
              id="automatic-mode"
              defaultChecked={isAutomaticMode}
              onCheckedChange={handleSwitchToggle}
            >
              <Switch.Thumb className="SwitchThumb" />
            </Switch.Root>
          </div>
          {isAutomaticMode && (
            <div className="threshold">
              <input
                type="number"
                name="threshold"
                value={newThreshold}
                onChange={handleThresholdChange}
                placeholder="Enter lower moisture threshold"
              />
            </div>
          )}

          <Dialog.Close asChild>
            <button onClick={updatePlant} className="Button">
              Save changes
            </button>
          </Dialog.Close>
        </form>
      </div>
    </div>
  );
};
export default PlantSettings;
