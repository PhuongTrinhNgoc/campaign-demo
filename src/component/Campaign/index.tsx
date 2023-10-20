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
  const [indexCamp, setIndexCamp] = useState(0);
  const [subCampaignStatus2, setSubCampaignStatus2] = useState({});
  const [value2, setValue2] = useState("");
  const [valueTab, setValueTab] = useState("1");
  const [indexActive, setIndexActive] = useState(0);
  //handle

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setValueCampaign((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    setValueTab(newValue);
  };

  console.log(value2);

  const extractAllAds = (campaignData: any) => {
    const allAds: any = [];

    campaignData[indexCamp]?.ads?.forEach((ad: any) => {
      allAds.push(ad.quantity);
    });

    return allAds;
  };
  const allAds: any = extractAllAds(campaign.subCampaigns);
  // console.log(allAds);

  const handleSubmit = () => {
    setSubmitted(true);
  };
  const handleClickCampaign = (campai: any, index: number) => {
    setIndexCamp(index);
    setValue2(campai.name);
    setIndexActive(index);
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
              <div className="fild_under">
                <TextField
                  name="campaignName"
                  label="Tên chiến dịch"
                  onChange={handleInputChange}
                  value={valueCampaign.campaignName}
                  variant="standard"
                  id="standard-basic"
                  className={`${
                    valueCampaign.campaignName == "" && submitted ? "error" : ""
                  }`}
                />
                {valueCampaign.campaignName == "" && submitted ? (
                  <div className="text_err">Dữ liệu không hợp lệ</div>
                ) : (
                  ""
                )}
              </div>

              <div className="fild_under">
                <TextField
                  name="campaignDescription"
                  label="Mô tả chiến dịch"
                  onChange={handleInputChange}
                  value={valueCampaign.campaignDescription}
                  variant="standard"
                  id="standard-basic"
                />
                {/* {valueCampaign.campaignDescription == "" && submitted ? (
                  <div className="text_err">Dữ liệu không hợp lệ</div>
                ) : (
                  ""
                )} */}
              </div>
            </div>
          </TabPanel>
          <TabPanel value="2">
            <CampaignComponent
              campaign={campaign}
              setCampaign={setCampaign}
              submitted={submitted}
              setIndexCamp={setIndexCamp}
              indexCamp={indexCamp}
              allAds={allAds}
              setSubCampaignStatus2={setSubCampaignStatus2}
              subCampaignStatus2={subCampaignStatus2}
              setValue2={setValue2}
              handleClickCampaign={handleClickCampaign}
              setIndexActive={setIndexActive}
              indexActive={indexActive}
              valueTab={valueTab}
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
