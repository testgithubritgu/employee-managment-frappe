import { useDispatch, useSelector } from "react-redux"
import { Button } from "../../components/ui/button"
import type { AppDispatch, RootState } from "../../app-store/store"
import { increament } from "../../app-store/slice/counterSlice"
import Test from "./components/testing"
import DatePicker from "react-datepicker";
import { useState } from "react"
import "react-datepicker/dist/react-datepicker.css";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../services/firebase"
import useDebounce from "../../hooks/useDebounce.js"
import { Input } from "../../components/ui/input.js"

export const uploadImage = async (file: File) => {
  if (!file) throw new Error("No file");

  if (!file.type.startsWith("image/")) {
    throw new Error("Only images allowed");
  }

  if (file.size > 2 * 1024 * 1024) {
    throw new Error("Max 2MB allowed");
  }

  const imageRef = ref(storage, `images/${crypto.randomUUID()}-${file.name}`);
  const snapshot = await uploadBytes(imageRef, file);

  return getDownloadURL(snapshot.ref);
};

const Home = () => {
  //to check time for completion of this function

  const [startDate, setStartDate] = useState(new Date());
  const count = useSelector((state: RootState) => state.counter.value)
  const today = new Date();

  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 10);
 
  const dispatch = useDispatch < AppDispatch>()
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string | undefined>("");
  const [value,setValue] = useState<number>(0)
  const valueDebounce = useDebounce(value,1000)


  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Select image first");

    try {
      setUploading(true);
      const imageUrl = await uploadImage(file);
      setUrl(imageUrl);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mx-auto w-full ">
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
        <DatePicker minDate={yesterday} maxDate={today} dateFormat={"dd/MM/yyyy"} selected={startDate} onChange={(date: Date | null) => {
          if (date) setStartDate(date);
        }} />
      </h1>

      <h2>Upload Image</h2>
      <br />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <button disabled={uploading} onClick={handleUpload}>
        {uploading ? "Uploading..." : "Upload"}
      </button>

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


// this is stash from home page 11
