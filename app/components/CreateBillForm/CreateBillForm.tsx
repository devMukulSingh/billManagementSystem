import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { createBillSchema } from "~/lib/schema";
import {
  Form,
 
} from "../ui/form";
import DistributorName from "./formFields/DistributorName";
import DateCreated from "./formFields/Date";
import IsPaid from "./formFields/IsPaid";
import { Separator } from "../ui/separator";
import ItemName from "./formFields/ItemName";
import ItemRate from "./formFields/ItemRate";
import ItemQuantity from "./formFields/ItemQuantity";
import ItemAmount from "./formFields/ItemAmount";
import { Button } from "../ui/button";
import { PlusCircle, X } from "lucide-react";
import { ITEM_INITIAL_VALUES } from "~/lib/constants";

type Props = {};

type TFormValues = z.infer<typeof createBillSchema>;

export type TForm = {
  form: UseFormReturn<TFormValues, any, undefined>;
  index: number;
};

export default function CreateBillForm({}: Props) {
  const form = useForm<TFormValues>({
    resolver: zodResolver(createBillSchema),
    defaultValues: {
      isPaid: false,
      date: new Date(),
      distributorName: "",
      items: [ITEM_INITIAL_VALUES],
    },
  });
  const fieldArray = useFieldArray({
    name: "items",
    control: form.control,
  });
  const watchFieldsArray = form.watch("items");

  const controlledFields = fieldArray.fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldsArray[index],
    };
  });
  function onSubmit(data: TFormValues) {
    form.reset({
      date: new Date(),
      distributorName: "",
      isPaid: false,
      items: [ITEM_INITIAL_VALUES],
    });
    console.log(data);
    // save to db
  }
  function handleAddItem() {
    fieldArray.append(ITEM_INITIAL_VALUES);
  }
  function handleRemoveItem(index: number) {
    fieldArray.remove(index);
  }
  return (
    <>
      <form className="" onSubmit={form.handleSubmit(onSubmit)}>
        <div className=" flex max-h-[85vh]  border-black  flex-col gap-5 px-5 pb-20 overflow-auto">
          <Form {...form}>
            <div
              className="
        md:w-2/3 
        w-full 
        grid 
        border-2 
        lg:grid-cols-3 
        md:grid-cols-2 
        grid-cols-1 
        gap-x-2 
        gap-y-5
        border-white
        p-5
        "
            >
              <DistributorName form={form} />
              <DateCreated form={form} />
              <IsPaid form={form} />
            </div>
            <div
              className="
      border-white
        flex
        border-2 
        flex-col
        gap-3
        p-5
        md:w-2/3 
        "
            >
              <h1 className="text-2xl">Items</h1>
              <Separator className="bg-slate-300" />

              {controlledFields.map((field, index) => (
                <div
                  key={index}
                  className=" 
            flex
            gap-x-1
            gap-y-5
        "
                >
                  <ItemName form={form} index={index} />
                  <ItemRate form={form} index={index} />
                  <ItemQuantity form={form} index={index} />
                  <ItemAmount form={form} index={index} />
                  <Button
                    variant={"destructive"}
                    className="rounded-full size-9 self-end ml-auto"
                    disabled={controlledFields.length === 1}
                    size={"icon"}
                    onClick={() => handleRemoveItem(index)}
                  >
                    <X />
                  </Button>
                </div>
              ))}
              <Button
                onClick={handleAddItem}
                type="button"
                className="items-center w-fit  "
              >
                <PlusCircle />
                Add new Item
              </Button>
            </div>
          </Form>
        </div>
        <footer className="absolute  bottom-0 bg-slate-100 px-5 py-3 w-[calc(100vw-15rem)]">
          <Button type="submit">Submit</Button>
        </footer>
      </form>
    </>
  );
}
