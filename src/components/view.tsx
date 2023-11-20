import { useEffect, useState } from "react";
import json from "../../src-tauri/test.json";
import { JsonFile } from "@/interface/json";
import { writeTextFile } from "@tauri-apps/api/fs";
import { filePath } from "@/filepath";
import { Box, Button, Grid, Paper } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { invoke } from "@tauri-apps/api/tauri";

export function View() {

  const [file, setFile] = useState<any>([]);

  useEffect(() => {
    if (json == undefined) {
      return;
    }
    const fn = async () => {
      const a = [...json];
      a.sort((a: JsonFile, b: JsonFile) => {
        return b.id - a.id;
      });
      setFile(a);
    };
    fn();
  }, []);

  const del = (date:String,time:String) => {
    invoke("delete",{"date":date,"time":time})
    .then(console.log)
    .catch(console.log)
  }

  return (
    <Grid sx={{ flexGrow: 1 }} container spacing={8}>
      <Grid item xs={12} margin={5}>
        <Grid container justifyContent="center">
          {file != null
            ? file.map((value: JsonFile) => (
                <Grid key={value.id} item margin={1}>
                  <Paper
                    sx={{
                      height: 300,
                      maxHeight: 500,
                      width: 300,
                      textAlign: "center",
                      backgroundColor: (theme) =>
                        theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                    }}
                  >
                    {value.title}
                    <Grid
                      item
                      xs={12}
                      textAlign={"left"}
                      marginLeft={2}
                      sx={{
                        overflowWrap: "break-word",
                        overflow: "hidden",
                        width: "91%",
                        height: "80%",
                      }}
                    >
                      {value.content}
                    </Grid>
                    <Grid sx={{textAlign: "right"}}>
                      <Button onClick={() => {
                        del(value.date,value.time)
                      }} >
                      <DeleteIcon ></DeleteIcon>
                      </Button>
                    </Grid>
                  </Paper>
                </Grid>
              ))
            : "表示できません。"}
        </Grid>
      </Grid>
    </Grid>
  );
}
