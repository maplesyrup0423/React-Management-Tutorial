import React, { useState, useEffect } from "react";
import "./App.css";
import Customer from "./components/Customer";
import CustomerAdd from "./components/CustomerAdd";
import {
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  CircularProgress,
} from "@mui/material";
import { styled, useTheme } from "@mui/system";

// Styled 컴포넌트 정의
const StyledPaper = styled(Paper)({
  width: "100%",
  marginTop: "24px",
  overflow: "auto",
});

const StyledTable = styled(Table)({
  minWidth: 1080,
});

const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
  margin: theme.spacing(2),
}));
//실질적인 웹사이트 화면에 대한 내용 출력

function App() {
  const [customers, setCustomers] = useState([]);
  const [completed, setCompleted] = useState(0);
  const theme = useTheme();



  useEffect(() => {
    const callApi = async () => {
      const response = await fetch("/api/customers");
      const body = await response.json();
      return body;
    };

    callApi()
      .then((res) => setCustomers(res))
      .catch((err) => console.log(err));

    const progress = () => {
      setCompleted((prevCompleted) =>
        prevCompleted >= 100 ? 0 : prevCompleted + 1
      );
    };

    const timer = setInterval(progress, 20);
    return () => {
      clearInterval(timer);
    };
  }, []);
  const stateRefresh = () => {
    setCustomers("");
    setCompleted(0);
    const callApi = async () => {
      const response = await fetch("/api/customers");
      const body = await response.json();
      return body;
    };

    callApi()
      .then((res) => setCustomers(res))
      .catch((err) => console.log(err));
   
  };
  return (
    <div>
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
            {customers ? (
              customers.map((c) => (
                <Customer
                  key={c.id} // map 을 사용하려면 key 라는 속성이 있어야 함(안하면 Console창에 에러가 발생)
                  /*id={c.id}
                  image={c.image}
                  name={c.name}
                  birthday={c.birthday}
                  gender={c.gender}
                  job={c.job}*/
                  {...c}
                />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="6" align="center">
                  <StyledCircularProgress variant="indeterminate" />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </StyledTable>
      </StyledPaper>
      <CustomerAdd stateRefresh={stateRefresh}/>
     
    </div>
  );
}

export default App;
