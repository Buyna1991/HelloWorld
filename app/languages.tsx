import Link from "next/link";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, MenuItem, Select } from "@mui/material";
import { NormalCssProperties } from "@mui/material/styles/createMixins";
interface Country {
  _id: String;
  name: { common: String };
  region: String;
  capital: String[];
  flag: String;
  landlocked: boolean;
  independent: boolean;
  population: Number;
  maps: { googleMaps: String };
  languages: { [key: string]: string };
}

export const Language = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [countryData, setCountryData] = useState<Country[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/world/countriesbyLanguage/${selectedLanguage}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setCountryData(response.data);
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    };

    fetchData();
  }, [selectedLanguage]);

  const handleDropdownChange = async (event: any) => {
    const selectedLanguage = event.target.value;
    setSelectedLanguage(selectedLanguage);
  };

  return (
    <div>
      <Box style={{ paddingLeft: "56px" }}>
        <h1 style={{ color: "#10a37f", fontSize: "25px" }}>
          API:"/world/countriesbyLanguage{selectedLanguage}"
        </h1>
        <Select
          sx={{ width: "520px" }}
          value={selectedLanguage}
          onChange={handleDropdownChange}
          displayEmpty
          inputProps={{ "aria-label": "Select a filter" }}
        >
          <MenuItem value="">Choose a Language</MenuItem>
          <MenuItem value="Mongolian">Mongolian</MenuItem>
          <MenuItem value="English">English</MenuItem>
          <MenuItem value="Greek">Greek</MenuItem>
          <MenuItem value="Chinese">Chinese</MenuItem>
        </Select>
      </Box>
      <br></br>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          alignItems: "center",
          paddingLeft: "56px",
        }}
      >
        {countryData.map((country) => (
          <Box key={String(country._id)} sx={Boxstyle}>
            <h2
              style={{
                color: "Black",
                backgroundColor: "lightblue",
                borderRadius: "5px",
                textAlign: "center",
                fontWeight: "700",
              }}
            >
              {country.name.common}
            </h2>
            <h2 style={{ color: "Black" }}>
              Population: {JSON.stringify(country.population)}
            </h2>
            <h2 style={{ color: "Black" }}>Continent: {country.region}</h2>
            <h2 style={{ color: "Black", display: "flex" }}>
              Capital:{" "}
              {Array.isArray(country.capital) ? (
                <p>
                  {country.capital.map((capital, index) => (
                    <p key={index}>{capital}</p>
                  ))}
                </p>
              ) : (
                <p></p>
              )}
            </h2>
            <h2 style={{ color: "Black", display: "flex" }}>
              Language:{" "}
              {country.languages &&
              Object.keys(country.languages).length > 0 ? (
                <div>
                  {Object.keys(country.languages).map(
                    (language, index) =>
                      index === 0 && (
                        <p key={index}>{country.languages[language]}</p>
                      )
                  )}
                </div>
              ) : (
                <p>No languages available</p>
              )}
            </h2>
            <h2
              style={{
                color: "Black",
                fontSize: "200px",
                position: "absolute",
                top: "10px",
                right: "20px",
              }}
            >
              {country.flag}
            </h2>
            <h2 style={{ color: "Black" }}>
              Landlocked: {JSON.stringify(country.landlocked)}
            </h2>
            <h2 style={{ color: "Black" }}>
              Independent: {JSON.stringify(country.independent)}
            </h2>
            {country.maps && country.maps.googleMaps && (
              <h2 style={{ color: "Black" }}>
                Google Map:{" "}
                <Link
                  target="_blank"
                  href={String(country.maps.googleMaps)}
                  passHref
                >
                  {country.maps.googleMaps}
                </Link>
              </h2>
            )}
            <h2 style={{ color: "Black" }}>Id : {country._id}</h2>
          </Box>
        ))}
      </Box>
    </div>
  );
};

const Pagelayout: NormalCssProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexWrap: "wrap",
  gap: "20px",
};

const Boxstyle: NormalCssProperties = {
  overflow: "hidden",
  position: "relative",
  justifyContent: "center",
  border: 2,
  borderRadius: 5,
  borderColor: "primary.main",
  padding: 2,
  marginBottom: 2,
  width: 520,
  fontSize: 20,
  boxShadow: "10",
};
