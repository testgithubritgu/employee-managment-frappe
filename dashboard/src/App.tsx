import AppRoutes from "./AppRoutes"
import AuthContextProvider from "./context/AuthContext"
import { Provider } from 'react-redux'
import { store } from './app-store/store'
import { useEffect, useState } from "react"
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar"
import AppLayout from "./components/app-layout/AppLayout"

const App = () => {
	const [progress, setProgress] = useState<number>(0);

	useEffect(() => {
		// Simulate progress
		const timer = setTimeout(() => setProgress(100), 500);
		return () => clearTimeout(timer);
	}, []);
	return (
		<>
			<SidebarProvider>
			<AuthContextProvider>
				<Provider store={store}>
				{/* <AppSidebar /> */}									
					<AppLayout>
						<SidebarTrigger />
					<AppRoutes />
					</AppLayout>
				</Provider>
			</AuthContextProvider>
			</SidebarProvider>
		</>
	)

}

export default App