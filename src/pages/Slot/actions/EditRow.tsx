import { MouseEvent, useRef, useState, useEffect } from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SubmitHandler, useForm } from "react-hook-form";
import { Slot } from "@/types/types";
import toast from "react-hot-toast";
import {
  useGetSlotRowQuery,
  useUpdateSlotRowMutation,
} from "@/redux/api/baseApi";
import EditFormInputs from "./EditFormInputs";
import { useLocation } from "react-router-dom";

const EditRowData = ({ rowId }: { rowId: string }) => {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm<Slot>();
  const dialogCloseRef = useRef<HTMLButtonElement>(null);
  const { pathname } = useLocation();

  const options = {
    id: rowId,
    path: pathname,
  };
  const { data } = useGetSlotRowQuery(options);
  const [updateSlots, { isLoading }] = useUpdateSlotRowMutation();

  // Reset from values
  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [open, data, reset]);

  // Edit modal stopping propagating
  const handleEditClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(true);
  };

  //Submit Handler
  const onSubmit: SubmitHandler<Slot> = async (formData) => {
    const updatedFormData = {
      medical: formData.medical,
      passport: formData.passport,
      names: formData.names,
      link: formData.link,
      reference: formData.reference,
      isPaid: false,
    };

    try {
      const result = await updateSlots({
        path: pathname,
        id: rowId,
        data: updatedFormData,
      }).unwrap();
      if (result) {
        toast.success("Successfully edited");
        setOpen(false); // Close the modal
      }
    } catch (error) {
      console.error("Something went wrong", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem className="py-1" onSelect={(e) => e.preventDefault()}>
          <span className="w-full h-full" onClick={handleEditClick}>
            Edit
          </span>
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="md:max-w-[500px] lg:max-w-[600px] xl:max-w-[730px] 2xl:max-w-[825px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          {data && <EditFormInputs data={data} register={register} />}
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" ref={dialogCloseRef}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="bg-[#0085FF] hover:bg-[#006cd1]"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditRowData;
