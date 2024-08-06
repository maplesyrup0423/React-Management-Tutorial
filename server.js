const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/api/customers", (req, res) => {
  res.send([
    {
      id: 1,
      image: "https://i.pravatar.cc/64?img=1",
      name: "임예진",
      birthday: "000423",
      gender: "여자",
      job: "서포터",
    },
    {
      id: 2,
      image: "https://i.pravatar.cc/64?img=2",
      name: "맹일진",
      birthday: "990525",
      gender: "남자",
      job: "정글",
    },
    {
      id: 3,
      image: "https://i.pravatar.cc/64?img=3",
      name: "최유한",
      birthday: "978008",
      gender: "남자",
      job: "원딜",
    }
  ]);
});

app.listen(port, () => console.log(`서버 동작중 ${port}`));

//http://localhost:5000/api/customers
