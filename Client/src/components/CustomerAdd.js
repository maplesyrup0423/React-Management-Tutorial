import React, { useState } from "react";
import axios from "axios";

function CustomerAdd({ stateRefresh }) {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [job, setJob] = useState("");
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // 하나의 파일만
    setFileName(e.target.value);
  };

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "birthday":
        setBirthday(value);
        break;
      case "gender":
        setGender(value);
        break;
      case "job":
        setJob(value);
        break;
      default:
        break;
    }
  };

  const handleFromSubmit = async (e) => {
    e.preventDefault();
    try {
      await addCustomer();
      // 상태를 새로 고침하거나, 필요한 경우 새로 고침을 호출합니다.
      if (stateRefresh) {
        stateRefresh();
      }
      // 상태를 리셋합니다.
      setFile(null);
      setName("");
      setBirthday("");
      setGender("");
      setJob("");
      setFileName("");
    } catch (error) {
      console.error("고객 추가 실패:", error);
    }
  };

  const addCustomer = () => {
    const url = "/api/customers";
    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", name);
    formData.append("birthday", birthday);
    formData.append("gender", gender);
    formData.append("job", job);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    return axios.post(url, formData, config);
  };

  return (
    <form onSubmit={handleFromSubmit}>
      <h1>고객 추가</h1>
      프로필 이미지 :{" "}
      <input
        type="file"
        name="file"
        file={file}
        value={fileName}
        onChange={handleFileChange}
      />
      <br />
      이름 :{" "}
      <input
        type="text"
        name="name"
        value={name}
        onChange={handleValueChange}
      />
      <br />
      생년월일 :{" "}
      <input
        type="text"
        name="birthday"
        value={birthday}
        onChange={handleValueChange}
      />
      <br />
      성별 :{" "}
      <input
        type="text"
        name="gender"
        value={gender}
        onChange={handleValueChange}
      />
      <br />
      직업 :{" "}
      <input type="text" name="job" value={job} onChange={handleValueChange} />
      <br />
      <button type="submit">추가하기</button>
    </form>
  );
}

export default CustomerAdd;
