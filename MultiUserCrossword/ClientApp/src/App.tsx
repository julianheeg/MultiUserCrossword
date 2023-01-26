import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import { Home } from './components/Home';
import Crossword from './components/crossword/Crossword';
import './App.css';
import './components/crossword/Crossword.css'

function App(): JSX.Element {
    return (
        <BrowserRouter>
            <div className="App">
                <Layout>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/crossword' element={<Crossword />} />
                    </Routes>
                </Layout>
            </div>
        </BrowserRouter>
    );
}

export default App;

