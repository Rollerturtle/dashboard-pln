import { Box, Button, IconButton, Typography, useTheme, Select, MenuItem, InputLabel, FormControl, Tabs, Tab } from "@mui/material";
import { tokens } from "../../../theme";
import React, {useState} from "react";

const TabContentTwo = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
    return (
        <>
             {/* Row 1 */}
             <Box gridColumn="span 5" gridRow="span 2" backgroundColor={colors.primary[400]} p="30px">
              <Typography
                  variant="h5"
                  fontWeight="600"
                  sx={{ marginBottom: "15px" }}
                >
                  Barchart Rating Negatif
                </Typography>
            </Box>
            <Box gridColumn="span 2" gridRow="span 2" backgroundColor={colors.primary[400]} p="30px">
              <Typography
                  variant="h5"
                  fontWeight="600"
                  sx={{ marginBottom: "15px" }}
                >
                  Fakta Rating 
                </Typography>
            </Box>
            <Box gridColumn="span 5" gridRow="span 2" backgroundColor={colors.primary[400]} p="30px">
              <Typography
                  variant="h5"
                  fontWeight="600"
                  sx={{ marginBottom: "15px" }}
                >
                  Linechart instalasi PLN Mobile
                </Typography>
            </Box>

            {/* Row 2 */}
            <Box gridColumn="span 8" gridRow="span 2" backgroundColor={colors.primary[400]} p="30px">
              <Typography
                  variant="h5"
                  fontWeight="600"
                  sx={{ marginBottom: "15px" }}
                >
                  Grafik RPT-RCT
                </Typography>
            </Box>
            <Box gridColumn="span 2" gridRow="span 1" backgroundColor={colors.primary[400]} p="30px">
              <Typography
                  variant="h5"
                  fontWeight="600"
                  sx={{ marginBottom: "15px" }}
                >
                  Fakta RPT
                </Typography>
            </Box>
            <Box gridColumn="span 2" gridRow="span 1" backgroundColor={colors.primary[400]} p="30px">
              <Typography
                  variant="h5"
                  fontWeight="600"
                  sx={{ marginBottom: "15px" }}
                >
                  Fakta RCT
                </Typography>
            </Box>
            <Box gridColumn="span 4" gridRow="span 1" backgroundColor={colors.primary[400]} p="30px">
              <Typography
                  variant="h5"
                  fontWeight="600"
                  sx={{ marginBottom: "15px" }}
                >
                  Fakta RPT-RCT
                </Typography>
            </Box>

            {/* Row 3 */}
            <Box gridColumn="span 3" gridRow="span 1" backgroundColor={colors.primary[400]} p="30px">
              <Typography
                  variant="h5"
                  fontWeight="600"
                  sx={{ marginBottom: "15px" }}
                >
                  Fakta HPL Gabungan
                </Typography>
            </Box>
            <Box gridColumn="span 3" gridRow="span 1" backgroundColor={colors.primary[400]} p="30px">
              <Typography
                  variant="h5"
                  fontWeight="600"
                  sx={{ marginBottom: "15px" }}
                >
                  Fakta HPL Gabungan
                </Typography>
            </Box>
            <Box gridColumn="span 6" gridRow="span 2" backgroundColor={colors.primary[400]} p="30px">
              <Typography
                  variant="h5"
                  fontWeight="600"
                  sx={{ marginBottom: "15px" }}
                >
                  Linechart HPL
                </Typography>
            </Box>
            <Box gridColumn="span 2" gridRow="span 1" backgroundColor={colors.primary[400]} p="30px">
              <Typography
                  variant="h5"
                  fontWeight="600"
                  sx={{ marginBottom: "15px" }}
                >
                  Fakta HPL Tanpa Perluasan
                </Typography>
            </Box>
            <Box gridColumn="span 2" gridRow="span 1" backgroundColor={colors.primary[400]} p="30px">
              <Typography
                  variant="h5"
                  fontWeight="600"
                  sx={{ marginBottom: "15px" }}
                >
                  Fakta HPL JTR Only
                </Typography>
            </Box>
            <Box gridColumn="span 2" gridRow="span 1" backgroundColor={colors.primary[400]} p="30px">
              <Typography
                  variant="h5"
                  fontWeight="600"
                  sx={{ marginBottom: "15px" }}
                >
                  Fakta HPL JTR & Trafo
                </Typography>
            </Box>
        </>
    );
}

export default TabContentTwo;
