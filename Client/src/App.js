
import React, { useState, useEffect } from "react";
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


function App() {

  /*state ={
    customers:""
  }

  ComponentDidMount(){
    this.callApi()
    .then(res => this.setState({customers:res}))
    .catch(err => console.log(err));
  }
  callApi = async () =>{
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }*/
    const [customers, setCustomers] = useState("");

    useEffect(() => {
      const callApi = async () => {
        const response = await fetch("/api/customers");
        const body = await response.json();
        return body;
      };
  
      callApi()
        .then((res) => setCustomers(res))
        .catch((err) => console.log(err));
    }, []);

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
            {customers
              ? customers.map((c) => (
                  <Customer
                    key={c.id} // map 을 사용하려면 key 라는 속성이 있어야 함(안하면 Console창에 에러가 발생)
                    id={c.id}
                    image={c.image}
                    name={c.name}
                    birthday={c.birthday}
                    gender={c.gender}
                    job={c.job}
                  />
                ))
              : ""}
          </TableBody>
        </StyledTable>
      </StyledPaper>
    );
  }
  
  export default App;