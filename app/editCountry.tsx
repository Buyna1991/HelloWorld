import { useState } from "react";
import { Button, MenuItem, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

interface Country {
  name: {
    common: string;
  };
  population: number;
  capital: Object;
  languages: Object;
  independent: boolean;
  landlocked: boolean;
  region: string;
  flag: string;
  _id: number;
}

export default function EditCountry() {
  const [countryId, setCountryID] = useState("");
  const [countryData, setCountryData] = useState<Country | null>(null);

  const [editedName, setEditedName] = useState("");
  const [editedPopulation, setEditedPopulation] = useState("");
  const [editedRegion, setEditedRegion] = useState("");
  const [editedCapital, setEditedCapital] = useState("");
  const [editedLanguage, setEditedLanguage] = useState("");
  const [editedLandlocked, setEditedLandlocked] = useState("");
  const [editedIndependent, setEditedIndependent] = useState("");
  const [editedFlag, setEditedFlag] = useState("");
  const [successAlert, setSuccessAlert] = useState(false);

  const getCountryData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/world/countries/${countryId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data: Country = await response.json();
      setCountryData(data);
      setEditedName(data.name.common);
      setEditedPopulation(data.population.toString());
      setEditedRegion(data.region);
      setEditedCapital(Object.values(data.capital)[0]);
      setEditedLanguage(Object.keys(data.languages)[0]);
      setEditedLandlocked(data.landlocked ? "True" : "False");
      setEditedIndependent(data.independent ? "True" : "False");
      setEditedFlag(data.flag);
     
    } catch (error) {
      console.log(error);
      
    }
  };

  const saveChanges = async () => {
    try {
      const updatedData = { ...countryData } as Country;
      updatedData.name = { common: editedName };
      updatedData.population = parseInt(editedPopulation);
      updatedData.region = editedRegion;
      updatedData.capital = editedCapital.split(",");
      updatedData.flag = editedFlag;
      updatedData.languages = editedLanguage.split(",");
      updatedData.landlocked = editedLandlocked === "True";
      updatedData.independent = editedIndependent === "True";

      const response = await fetch(
        `http://localhost:8000/world/countries/${countryId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(updatedData),
        }
      );
      setSuccessAlert(true);
      console.log("Changes saved successfully!");
    } catch (error) {
      console.error("Error saving changes:", error);
      setSuccessAlert(false);
    }
  };

  const TrueFalse = [
    {
      value: "True",
      label: "True",
    },
    {
      value: "False",
      label: "False",
    },
  ];

  return (
    <Box style={{ marginLeft: "350px" }}>
      <h1 style={{ color: "#10a37f", fontSize: "25px" }}>Edit a Country</h1>

      <TextField
        style={{ width: "604px", marginTop: "10px" }}
        onChange={(event) => {
          setCountryID(event.target.value);
        }}
        required
        id="outlined-required"
        label="Country ID"
        defaultValue=""
      />
      <Button
        onClick={getCountryData}
        style={{
          width: "195px",
          height: "56px",
          marginLeft: "10px",
          marginTop: "10px",
          backgroundColor: "#10a37f",
          color: "white",
        }}
        variant="outlined"
      >
        Get Country Data
      </Button>
      <br />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          marginTop: "20px",
          gap: "10px",
          width: "1000px",
        }}
      >
        {countryData && (
          <>
            <TextField
              required
              id="outlined-required"
              label="Country Name"
              value={editedName}
              onChange={(event) => setEditedName(event.target.value)}
            />
            <TextField
              required
              id="outlined-required"
              label="Population"
              value={editedPopulation}
              onChange={(event) => setEditedPopulation(event.target.value)}
            />
            <TextField
              required
              id="outlined-required"
              label="Continent"
              value={editedRegion}
              onChange={(event) => setEditedRegion(event.target.value)}
            />
            <TextField
              required
              id="outlined-required"
              label="Capital City "
              value={editedCapital}
              onChange={(event) => setEditedCapital(event.target.value)}
            />
            <TextField
              required
              id="outlined-required"
              label="Language"
              value={editedLanguage}
              onChange={(event) => setEditedLanguage(event.target.value)}
            />

            <TextField
              required
              sx={{ width: "195px" }}
              id="outlined-select-currency"
              select
              label="Landlocked"
              value={editedLandlocked}
              onChange={(event) => setEditedLandlocked(event.target.value)}
            >
              {TrueFalse.map((option) => (
                <MenuItem
                  key={option.value.toString()}
                  value={option.value.toString()}
                >
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              required
              sx={{ width: "195px" }}
              id="outlined-select-currency"
              select
              label="Independent"
              value={editedIndependent}
              onChange={(event) => setEditedIndependent(event.target.value)}
            >
              {TrueFalse.map((option) => (
                <MenuItem
                  key={option.value.toString()}
                  value={option.value.toString()}
                >
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="outlined-required"
              label="Flag"
              value={editedFlag}
              onChange={(event) => setEditedFlag(event.target.value)}
            />
            <Button
              onClick={saveChanges}
              style={{
                width: "195px",
                height: "56px",

                backgroundColor: "#10a37f",
                color: "white",
              }}
              variant="outlined"
            >
              Save Changes
            </Button>
            <div>
              {successAlert && (
                <Alert
                  severity="success"
                  variant="outlined"
                  style={{ width: "604px",  height:"56px"}}
                  onClose={() => setSuccessAlert(false)}
                >
                  Edit Has Been Saved!!
                </Alert>
              )}
            </div>
          </>
        )}
      </div>
    </Box>
  );
}
