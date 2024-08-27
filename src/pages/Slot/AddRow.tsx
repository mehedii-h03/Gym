import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import AddFormInputs from "./AddFormInputs";
import { Slot } from "@/types/types";
import { useAddRowMutation } from "@/redux/api/baseApi";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const AddRow = () => {
  const { register, handleSubmit, reset } = useForm<Slot>();
  const [addRow] = useAddRowMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { pathname } = useLocation();

  // handle open modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // handle close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    reset();
  };

  // handler submit
  const onSubmit: SubmitHandler<Slot> = async (data) => {
    const modifiedForm = { ...data, isPaid: false };
    const options = { path: pathname, modifiedForm };

    try {
      const result = await addRow(options).unwrap();
      if (result) {
        toast.success("Successfully added");
        handleCloseModal();
      }
    } catch (error) {
      console.error("something went wrong", error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      reset();
    }
  }, [isModalOpen, reset]);

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border-[1.5px] border-[#D0D5DD] rounded-md text-sm gap-2 text-[#344054] font-normal"
          onClick={handleOpenModal}
        >
          <Plus className="text-[#667085] size-4" />
          Add
        </Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-[500px] lg:max-w-[600px] xl:max-w-[730px] 2xl:max-w-[825px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <AddFormInputs register={register} />
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button type="submit" className="bg-[#0085FF] hover:bg-[#006cd1]">
              Add
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddRow;
