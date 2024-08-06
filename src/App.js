import logo from "./logo.svg";
import "./App.css";
import Customer from "./components/Customer";
//실질적인 웹사이트 화면에 대한 내용 출력

const customers = [
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
  },
];
function App() {
  return (
    <div>
      {customers.map((c) => {
        return (
          <Customer
          key={c.id} //중복불가 키값
            id={c.id}
            image={c.image}
            name={c.name}
            birthday={c.birthday}
            gender={c.gender}
            job={c.job}
          />
        );
      })}
    </div>
  );
}

export default App;
