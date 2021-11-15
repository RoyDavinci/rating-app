import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { RestaurantProvider } from "./context/context";

ReactDOM.render(
	<RestaurantProvider>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</RestaurantProvider>,
	document.getElementById("root")
);
