"use client"
import React from "react";
import { Person, Transaction } from "@/app/api/route";
interface PersonRowProps{
    person:Person;
    onDeletePerson: (id:number)=>void;
    onDeleteTransaction: (Idtransaction: number, Idperson: number) =>void;
}
const PersonRow: React.FC<PersonRowProps>=({person, onDeletePerson, onDeleteTransaction,})=>{
    const handleDeletePerson=()=>{
        if(person.id){
            onDeletePerson(person.id);
        }
    };
    const handleDeleteTransaction = (transaction: Transaction) =>{
        if(transaction.id && person.id){
            onDeleteTransaction(transaction.id, person.id);
        }
    };
    const getTotal = (transactions: Transaction[], isRevenue:boolean) => {
        return transactions
          .filter(t => t.isRevenue === isRevenue)
          .reduce((sum, t) => sum + t.value, 0);
      };
    return(
        <tr>
            <td>{person.name}</td>
            <td>{person.idade}</td>
            <td>{person.transactions && person.transactions.length>0?(
                <>
                    <ul className="list-unstyled">
                        {person.transactions.map((t)=>(
                            <li key={t.id} className="mb-2 d-flex justify-content-between align-items-center">
                                {t.description} - R$ {t.value.toFixed(2)}
                                {t.isRevenue ? "(Entrada)" : "(Despesa)"}
                                <button onClick={()=>handleDeleteTransaction(t)} className="btn btn-sm btn-danger ms-2">
                                    Excluir
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-2 p-2 bg-light border rounded">
                        <strong>Total de Entradas:</strong> R$ {getTotal(person.transactions, true).toFixed(2)}
                            <br />
                        <strong>Total de Saídas:</strong> R$ {getTotal(person.transactions, false).toFixed(2)}
                    </div>
                </>
                
            ): (
                <span>Nenhuma transação cadastrada</span>
            )}</td>
            <td>
                <button onClick={handleDeletePerson} className="btn btn-danger -btn-sm">
                    Excluir pessoa
                </button>
            </td>
        </tr>
    )
}
export default PersonRow;