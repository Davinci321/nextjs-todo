import Link from "next/link";
import { prisma } from "./db";
import {TodoItem} from "../components/TodoItem"

function getTodos(){
  return prisma.todo.findMany();
}


export default async function Home() {
 const todos = await getTodos();
//  await prisma.todo.create({data: {title: "test", complete: false}}); just to ensure it works properly

async function toggleTodo(id: string, complete: boolean){
  "use server"
  await prisma.todo.update({
    where: {id: id},
    data: {complete: complete}
  });
}

  return (
    <>
      <header className="flex justify-between items-center mb-4">
      <h1 className="text-2xl">Todos</h1>
      <Link href="/new" className="border border-slate-300  text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none">New</Link>
    </header>
    <ul className="pl-4">
      {todos.map(todo =>
       <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo}/>
         )}
    </ul>
    </>
  )
}