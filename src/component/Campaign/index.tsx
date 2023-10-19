import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Tab from "@mui/material/Tab";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { initialCampaign } from "../../../src/data";
import CampaignComponent from "./campaignComponent";

const Campaign = () => {
  type CampaignData = {
    campaignName: string;
    campaignDescription: string;
  };

  const [value, setValue] = React.useState("1");
  const [campaign, setCampaign] = useState(initialCampaign);
  const [submitted, setSubmitted] = useState(false);
  const [valueCampaign, setValueCampaign] = useState<CampaignData>({
    campaignName: "",
    campaignDescription: "",
  });

  //handle

  console.log(valueCampaign);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setValueCampaign((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const handleSubmit = () => {
    setSubmitted(true);
  };
  return (
    <div className="content">
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Thông tin" value="1" />
              <Tab label="Chiến dịch con" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <div className="main_file_left">
       
            <TextField
              name="campaignName"
              label="Tên chiến dịch"
              onChange={handleInputChange}
              value={valueCampaign.campaignName}
              variant="standard"
              id="standard-basic"
            />

            <TextField
              name="campaignDescription"
              label="Mô tả chiến dịch"
              onChange={handleInputChange}
              value={valueCampaign.campaignDescription}
              variant="standard"
              id="standard-basic"
            />
                   
                   </div>
          </TabPanel>
          <TabPanel value="2">
            <CampaignComponent
              campaign={campaign}
              setCampaign={setCampaign}
              submitted={submitted}
              setSubmitted={setSubmitted}
            />
          </TabPanel>
        </TabContext>
      </Box>
      <div className="submit">
        <Button onClick={handleSubmit} variant="contained">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Campaign;
