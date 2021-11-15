import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Update from "./pages/Update";

function App() {
	return (
		<div className='App container'>
			<Router>
				<Routes>
					<Route exact path='/' element={<Home />}></Route>
					<Route path='/restaurant/:id' element={<Detail />}></Route>
					<Route path='/restaurant/update/:id' element={<Update />}></Route>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
