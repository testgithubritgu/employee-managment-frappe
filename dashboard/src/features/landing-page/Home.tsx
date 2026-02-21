import { useDispatch, useSelector } from "react-redux"
import { Button } from "../../components/ui/button"
import type { RootState } from "../../app-store/store"
import { increament } from "../../app-store/slice/counterSlice"
import Test from "./components/testing"
import DatePicker from "react-datepicker";
import { collection, addDoc } from "firebase/firestore";
import { useEffect, useState } from "react"
import { db } from "../../services/firebase.js"
import "react-datepicker/dist/react-datepicker.css";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../services/firebase"
import useDebounce from "../../hooks/useDebounce.js"
import { Input } from "../../components/ui/input.js"



export const uploadImage = async (file: File) => {

  if (!file) return;

  // storage path
  const imageRef = ref(storage, `images/${Date.now()}-${file.name}`);

  // upload
  const snapshot = await uploadBytes(imageRef, file);

  // get public URL
  const downloadURL = await getDownloadURL(snapshot.ref);

  return downloadURL;
};

// this is first stash 
// this is second stash 

// this is after stash 

const Home = () => {
  //to check time for completion of this function
  console.time("parent")
  const [startDate, setStartDate] = useState(new Date());
  const count = useSelector((state: RootState) => state.counter.value)
  const today = new Date()
  const yesterday = new Date()
  yesterday.setDate(today.getDate() - 10)
  console.log(startDate)
  const dispatch = useDispatch()
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string | undefined>("");
  const [value,setValue] = useState<number>(0)
  const valueDebounce = useDebounce(value,1000)
  console.log(value)
  const handleUpload = async () => {
    if (!file) return alert("Select image first");

    const imageUrl = await uploadImage(file);
    setUrl(imageUrl);
  };
  console.timeLog("parnet")
  const addUserData = async () => {
    
    try {
      const docRef = await addDoc(collection(db, "users"), {
        name: "John Doe",
        email: "john@example.com",
        createdAt: startDate
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", (key) => {
      if (key.key === "Enter") {
        console.log("this is enter")
      }
    })
    addUserData().then((res) => console.log("this is added docs in firbase", res))
  }, [])
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
        <DatePicker minDate={yesterday} maxDate={today} dateFormat={"dd/MM/yyyy"} selected={startDate} onChange={(date: any) => setStartDate(date)} />
      </h1>

      <h2>Upload Image</h2>
      <br />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <button onClick={handleUpload}>Upload</button>

      {url && (
        <div>
          <p>Uploaded Image:</p>
          <img src={url} alt="uploaded" width={200} />
        </div>
      )}
      <br />
      <br />
      <br />
      <br />
      <br />
      <Input onChange={(e) => setValue(Number(e.target.value) )} type="number" />
      <h1>this is without debounce: {value}</h1>
      <h1>this is debounced number : {valueDebounce}</h1>
    </div>

  )
}

export default Home