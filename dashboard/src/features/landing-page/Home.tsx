import { Button } from "../../components/ui/button"
import { useAddNote } from "../../hooks/useAddNote"


const Home = () => {
  const {mutate} = useAddNote()
  const addNote = ()=>{
    mutate({
      title:"this is content from home page",
      details:"this is content boss"
    },
  {
    onSuccess:()=>{
      console.log('bhai success ho gaya')
    }
  })
  }
  return (
    <div>
      this is home bhai
      <Button onClick={()=>addNote()}>
        add notes bhai
      </Button>
    </div>
  )
}

export default Home