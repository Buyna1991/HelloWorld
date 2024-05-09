"use client";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { AllCountries } from "../all-country";
import { Countries } from "../countries";
import { Continents } from "../region";
import { Language } from "../languages";
import CreateCountry from "../createCountry";
import EditCountry from "../editCountry";
import DeleteCountry from "../deleteCountry";
import { useRouter } from "next/navigation";
import { NormalCssProperties } from "@mui/material/styles/createMixins";
import { CircularProgress, Button } from "@mui/material";

import { useEffect, useState } from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 4 }}>
          <Typography
            style={{ color: "black ", height: "fit-content", display: "flex" }}
          >
            {children}
          </Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = useState(0);
  const [apiLoaded, setApiLoaded] = useState(false);
  const router = useRouter();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    router.push("/login");
    console.log("Logging out...");
  };
 

  useEffect(() => {
    const timer = setTimeout(() => {
      setApiLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "white",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {apiLoaded ? (
        <>
          <Box
            sx={{
              borderBottom: 2,
              borderColor: "divider",
              display: "flex",
              textAlign: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              style={{
                display: "flex",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Tab style={Tabstyle} label="All Country" {...a11yProps(0)} />
              <Tab style={Tabstyle} label="Country" {...a11yProps(1)} />
              <Tab
                style={Tabstyle}
                label="Filter by Region"
                {...a11yProps(2)}
              />
              <Tab
                style={Tabstyle}
                label="Filter by Language"
                {...a11yProps(3)}
              />
              <Tab
                style={Tabstyle}
                label="Create a Country"
                {...a11yProps(4)}
              />
              <Tab style={Tabstyle} label="Edit a Country " {...a11yProps(5)} />
              <Tab
                style={Tabstyle}
                label="Delete a Country"
                {...a11yProps(6)}
              />
              <Tab
                style={{
                  color: "#10a37f",
                  fontWeight: "bolder",
                  backgroundColor: "lightblue",
                }}
                onClick={handleLogOut}
                label="Log Out"
              />
            </Tabs>
          </Box>

          <CustomTabPanel value={value} index={0}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <br></br>
              <div style={Pagelayout}>
                <AllCountries></AllCountries>
              </div>
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <br></br>
              <div style={Pagelayout}>
                <Countries />
              </div>
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <br></br>
              <div style={Pagelayout}>
                <Continents />
              </div>
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <br></br>
              <div style={Pagelayout}>
                <Language />
              </div>
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={4}>
            <CreateCountry></CreateCountry>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={5}>
            <EditCountry />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={6}>
            <DeleteCountry></DeleteCountry>
          </CustomTabPanel>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
}

const Pagelayout: NormalCssProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexWrap: "wrap",
  gap: "20px",
};

const Tabstyle: NormalCssProperties = {
  color: "black",
  fontSize: "14px",
  backgroundColor: "lightblue",
  fontWeight: "700",
};
