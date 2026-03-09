import AppRoutes from "./AppRoutes"
import AuthContextProvider from "./context/AuthContext"
import { Provider } from 'react-redux'
import { store } from './app-store/store'
import "nprogress/nprogress.css";
import ProgressBar from "./components/ProgressBar";

const App = () => {
	
	return (
		<>
			<AuthContextProvider>
				<Provider store={store}>
					<ProgressBar />
				{/* <AppSidebar /> */}															
					<AppRoutes />
				</Provider>
			</AuthContextProvider>
		</>
	)

}

export default App