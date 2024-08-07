import React from "react";
import axios from "axios";

class CustomerAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      File: null, //바이트 형태의 데이터
      name: "",
      birthday: "",
      gender: "",
      job: "",
      fileName: "", //파일이름
    };
  }
  handleFromSubmit = (e) => {
    e.preventDefault();
    this.addCustomer().then((response) => {
      console.log(response.data);
    });
    this.setState({
      File: null,
      name: "",
      birthday: "",
      gender: "",
      job: "",
      fileName: "",
    });
   window.location.reload();
  };

  handleFileChange = (e) => {
    this.setState({
      file: e.target.files[0], //하나의 파일만
      fileName: e.target.value,
    });
  };

  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  };

  addCustomer = () => {
    const url = '/api/customers';
    const formData = new FormData();
    formData.append("image", this.state.file);
    formData.append("name", this.state.name);
    formData.append("birthday", this.state.birthday);
    formData.append("gender", this.state.gender);
    formData.append("job", this.state.job);
    const config = {
      Headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    return axios.post(url, formData, config);
  };

  render() {
    return (
      <form onSubmit={this.handleFromSubmit}>
        <h1>고객추가</h1>
        프로필 이미지 :{" "}
        <input
          type="file"
          name="file"
          file={this.state.file}
          value={this.state.fileName}
          onChange={this.handleFileChange}
        />
        <br />
        이름 :{" "}
        <input
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.handleValueChange}
        />
        <br />
        생년월일 :{" "}
        <input
          type="text"
          name="birthday"
          value={this.state.birthday}
          onChange={this.handleValueChange}
        />
        <br />
        성별 :{" "}
        <input
          type="text"
          name="gender"
          value={this.state.gender}
          onChange={this.handleValueChange}
        />
        <br />
        직업 :{" "}
        <input
          type="text"
          name="job"
          value={this.state.job}
          onChange={this.handleValueChange}
        />
        <br />
        <button type="submit">추가하기</button>
      </form>
    );
  }
}

export default CustomerAdd;
