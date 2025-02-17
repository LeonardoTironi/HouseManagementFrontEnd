import React, { useState } from "react";
import { addPerson } from "@/app/api/route";
import { useNavigate } from "react-router-dom";

function AddPersonPage(){
    const [name, setName] = useState("");
    const [idade, setIdade] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async(e: React.FormEvent)=>{
        e.preventDefault();
        try{
            const response = await addPerson({name, idade: parseInt(idade)});
            alert("Pessoa adicionada!");
            navigate("/");
        }
        catch(err){
            alert("Erro ao adicionar pessoa.");
        }
    };
    return(
        <div className="mt-4" style={{ maxWidth: "80%", margin: "0 auto" }}>
            <h2>Adicionar Pessoa</h2>
            <form onSubmit={handleSubmit} className="mt-3">
                <div className="mt-3">
                    <label className="form-label">Nome</label>
                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required/>
                </div>
                <div className="mt-3">
                    <label className="form-label">Idade</label>
                    <input type="number" className="form-control" value={idade} onChange={(e) => setIdade(e.target.value)} required/>
                </div>
                <button type="submit" className="btn btn-primary" style={{marginTop:"10px"}}>Adicionar</button>
            </form>

        </div>
    )
}
export default AddPersonPage