import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import CardAddForm from "./CardAddForm";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useAddCardMutation } from "@/redux/api/baseApi";

interface CardFormData {
  number: string;
  name: string;
  expiry: string;
  cvc: string;
}

const AddCard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [addCard] = useAddCardMutation();
  const { register, handleSubmit, reset } = useForm<CardFormData>();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    reset();
  };

  const onSubmit: SubmitHandler<CardFormData> = async (data) => {
    try {
      const result = await addCard(data).unwrap();
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
        <div
          onClick={handleOpenModal}
          className="flex items-center justify-center text-[#6B6F7B] w-full h-full border-dotted border-[3px] border-[#6b6f7b] rounded-xl cursor-pointer min-h-[180px] max-w-[290px]"
        >
          <div className="flex flex-col items-center justify-center">
            <CirclePlus className="h-9 w-9" />
            <p className="text-base">Add new Card</p>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="md:max-w-[500px] lg:max-w-[600px] xl:max-w-[730px] 2xl:max-w-[825px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardAddForm register={register} />
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

export default AddCard;
