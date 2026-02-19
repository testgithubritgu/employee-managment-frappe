import AppRoutes from "./AppRoutes"
import AuthContextProvider from "./context/AuthContext"
import { Provider } from 'react-redux'
import { store } from './app-store/store'
const App = () => {

	return (
		<>
			<AuthContextProvider>
				<Provider store={store}>

					<AppRoutes />
				</Provider>
			</AuthContextProvider>
		</>
	)

}

export default App