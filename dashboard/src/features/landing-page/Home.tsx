import { useAuthContext } from '../../context/AuthContext'

const Home = () => {
     const {auth} = useAuthContext()
     console.log(auth ,"this is auth")
  return (
    <div>
      this is home bhai
    </div>
  )
}

export default Home
