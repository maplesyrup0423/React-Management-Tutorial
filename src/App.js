import logo from './logo.svg';
import './App.css';
//실질적인 웹사이트 화면에 대한 내용 출력
function App() {
  return (
    <div className="gray-background">
        <img src={logo} lat="logo"/>
        <h2>메니저 프로그램 시작해보자구!</h2>
    </div>
  );
}

export default App;
