import ReactDOM from "react-dom/client";
import App from "./views/App";
import "./globalStyles.scss";
import { SettingsProvider } from "./providers/SettingsContext";
import { AuthProvider } from "./providers/AuthContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<AuthProvider>
		<SettingsProvider>
			<App />
		</SettingsProvider>
	</AuthProvider>
);
