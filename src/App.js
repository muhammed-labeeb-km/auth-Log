import './App.css';
import { Row,Col } from 'react-bootstrap'
import Login from './Login/Login.js'
function App() {
  return (
    <div className="App">
    <Row>
    <Col  md={8} lg={8} >
    <img src="https://i.postimg.cc/kMKGpw8m/gifyy.gif" alt=""  className='imageIs img-fluid' />
    </Col>
    <Col md={4} lg={4} >
    <Login></Login>
    </Col>
    </Row>
     
    </div>
  );
}

export default App;
