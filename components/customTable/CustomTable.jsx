import React from "react";
import { Card, Typography, useMediaQuery } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
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
  function getTextWidth(text, font = "14px Roboto") {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.font = font;
    return context.measureText(text).width;
  }

  function autoSizeColumns(data, columns) {
    return columns.map((col) => {
      const maxText = Math.max(
        getTextWidth(col.headerName || ""),
        ...data.map((row) =>
          getTextWidth(row[col.field] ? String(row[col.field]) : "")
        )
      );
      return { ...col, width: maxText + 40 };
    });
  }

  //show as table in desktop
  return (
    <ThemeProvider theme={setfont}>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={data}
          columns={autoSizeColumns(data, columns).map((col) => ({
            ...col,
            renderCell:
              typeof col.render === "function"
                ? (params) => col.render(params.row)
                : undefined,
          }))}
          getRowId={(row) => row.id}
        />
      </div>
    </ThemeProvider>
  );
};

export default CustomTable;
