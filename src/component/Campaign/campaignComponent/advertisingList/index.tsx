import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";

const AdvertisingList = ({
  fullData,
  data,
  setCampaign,
  campaign,
  setNumQc,
  numQc,
  indexCamp,
  setCurrentCampaignIndex,
  currentCampaignIndex
}: any) => {

  const [selected, setSelected] = useState<number[]>([]);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const allAdIndices: number[] = data.map((_:any, index:any) => index);
      setSelected(allAdIndices);
    } else { 
      setSelected([]);
    }
  };

  const handleRowClick = (event: React.MouseEvent, index: number) => {
    event.stopPropagation();
    const selectedIndex = selected.indexOf(index);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = [...selected, index];
    } else if (selectedIndex === 0) {
      newSelected = [...selected.slice(1)];
    } else if (selectedIndex === selected.length - 1) {
      newSelected = [...selected.slice(0, -1)];
    } else if (selectedIndex > 0) {
      newSelected = [
        ...selected.slice(0, selectedIndex),
        ...selected.slice(selectedIndex + 1),
      ];
    }

    setSelected(newSelected);
  };

  const isSelected = (index: number) => selected.includes(index);

  // const handleAddAdvertising = () => {
  //   // Thêm quảng cáo mới vào danh sách quảng cáo của chiến dịch hiện tại
  //   const newAdvertising = { name: `quảng cáo ${numQc}`, quantity: 0 };
  //   const updatedData = [...data, newAdvertising];
  //   setNumQc(numQc + 1); // Tăng numQc lên 1 để chuẩn bị cho quảng cáo tiếp theo

  //   // Cập nhật chiến dịch hiện tại với danh sách quảng cáo mới
  //   setCampaign((prevCampaign: any) => ({
  //     ...prevCampaign,
  //     subCampaigns: prevCampaign.subCampaigns.map((item: any, index: number) => {
  //       if (index === indexCamp) {
  //         return {
  //           ...item,
  //           ads: updatedData,
  //         };
  //       } else {
  //         return item;
  //       }
  //     }),
  //   }));
  // };


  const handleAddAdvertising = () => {
    const newAdvertising = { name: `quảng cáo ${numQc}`, quantity: 0 };
    setNumQc(numQc + 1); // Tăng số quảng cáo lên 1
    const updatedData = [...data, newAdvertising];

    setCampaign((prevCampaign:any) => ({
      ...prevCampaign,
      subCampaigns: prevCampaign.subCampaigns.map((item: any, index: number) => {
        if (index === indexCamp) {
          return {
            ...item,
            ads: updatedData,
          };
        } else {
          return item;
        }
      }),
    }));
  }
  // const handleAddAdvertising = () => {
  //   const newAdvertising = {
  //     name: `quảng cáo ${numQc}`,
  //     quantity: 0,
  //   };
    
  //   // Tăng số thứ tự quảng cáo của chiến dịch hiện tại lên 1
  //   const updatedCampaign = { ...campaign };
  //   updatedCampaign.subCampaigns[currentCampaignIndex].ads.push(newAdvertising);
    
  //   setNumQc(numQc + 1); // Tăng số quảng cáo lên 1
  //   setCampaign(updatedCampaign);
  // };


  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedData = [...data];
    updatedData[index] = { ...updatedData[index], name: e.target.value }; // Sao chép quảng cáo và chỉ thay đổi tên của quảng cáo cụ thể
  
    setCampaign((prevCampaign: any) => ({
      ...prevCampaign,
      subCampaigns: prevCampaign.subCampaigns.map((item: any, indexSub: number) => {
        if (indexSub === indexCamp) {
          return {
            ...item,
            ads: updatedData,
          };
        } else {
          return item;
        }
      }),
    }));
  };
  
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedData = [...data];
    updatedData[index].quantity = Number(event.target.value);
    setCampaign((prevCampaign: any) => ({
      ...prevCampaign,
      subCampaigns: prevCampaign.subCampaigns.map((item: any,indexSub:any) =>{
        if (indexSub === indexCamp) {
          return {
            ...item,
            ads: updatedData,
          };
        } else {
          return item;
        }
      }
      ),
    }));
  };
  const handleRemoveAdvertising = (index: number) => {
    const updatedData = [...data];
    updatedData.splice(index, 1); // Xóa quảng cáo tại index
  
    // Cập nhật index của quảng cáo trong danh sách sau khi xóa
    // updatedData.forEach((ad, adIndex) => {
    //   ad.name = `quảng cáo ${numQc + adIndex}`;
    // });
  
    setCampaign((prevCampaign: any) => ({
      ...prevCampaign,
      subCampaigns: prevCampaign.subCampaigns.map((item: any, index: number) => {
        if (index === indexCamp) {
          return {
            ...item,
            ads: updatedData,
          };
        } else {
          return item;
        }
      }),
    }));
  
    // Cập nhật lại numQc nếu index của quảng cáo bị xóa lớn hơn hoặc bằng numQc
    if (index + 1 >= numQc) {
      setNumQc(index + 2); // +2 để đảm bảo số tiếp theo là numQc + 1
    }
  };
  
  return (
    <Table aria-label="ad table">
      <TableBody className="tab_head">
          <TableCell style={ {padding:'0 4px', width: 60 }}>
         
              <FormControlLabel
                    control={
                      <Checkbox
                      indeterminate={selected.length > 0 && selected.length < data.length}
                      checked={selected.length > 0 && selected.length === data.length}
                      onChange={handleSelectAllClick}
                    />
                    }
                    label=""
                  />
          </TableCell>

          <TableCell>
            <p style={{ fontWeight: "bold" }}>Tên quảng cáo*</p>
          </TableCell>
          <TableCell style={{ width: "38%" }}>
            <p style={{ fontWeight: "bold" }}>Số lượng*</p>
          </TableCell>
          <TableCell align="right">
          <Button
              onClick={handleAddAdvertising}
              variant="outlined"
              color="primary"
            >
              Thêm
            </Button>
                </TableCell>
 

      </TableBody>
      <TableBody className="tab_bot">
        {/* <div className="body_list_campaign"> */}

    
        {data &&
          data.map((row: any, index: number) => {
            const isItemSelected = isSelected(index);

            return (
              <TableRow
                key={index}
                role="checkbox"
                selected={isItemSelected}
              >
                <TableCell style={{ padding: "0 4px" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onClick={(event) => handleRowClick(event, index)}
                        checked={isItemSelected}
                        color="primary"
                      />
                    }
                    label=""
                  />
                </TableCell>
                <TableCell>
                  <div>
                    <TextField
                      type="text"
                      value={row.name}
                      id="standard-basic"
                      variant="standard"
                      onChange={(e:any) => handleNameChange(e, index)}
                    />
                  </div>
                </TableCell>
                <TableCell style={{ width: "50%" }}>
                  <div>
                    <TextField
                      type="number"
                      value={row.quantity}
                      id="standard-basic"
                      variant="standard"
                      onChange={(e:any) => handleQuantityChange(e, index)}
                    />
                  </div>
                </TableCell>
                <TableCell align="right">
                  <Button onClick={()=> handleRemoveAdvertising(index) } variant="outlined" color="error">
                    Xóa
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
              {/* </div> */}
      </TableBody>
    </Table>
  );
};

export default AdvertisingList;
