import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useGetCardQuery, useUpdateCardMutation } from "@/redux/api/baseApi";
import EditCardForm from "./EditCardForm";

interface CardFormData {
  number: string;
  name: string;
  expiry: string;
  cvc: string;
}

type Props = {
  id: string;
  setState: Dispatch<SetStateAction<boolean>>;
};

const EditCard = ({ id, setState }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: card } = useGetCardQuery(id);
  const [updateCard] = useUpdateCardMutation();
  const { register, handleSubmit, reset } = useForm<CardFormData>();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    reset();
  };

  const onSubmit: SubmitHandler<CardFormData> = async (formData) => {
    const updatedFormData = {
      number: formData.number,
      name: formData.name,
      expiry: formData.expiry,
      cvc: formData.cvc,
    };

    try {
      const result = await updateCard({
        id,
        data: updatedFormData,
      }).unwrap();
      if (result) {
        toast.success("Successfully edited");
        setIsModalOpen(false);
        setState(false);
      }
    } catch (error) {
      console.error("Something went wrong", error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      reset();
    }
  }, [isModalOpen, reset]);

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <li
          onClick={handleOpenModal}
          className="cursor-pointer hover:text-black transition-all duration-100"
        >
          Edit
        </li>
      </DialogTrigger>
      <DialogContent
        className="md:max-w-[500px] lg:max-w-[600px] xl:max-w-[730px] 2xl:max-w-[825px]"
        onClick={stopPropagation}
      >
        <form onSubmit={handleSubmit(onSubmit)} onClick={stopPropagation}>
          <EditCardForm register={register} card={card} />
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button type="submit" className="bg-[#0085FF] hover:bg-[#006cd1]">
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCard;
