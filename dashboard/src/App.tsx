import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { FrappeProvider } from 'frappe-react-sdk'
import { getDoc, getDocList } from './utils/FrappeAPI'
function App() {
	const [count, setCount] = useState(0)
	useEffect(() => {
		const fetchData = async () => {
			const listRes = await getDocList<{ data?: { name: string }[] }>("Quick Note", ["name"], 1)
			const firstName = listRes?.data?.[0]?.name
			if (!firstName) {
				console.warn("No Quick Note records found")
				return
			}
			const res = await getDoc("Quick Note", firstName)
			console.log("Quick Note doc:", res)
		}
		fetchData().catch(console.error)
	}, [])


	return (
		<div className="App">
			<FrappeProvider>
				<div>
					<div>
						<a href="https://vitejs.dev" target="_blank">
							<img src="/vite.svg" className="logo" alt="Vite logo" />
						</a>
						<a href="https://reactjs.org" target="_blank">
							<img src={reactLogo} className="logo react" alt="React logo" />
						</a>
					</div>
					<h1>Vite + React + Frappe</h1>
					<div className="card">
						<button onClick={() => setCount((count) => count + 1)}>
							count is {count}
						</button>
						<p>
							Edit <code>src/App.jsx</code> and save to test HMR
						</p>
					</div>
					<p className="read-the-docs">
						Click on the Vite and React logos to learn more
					</p>
				</div>
			</FrappeProvider>
		</div>
	)
}

export default App
