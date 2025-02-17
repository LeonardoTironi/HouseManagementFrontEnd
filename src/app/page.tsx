"use client"
import "bootstrap/dist/css/bootstrap.min.css";
import PeopleList from "@/components/ListPeople";
import AddPersonPage from "@/components/AddPersonPage";
import AddTransactionPage from "@/components/AddTransactionPage";
import { Route, Routes, BrowserRouter} from "react-router-dom";
export default function Home() {
  return (
    <BrowserRouter>
      <div className="container mt-4">
        <h1>House Management</h1>
      </div>
        <Routes>
          <Route path="/" element={<PeopleList/>}/>
          <Route path="/add-person" element={<AddPersonPage/>}/>
          <Route path="/add-transaction" element={<AddTransactionPage/>}/>

        </Routes>
    </BrowserRouter>
  );
}
