import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Tooltip from "@mui/material/Tooltip";
import AdvertisingList from "./advertisingList";

const CampaignComponent = ({
  campaign,
  setCampaign,
}: {
  campaign: any;
  setCampaign: any;
}) => {
  const [value, setValue] = useState("");
  const [indexCamp, setIndexCamp] = useState(0);
  const [campaignNum, setCampaignNum] = useState(2);
  const [numQc, setNumQc] = useState(2); // Ban đầu, numQc có giá trị 1
  const [currentCampaignIndex, setCurrentCampaignIndex] = useState(0);



  const [subCampaignStatus, setSubCampaignStatus] = useState(
    campaign.subCampaigns.map((a: any) => a.status)
  );
  // const totalQuantities: { [index: number]: number } = {};

  // // Tính totalQuantity cho từng chiến dịch con
  // campaign.subCampaigns.forEach((subCampaign:any, index:number) => {
  //   const quantityReducer = (accumulator:any, currentAd:any) => accumulator + currentAd.quantity;
  //   console.log(subCampaign);
    
  //   // totalQuantities[index] = subCampaign.ads.reduce(quantityReducer, 0);
  // });
  
  // // Bây giờ bạn có một đối tượng totalQuantities chứa totalQuantity cho từng chiến dịch con
  // console.log(totalQuantities);
  const quantityReducer = (accumulator:any, currentAd:any) => accumulator + currentAd.quantity;
    const arrIndex = campaign.subCampaigns[indexCamp];
    // const arrIndex.ads.reduce(quantityReducer, 0);
  const numQc2 = 1;
  console.log(arrIndex.ads);
  useEffect(() => {
    setValue(campaign.subCampaigns[campaign.subCampaigns.length - 1].name);
    setIndexCamp(campaign.subCampaigns.length - 1);
  }, [campaign.subCampaigns.length]);

  //handle
  const handleCheckboxChange = (e: any) => {
    const updatedSubCampaigns = [...campaign.subCampaigns];
    updatedSubCampaigns[indexCamp] = {
      ...updatedSubCampaigns[indexCamp],
      status: !subCampaignStatus[indexCamp], // Thay đổi trạng thái tại chỉ số index
    };
    setSubCampaignStatus((prevStatus: any) => {
      const newStatus = [...prevStatus];
      newStatus[indexCamp] = !newStatus[indexCamp];
      return newStatus;
    });
    setCampaign((prevCampaign: any) => ({
      ...prevCampaign,
      subCampaigns: updatedSubCampaigns,
    }));
  };
  const handleAddCampaign = () => {
    setNumQc(2)
    setCampaignNum(campaignNum + 1);
    const newObject = {
      name: `Chiến dịch con ${campaignNum}`,
      status: true,
      ads: [{ quantity: 0, name: `Quảng cáo ${numQc2}` }],
    };
    setCampaign((prevState: any) => ({
      ...prevState,
      subCampaigns: [...prevState.subCampaigns, newObject],
    }));
  };
  const handleClickCampaign = (campai: any, index: number) => {
    setIndexCamp(index);
    setValue(campai.name);
    setNumQc(2)
  };

  

  return (
    <div>
      <div className="campaign__main">
        <div className="campain_left">
          <div onClick={handleAddCampaign} className="btn-add">
            <AddIcon />
          </div>
        </div>
        <div className="campain_list campain_right">
          {campaign &&
            campaign.subCampaigns.map((campai: any, index: number) => {
              return (
                <div key={index}>
                  <div
                    onClick={() => handleClickCampaign(campai, index)}
                    className={`campaign ${value == campai.name && "active"}`}
                  >
                    <div className="campaign_content">
                      <div className="campaign_content_head">
                        <span>
                          <div className="campain_name">
                            {" "}
                            {campai.name}
                            <span className="">
                              {!campai.status ? (
                                <CheckCircleOutlineIcon className="icon_done" />
                              ) : (
                                <CheckCircleIcon className="icon_done" />
                              )}
                            </span>
                          </div>
                        </span>
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <Tooltip title="Số lượng">
                          <div>
                            {/* {totalQuantities[0]} */}
</div>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="child_campaign">
        <TextField
          value={campaign.subCampaigns[indexCamp].name}
          sx={{ width: "80%" }}
          id="standard-basic"
          label="Tên chiến dịch con *"
          variant="standard"
          onChange={(e) => {
            const updatedSubCampaigns = [...campaign.subCampaigns];
            updatedSubCampaigns[indexCamp] = {
              ...updatedSubCampaigns[indexCamp],
              name: e.target.value,
            };
            setCampaign((prevCampaign: any) => ({
              ...prevCampaign,
              subCampaigns: updatedSubCampaigns,
            }));
            setValue(updatedSubCampaigns[indexCamp].name);
          }}
        />

        <FormControlLabel
          sx={{ width: "20%" }}
          control={<Checkbox defaultChecked />}
          label="Đang hoạt động"
          checked={campaign.subCampaigns[indexCamp].status}
          onChange={handleCheckboxChange}
        />
      </div>
      <div className="advertising_list">
        <AdvertisingList
          fullData={campaign.subCampaigns}
          campaign={campaign}
          setCampaign={setCampaign}
          data={campaign.subCampaigns[indexCamp].ads}
          indexCamp={indexCamp}
          numQc={numQc}
          setNumQc={setNumQc}
          setCurrentCampaignIndex={setCurrentCampaignIndex}
          currentCampaignIndex={currentCampaignIndex}
        />
      </div>
    </div>
  );
};

export default CampaignComponent;
