use super::schema::Schema;
use serde_json::from_reader;
use std::{
    fs::{File, OpenOptions},
    io::{prelude::*, BufReader},
};
#[tauri::command]
pub fn send(title: &str, content: &str) -> Result<String, String> {
    let file_name = String::from("./test.json");
    let json_file = File::open(&file_name);
    if let Ok(file) = json_file {
        let reader: BufReader<File> = BufReader::new(file);
        let json = from_reader::<BufReader<File>, Vec<Schema>>(reader);
        let Ok(mut json_vec) = json else {
            return Err(String::from("ファイルエラー"));
        };
        let ss = std::fs::read_to_string(&file_name);
        let id;
        let Ok(s) = ss else {
            return Err(String::from("ファイルエラー"));
        };
        if s == "[]" {
            id = 0;
        } else {
            id = json_vec.last().unwrap().get_id() + 1;
        }
        let schema = Schema::new(id, title, content);
        json_vec.push(schema);
        let str_data = serde_json::to_string(&json_vec).unwrap();
        let Ok(mut f) = OpenOptions::new()
            .write(true)
            .truncate(true)
            .open(&file_name)
        else {
            return Err(String::from("書き込みエラー"));
        };
        let _ = f.write_all(str_data.as_bytes());
        Ok("Success".to_string())
    } else {
        return Err(String::from("ファイルエラー"));
    }
}
