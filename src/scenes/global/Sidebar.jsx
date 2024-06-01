import React, { useState } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import BarChartOutlined from '@mui/icons-material/BarChartOutlined';
import TrendingUpOutlined from '@mui/icons-material/TrendingUpOutlined';
import ThumbDownOffAltOutlined from '@mui/icons-material/ThumbDownOffAltOutlined';
import SystemUpdateOutlined from '@mui/icons-material/SystemUpdateOutlined';
import FastForwardOutlined from '@mui/icons-material/FastForwardOutlined';
import CalendarMonthOutlined from '@mui/icons-material/CalendarMonthOutlined';
import HomeRepairServiceOutlined from '@mui/icons-material/HomeRepairServiceOutlined';
import AssignmentReturnedOutlined from '@mui/icons-material/AssignmentReturnedOutlined';
import AssignmentLateOutlined from '@mui/icons-material/AssignmentLateOutlined';
import TrendingDownOutlined from '@mui/icons-material/TrendingDownOutlined';
import CoPresentOutlinedIcon from '@mui/icons-material/CoPresentOutlined';
import {  KeyboardArrowDown, KeyboardArrowRight } from '@mui/icons-material';
const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const ExpandableItem = ({ title, icon, selected, setSelected, children }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <SubMenu
      title={title}
      icon={icon}
      // The 'open' prop is controlled by 'SubMenu' internally
      // but can be controlled manually if needed
      style={{
        color: colors.grey[100],
        // Apply additional styling if required
      }}
    >
      {/* Here we render the children 'MenuItem' components */}
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
          // This clones each child and may add additional props,
          // such as a modified 'onClick' that sets the 'selected' state.
          onClick: () => setSelected(child.props.title || `Item ${index}`),
          // Ensure 'active' styling is applied appropriately
          active: selected === (child.props.title || `Item ${index}`),
        })
      )}
    </SubMenu>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',  // Setting height here
        ".pro-sidebar": {
          height: '100%', // Ensures the ProSidebar fills the entire height of the Box
          minWidth: isCollapsed ? '80px' : '250px' // Make sure the ProSidebar fills the Box
        }, // Menetapkan tinggi ke 100% dari viewport
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
          height: '100%', // Pastikan inner sidebar juga mengambil tinggi penuh
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar
        collapsed={isCollapsed}
        height="400px"  // Sidebar width when collapsed
      >
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  Dashboard
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/logo.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Admin
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  Bag. Pemasaran
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            
          <ExpandableItem
            title="Dashboards"
            to="#"
            icon={<HomeOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          >
            <MenuItem
              onClick={() => setSelected("Dashboard Pertama")}
              icon={<HomeOutlinedIcon />}
            >
              <Typography>Dashboard Pertama</Typography>
              <Link to="/dashboard/dashboard1" />
            </MenuItem>
            <MenuItem
              onClick={() => setSelected("Dashboard Kedua")}
              icon={<HomeOutlinedIcon />}
            >
              <Typography>Dashboard Kedua</Typography>
              <Link to="/dashboard/dashboard2" />
            </MenuItem>
            <MenuItem
              onClick={() => setSelected("Dashboard Ketiga")}
              icon={<HomeOutlinedIcon />}
            >
              <Typography>Dashboard Ketiga</Typography>
              <Link to="/dashboard/dashboard3" />
            </MenuItem>
            <MenuItem
              onClick={() => setSelected("Dashboard Keempat")}
              icon={<HomeOutlinedIcon />}
            >
              <Typography>Dashboard Keempat</Typography>
              <Link to="/dashboard" />
            </MenuItem>
          </ExpandableItem>


            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography>
            <Item
              title="Penjualan"
              to="/penjualan"
              icon={<BarChartOutlined />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Pendapatan"
              to="/pendapatan"
              icon={<TrendingUpOutlined />}
              selected={selected}
              setSelected={setSelected}
            />  

            <Item
              title="Rating"
              to="/rating"
              icon={<ThumbDownOffAltOutlined />}
              selected={selected}
              setSelected={setSelected}
            /> 

            <Item
              title="PLN Mobile"
              to="/plnmobile"
              icon={<SystemUpdateOutlined />}
              selected={selected}
              setSelected={setSelected}
            /> 

            <Item
              title="RPT - RCT"
              to="/rptrct"
              icon={<FastForwardOutlined />}
              selected={selected}
              setSelected={setSelected}
            /> 
            
            <Item
              title="H P L"
              to="/hpl"
              icon={<CalendarMonthOutlined />}
              selected={selected}
              setSelected={setSelected}
            /> 

            <Item
              title="Penyambungan Pelanggan"
              to="/penyambunganpelanggan"
              icon={<HomeRepairServiceOutlined />}
              selected={selected}
              setSelected={setSelected}
            /> 

            <Item
              title="Retur"
              to="/retur"
              icon={<AssignmentReturnedOutlined />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Saldo Tunggakan"
              to="/saldotunggakan"
              icon={<AssignmentLateOutlined />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Piutang Prabayar"
              to="/piutangprabayar"
              icon={<TrendingDownOutlined />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Halaman
            </Typography>
            <Item
              title="Sosialisasi"
              to="/calendar"
              icon={<CoPresentOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Calendar"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Persebaran Pelanggan"
              to="/calendar"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
