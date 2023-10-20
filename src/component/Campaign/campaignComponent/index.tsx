import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Tooltip from "@mui/material/Tooltip";
import AdvertisingList from "./advertisingList";
import DeleteIcon from "@mui/icons-material/Delete";

const CampaignComponent = ({
  campaign,
  setCampaign,
  submitted,
  setIndexCamp,
  indexCamp,
  allAds,
  setSubCampaignStatus2,
  subCampaignStatus2,
}: {
  campaign: any;
  setCampaign: any;
  submitted: any;
  setIndexCamp: any;
  indexCamp: any;
  allAds: any;
  setSubCampaignStatus2: any;
  subCampaignStatus2: any;
}) => {
  const [value, setValue] = useState("");
  const [campaignNum, setCampaignNum] = useState(2);
  const [totalQuantities, setTotalQuantities] = useState<number[]>([]);
  const [subCampaignStatus, setSubCampaignStatus] = useState(
    campaign.subCampaigns.map((a: any) => a.status)
  );

  const calculateTotalQuantity = (subCampaign: any) => {
    return subCampaign.ads.reduce(
      (total: any, ad: any) => total + ad.quantity,
      0
    );
  };

  useEffect(() => {
    const quantities = campaign.subCampaigns.map(calculateTotalQuantity);
    setTotalQuantities(quantities);
  }, [campaign.subCampaigns]);

  useEffect(() => {
    setValue(campaign.subCampaigns[campaign.subCampaigns.length - 1]?.name);
    setIndexCamp(campaign.subCampaigns.length - 1);
  }, [campaign.subCampaigns.length]);

  const newAllAds = allAds.filter((fil: any) => {
    return fil > 0;
  });
  console.log(newAllAds);

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
    setCampaignNum(campaignNum + 1);
    const newObject = {
      name: `Chiến dịch con ${campaignNum}`,
      status: true,
      ads: [{ quantity: 0, name: `Quảng cáo 1` }],
    };
    setCampaign((prevState: any) => ({
      ...prevState,
      subCampaigns: [...prevState.subCampaigns, newObject],
    }));
  };

  const handleClickCampaign = (campai: any, index: number) => {
    setIndexCamp(index);
    setValue(campai.name);
  };

  const handleRemoveCampaign = (indexToRemove: number) => {
    setCampaign((prevCampaign: any) => {
      const updatedSubCampaigns = [...prevCampaign.subCampaigns];
      updatedSubCampaigns.splice(indexToRemove, 1);
      return {
        ...prevCampaign,
        subCampaigns: updatedSubCampaigns,
      };
    });
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
          {campaign.subCampaigns.length > 0 ? (
            campaign.subCampaigns.map((campai: any, index: number) => {
              return (
                <div className="position-re" key={index}>
                  <div
                    onClick={() => handleClickCampaign(campai, index)}
                    className={`campaign ${value == campai.name && "active"}  ${
                      subCampaignStatus2[index] === "error"
                        ? "error"
                        : "" && campaign?.subCampaigns[indexCamp]?.name !== '' && submitted
                        ? "error"
                        : ""
                    }`  }
                  >
                    <div className="campaign_content">
                      <div className="campaign_content_head">
                        <span>
                          <div
                            className={` campain_name ${
                              subCampaignStatus2[index] === "error"
                                ? "error"
                                : "" && campaign?.subCampaigns[indexCamp]?.name !== '' && submitted
                                ? "error"
                                : ""
                            }`}
                          >
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
                      <div
                        className="deleteCampaign"
                        onClick={() => handleRemoveCampaign(index)}
                      >
                        <DeleteIcon className="icon_delete" />
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <Tooltip title="Số lượng">
                          <h5 className="total_quantyti">
                            {totalQuantities[index]}
                          </h5>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="campaign_none">Bạn chưa có chiến dịch nào</div>
          )}
        </div>
      </div>
      {campaign.subCampaigns.length > 0 && (
        <>
          <div className="child_campaign">
          <div className="fild_under">
            <TextField
              value={campaign && campaign?.subCampaigns[indexCamp]?.name}
              sx={{ width: "80%" }}
              id="standard-basic"
              label="Tên chiến dịch con *"
              variant="standard"
              className={`${campaign?.subCampaigns[indexCamp]?.name == '' && 'error'}`}
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
                {campaign?.subCampaigns[indexCamp]?.name == '' && submitted ? (
                  <div className="text_err text_err_campaign">Dữ liệu không hợp lệ</div>
                ) : (
                  ""
                )}
          </div>

            <FormControlLabel
              sx={{ width: "20%" }}
              control={<Checkbox defaultChecked />}
              label="Đang hoạt động"
              checked={campaign.subCampaigns[indexCamp]?.status}
              onChange={handleCheckboxChange}
            />
          </div>

          <div className="advertising_list">
            <AdvertisingList
              setCampaign={setCampaign}
              campaign={campaign}
              data={campaign.subCampaigns[indexCamp]?.ads}
              indexCamp={indexCamp}
              totalQuantities={totalQuantities}
              submitted={submitted}
              allAds={allAds}
              setSubCampaignStatus={setSubCampaignStatus}
              setSubCampaignStatus2={setSubCampaignStatus2}
              subCampaignStatus2={subCampaignStatus2}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CampaignComponent;
