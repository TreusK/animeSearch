import './App.css';
import {Container, Row, Col} from 'react-bootstrap';
import Header from './components/Header';
import Search from './components/Search';
import CardContainer from './components/CardContainer';

function App() {
   return (
        <Container fluid>
            <Header />
            <Search />
            <CardContainer />
        </Container>
   )
}

export default App
