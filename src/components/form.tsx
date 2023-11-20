import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export function From() {
  const [content, setContent] = useState<String>("");
  const [title, setTitle] = useState<String>("");
  const send = () => {
    invoke<String>("send", { title: title, content: content })
      .then(console.log)
      .catch(window.alert);
  };

  return (
    <>
    <div style={{justifyContent:"center",alignItems:"center",display:"flex"}}>
      <Box
        component="form"
        noValidate
        autoComplete="off"
      >
        <TextField
          id="タイトル"
          label="タイトル"
          multiline
          sx={{width:"100%", justifyContent:"center"}}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <TextField
          id="内容"
          label="内容"
          multiline
          sx={{width:"120%",justifyContent:"center"}}
          rows={4}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
        <Button
          variant="contained"
          onClick={(e) => {
            e.preventDefault()
            if (title == "" || content == "") {
              alert("何も入力されていません。");
            } else {
            send();
            }
          }}
        >送信</Button>
      </Box>
      </div>
    </>
  );
}
