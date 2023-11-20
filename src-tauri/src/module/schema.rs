use chrono::Local;
use serde::{Serialize, Deserialize};
#[derive(Serialize, Deserialize)]
#[derive(Debug)]
pub struct Schema {
    id:u32,
    title:String,
    date:String,
    time:String,
    content:String,
}

impl Schema {
    pub fn new (id:u32,title:&str, content:&str) -> Self {
        let dt = Local::now();
        let date = dt.format("%Y年%m月%d日");
        let time = dt.format("%H:%M:%S");
        Self { id: id, title: title.to_string(), date: date.to_string(), time: time.to_string(), content: content.to_string() }
    }

    pub fn get_id (&self) -> &u32 {
        return &self.id;
    }
    pub fn get_time(&self) -> &str {
        return &self.time;
    }
    pub fn get_date(&self) -> &str {
        return &self.date;
    }
}