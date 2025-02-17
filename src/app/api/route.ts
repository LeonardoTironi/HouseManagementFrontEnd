const BASE_URL = "https://localhost:7229/api";

export interface Transaction{
    id?: number;
    description: string;
    value: number;
    isRevenue: boolean;
    idPerson: number;
}

export interface Person{
    id?: number;
    name: string;
    idade: number;
    transactions?: Transaction[];
}

export async function getPeople(): Promise<Person[]>{
    const response = await fetch(`${BASE_URL}/Person`);
    return response.json();
}

export async function addPerson(person: Person): Promise<void>{
    const response = await fetch(`${BASE_URL}/Person`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(person),});
        return;
}
export async function deletePerson(id:number):Promise<void>{
    const response = await fetch(`${BASE_URL}/Person/${id}`,{
        method:"DELETE",
    });
}
export async function addTransaction(transaction: Transaction): Promise<void>{
    const response = await fetch(`${BASE_URL}/Transaction`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transaction),
      });
      if(response.status==204){
          return;
        }else if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Erro ao adicionar transação");
      }
}
export async function deleteTransation(id: number): Promise<void>{
    const response = await fetch(`${BASE_URL}/Transaction/${id}`,{
        method: "DELETE",
    });
    return;
}