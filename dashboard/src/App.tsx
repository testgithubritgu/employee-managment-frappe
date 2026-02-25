import AppRoutes from "./AppRoutes"
import AuthContextProvider from "./context/AuthContext"
import { Provider } from 'react-redux'
import { store } from './app-store/store'
import { useEffect, useState } from "react"
import { Progress } from "./components/ui/progress"

const App = () => {
	const [progress, setProgress] = useState<number>(0);

	
	useEffect(() => {
		// Simulate progress
		const timer = setTimeout(() => setProgress(100), 500);
		return () => clearTimeout(timer);
	}, []);
	return (
		<>
			<AuthContextProvider>
				<Provider store={store}>
					<Progress value={progress} className="w-full" />
					<AppRoutes />
				</Provider>
			</AuthContextProvider>
		</>
	)

}

export default App