"use client"
import { Link } from "react-router-dom";
import React, {useEffect, useState} from "react";
import { getPeople, Person, deletePerson, deleteTransation } from "@/app/api/route";
import PersonRow from "./PersonRow";

const PeopleList: React.FC = () =>{
    const [People, setPeople] = useState<Person[]>([]);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState("");
    
    const fetchPeople = async ()=>{
        try{
            const data = await getPeople();
            setPeople(data);
        }
        catch(err){
            setError("Erro ao buscar pessoas");
        }
        finally{
            setLoading(false);
        }
    };
    
    useEffect(() =>{
        fetchPeople();
    }, []);
    
    const handleDeletePerson = async(id:number)=>{
        if(!window.confirm("Quer deletear essa pessoa?")) return;
        try{
            await deletePerson(id);
            setPeople((prev)=>prev.filter((p) => p.id !== id));
        }
        catch(err){
            alert("Erro ao excluir pessoa");
        }
        
    };
    
    const handleDeleteTransaction = async(IdTransaction:number, IdPerson: number)=>{
        if(!window.confirm("Tem certeza que deseja excluir essa transação?")) return;
        try{
            await deleteTransation(IdTransaction);
            setPeople((prevPeople) =>
                prevPeople.map((person)=>
                    person.id===IdPerson
                        ?{
                            ...person,
                            transactions:person.transactions?.filter(
                                (t) => t.id !== IdTransaction
                            ),
                        } 
                        : person
                )
            );
        }
        catch (err){
            alert("Erro ao excluir transação");
        }
    };
    
    const totalRevenue = People
        .flatMap((person) => person.transactions || [])
        .filter((transaction) => transaction.isRevenue)
        .reduce((acc, transaction) => acc + transaction.value, 0);
    
    const totalExpense = People
        .flatMap((person) => person.transactions || [])
        .filter((transaction) => !transaction.isRevenue)
        .reduce((acc, transaction) => acc + transaction.value, 0);
    
    if (loading) return <p>Carregando</p>;
    if (error) return <p>{error}</p>;
    
    return(
        <div className="mt-4" style={{ maxWidth: "80%", margin: "0 auto" }}>
            <h2 className="text-center">Lista de Pessoas</h2>
            <div className="d-flex justify-content-center my-3">
                <Link to="/add-person" className="btn btn-primary me-3">
                Adicionar Pessoa
                </Link>
                <Link to="/add-transaction" className="btn btn-primary">
                Adicionar Transação
                </Link> 
            </div>
            <table className="table table-striped table-bordered align-middle w-70 ">
                <thead className="thead-dark">
                    <tr>
                        <th>Nome</th>
                        <th>Idade</th>
                        <th>Transações</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {People.map((person)=>(
                        <PersonRow
                            key={person.id}
                            person={person}
                            onDeletePerson={handleDeletePerson}
                            onDeleteTransaction={handleDeleteTransaction}
                        />
                    ))}
                </tbody>
            </table>
            <div style={{ marginTop: "10px" }}>
                <p><strong>Total de Renda:</strong> R$ {totalRevenue}</p>
                <p><strong>Total de Gasto:</strong> R$ {totalExpense}</p>
            </div>
        </div>
    );
};
export default PeopleList;