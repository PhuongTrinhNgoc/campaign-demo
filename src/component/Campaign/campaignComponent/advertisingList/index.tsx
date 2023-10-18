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
  onNameChange,
  onQuantityChange,
}: any) => {
  const numQc = 1;

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

  const handleAddAdvertising = () => {
    // Thêm quảng cáo mới vào danh sách
    const newAdvertising = { name: `quảng cáo ${numQc + 1}`, quantity: 0 };
    const updatedData = [...data, newAdvertising];
    console.log(data);
    setCampaign((prevCampaign: any) => ({
      ...prevCampaign,
      subCampaigns: prevCampaign.subCampaigns.map( (item:any)=>  ({...item,ads:updatedData} )),
    }));
    console.log(fullData);
    
  };

  return (
    <Table aria-label="ad table">
      <TableHead>
        <TableRow>
          <TableCell style={{ width: 60 }}>
            <Checkbox
              indeterminate={selected.length > 0 && selected.length < data.length}
              checked={selected.length === data.length}
              onChange={handleSelectAllClick}
            />
          </TableCell>
          <TableCell>
            <p style={{ fontWeight: "bold" }}>Tên quảng cáo*</p>
          </TableCell>
          <TableCell style={{ width: "38%" }}>
            <p style={{ fontWeight: "bold" }}>Số lượng*</p>
          </TableCell>
          <TableCell style={{ padding: "0 16px", width: 120 }}>
            <Button
              onClick={handleAddAdvertising}
              variant="outlined"
              color="primary"
            >
              Thêm
            </Button>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
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
                    label="Label"
                  />
                </TableCell>
                <TableCell>
                  <div>
                    <TextField
                      type="text"
                      value={row.name}
                      id="standard-basic"
                      variant="standard"
                      onChange={(e) => onNameChange(e, index)}
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
                      onChange={(e) => onQuantityChange(e, index)}
                    />
                  </div>
                </TableCell>
                <TableCell align="right">
                  <Button variant="outlined" color="primary">
                    Sửa
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
};

export default AdvertisingList;
