import logo from "./logo.svg";
import "./App.css";
import Customer from "./components/Customer";
import {
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { styled } from "@mui/system";

// Styled 컴포넌트 정의
const StyledPaper = styled(Paper)({
  width: "100%",
  marginTop: "24px",
  overflow: "auto",
});

const StyledTable = styled(Table)({
  minWidth: 1080,
});

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
    <StyledPaper>
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell>번호</TableCell>
            <TableCell>이미지</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>생년월일</TableCell>
            <TableCell>성별</TableCell>
            <TableCell>직업</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
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
        </TableBody>
      </StyledTable>
    </StyledPaper>
  );
}

export default App;
