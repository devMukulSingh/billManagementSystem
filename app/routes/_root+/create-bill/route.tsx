import { Plus, PlusCircle } from "lucide-react";
import CreateBillForm from "~/components/createBillForm/CreateBillForm";
import { Separator } from "~/components/ui/separator";

type Props = {};

export default function CreateBill({}: Props) {
  return (
    <div
      className="
    h-screen 
    w-[calc(100vw-15rem)] 
    bg-slate-200
    flex
    flex-col
    relative

    "
    >
      <header className="flex flex-col sticky top-0 bg-inherit z-50 gap-2 p-5">
        <h1 className="text-2xl gap-2 sm:text-3xl font-medium flex items-center
        "><PlusCircle/> Create Bill</h1>
        <Separator className="w-full  bg-slate-300" />
      </header>
      <CreateBillForm/>
    </div>
  );
}
