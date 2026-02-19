import { useDispatch, useSelector } from "react-redux"
import { Button } from "../../components/ui/button"
import type { RootState } from "../../app-store/store"
import { increament } from "../../app-store/slice/counterSlice"
import Test from "./components/testing"


const Home = () => {
  // const {mutate} = useAddNote()

  // const addNote = ()=>{
  //   mutate({
  //     title:"this is content from home page",
  //     details:"this is content boss"
  //   },
  // {
  //   onSuccess:()=>{
  //     console.log('bhai success ho gaya')
  //   }
  // })
  // }
  const count = useSelector((state:RootState)=> state.counter.value)
  const dispatch = useDispatch()
  return (
    <div>
      this is home bhai
      <Button >
        add notes bhai
      </Button>
      <div>
        <p>{count}</p>
        <Button onClick={() => dispatch(increament())}>
          increament count
        </Button>
        <Test/>
      </div>
    </div>
  )
}

export default Home