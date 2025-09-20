import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";

const CustomTable = ({ columns, data }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const setfont = createTheme({
    typography: {
      fontFamily: "Vaziri",
    },
  });
  if (isMobile) {
    return (
      <ThemeProvider theme={setfont}>
        <div style={{ display: "grid", gap: "1rem" }}>
          {data.map((row, rowIndex) => (
            <Card
              key={rowIndex}
              variant="outlined"
              style={{
                backgroundColor: "rgb(228, 228, 228)",
                borderRadius: "8px",
                boxShadow: "6px rgba(0, 0, 0, 0.25)",
                padding: "1rem",
              }}
            >
              {columns.map((col, colIndex) => (
                <Box
                  key={colIndex}
                  style={{
                    marginBottom: "0.6rem",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    style={{ marginBottom: "0.2rem" }}
                  >
                    {col.headerName}
                  </Typography>
                  <Typography variant="body2">
                    {typeof col.render === "function"
                      ? col.render(row)
                      : row[col.field]}
                  </Typography>
                </Box>
              ))}
            </Card>
          ))}
        </div>
      </ThemeProvider>
    );
  }

  //show as table in desktop
  return (
    <ThemeProvider theme={setfont}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col, index) => (
                <TableCell key={index}>{col.headerName}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((col, colIndex) => (
                  <TableCell key={colIndex}>
                    {typeof col.render === "function"
                      ? col.render(row)
                      : row[col.field]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
};

export default CustomTable;
