import ReactDOM from "react-dom/client";
import { App } from "./views/App";
import { SettingsProvider } from "./providers/SettingsContext";
import "./i18n";
import { ClerkProvider } from "@clerk/clerk-react";

const clerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

ReactDOM.createRoot(document.getElementById("root")!).render(
	<>
		{clerkKey ? (
			<ClerkProvider publishableKey={clerkKey}>
				<SettingsProvider>
					<App />
				</SettingsProvider>
			</ClerkProvider>
		) : (
			<h1>Missing clerk api key! The site won't work without it.</h1>
		)}
	</>
);
