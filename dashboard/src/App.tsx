import AppRoutes from "./AppRoutes"
import AuthContextProvider from "./context/AuthContext"

const App = () => {

	return (
		<>
			<AuthContextProvider>

			<AppRoutes />
			</AuthContextProvider>
		</>
	)

}

export default App