use std::{fs::{File, OpenOptions}, io::{BufReader, Write}};
use serde_json::from_reader;
use super::schema::Schema;

#[tauri::command]
pub fn delete (date:&str,time:&str) -> Result<String,String> {
    let file_name = String::from("./test.json");
    let json_file = File::open(&file_name);
    if let Ok(file) = json_file {
        let reader: BufReader<File> = BufReader::new(file);
        let json = from_reader::<BufReader<File>, Vec<Schema>>(reader);
        let Ok(json_vec) = json else {
            return Err(String::from("ファイルエラー"));
        };
        let mut new_vec:Vec<Schema> = vec![];
        for i in json_vec{
            if time == i.get_time() && date == i.get_date(){
                continue;
            }
            new_vec.push(i)
        }
        let str_data = serde_json::to_string(&new_vec).unwrap();
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