import React, {useEffect, useState} from "react";
import { Person, Transaction, addPerson, addTransaction, getPeople } from "@/app/api/route";
import { useNavigate } from "react-router-dom";

function AddTransactionPage(){
    const [people, setPeople] = useState<Person[]>([]);
    const [IdPerson, setIdPerson] = useState("");
    const [description, setDescription] = useState("");
    const [value, setValue] = useState("");
    const [isRevenue, setIsRevenue] = useState(true);
    const navigate = useNavigate();
    useEffect(()=>{
        fetchPeople();
    }, []);
    const fetchPeople = async ()=>{
        try{
            const data = await getPeople();
            setPeople(data)
        }
        catch(err){
            alert("Recarregue a página");
        }
    };
    const handleSubmit = async (e: React.FormEvent)=>{
        e.preventDefault();
        try{
            const transaction: Transaction = {
                description, value: parseFloat(value), isRevenue, idPerson: parseInt(IdPerson),
            };
            await addTransaction(transaction);
            alert("Transação adicionada com sucesso!");
            navigate("/");
        } 
        catch (error: any) {

            alert(error.message);
        }
    };
    return(
        <div className="mt-4" style={{ maxWidth: "80%", margin: "0 auto" }}>
            <h2>Adicionar Transação</h2>
            <form onSubmit={handleSubmit} className="mt-3">
                
                <div className="mb-3">
                <label className="form-label">Pessoa</label>
                <select
                    className="form-select"
                    value={IdPerson}
                    onChange={(e) => setIdPerson(e.target.value)}
                    required
                >
                    <option value="">Selecione a pessoa</option>
                    {people.map((p) => (
                    <option key={p.id} value={p.id}>
                        {p.name}
                    </option>
                    ))}
                </select>
                </div>

                <div className="mb-3">
                <label className="form-label">Descrição</label>
                <input
                    type="text"
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                </div>
                <div className="mb-3">
                <label className="form-label">Valor</label>
                <input
                    type="number"
                    step="0.01"
                    className="form-control"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    required
                />
                </div>
                <div className="mb-3">
                <label className="form-label">Tipo</label>
                <div className="form-check">
                    <input
                    className="form-check-input"
                    type="radio"
                    name="isRevenue"
                    id="entrada"
                    value="true"
                    checked={isRevenue === true}
                    onChange={() => setIsRevenue(true)}
                    />
                    <label className="form-check-label" htmlFor="entrada">
                    Entrada
                    </label>
                </div>
                <div className="form-check">
                    <input
                    className="form-check-input"
                    type="radio"
                    name="isRevenue"
                    id="saida"
                    value="false"
                    checked={isRevenue === false}
                    onChange={() => setIsRevenue(false)}
                    />
                    <label className="form-check-label" htmlFor="saida">
                    Saída
                    </label>
                </div>
                </div>

                <button type="submit" className="btn btn-primary">
                Salvar
                </button>
            </form>

        </div>
    )
}

export default AddTransactionPage;