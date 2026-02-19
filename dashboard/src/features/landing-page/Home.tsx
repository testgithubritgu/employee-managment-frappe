import { useDispatch, useSelector } from "react-redux"
import { Button } from "../../components/ui/button"
import type { RootState } from "../../app-store/store"
import { increament } from "../../app-store/slice/counterSlice"
import Test from "./components/testing"
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react"

const Home = () => {

  const [startDate, setStartDate] = useState(new Date());
  const count = useSelector((state: RootState) => state.counter.value)
  const today = new Date()
  const yesterday = new Date()
  yesterday.setDate(today.getDate() - 10)
  console.log(startDate)
  const dispatch = useDispatch()
  return (
    <div>
      this is home bhai
      <Button >
        add notes bhai
      </Button>
      <div>
        <p>{count}</p>
        <Button className="cursor-pointer" onClick={() => dispatch(increament())}>
          increament count
        </Button>
        <Test />
      </div>
      <h1>react date picker
        <DatePicker  minDate={yesterday} maxDate={today} dateFormat={"dd/MM/yyyy"} selected={startDate} onChange={(date: any) => setStartDate(date)} />
      </h1>
    </div>
  )
}

export default Home