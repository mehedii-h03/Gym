import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slot } from "@/types/types";
import { UseFormRegister } from "react-hook-form";

type EditFormInputsProps = {
  register: UseFormRegister<Slot>;
  data: Slot;
};

const EditFormInputs: React.FC<EditFormInputsProps> = ({ register, data }) => {
  return (
    <div className="py-4 space-y-4">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex flex-col gap-3 w-full">
          <Label htmlFor="medical" className="text-[#0085FF] font-medium">
            Medical
          </Label>
          <Input
            required
            {...register("medical")}
            id="medical"
            defaultValue={data?.medical}
            className="border-[#D0D5DD] w-full"
          />
        </div>
        <div className="flex flex-col gap-3 w-full">
          <Label htmlFor="passport" className="text-[#0085FF] font-medium">
            Passport
          </Label>
          <Input
            required
            {...register("passport")}
            id="passport"
            defaultValue={data?.passport}
            className="border-[#D0D5DD] w-full"
          />
        </div>
        <div className="flex flex-col gap-3 w-full">
          <Label htmlFor="names" className="text-[#0085FF] font-medium">
            Names
          </Label>
          <Input
            {...register("names")}
            id="names"
            defaultValue={data?.names}
            className="border-[#D0D5DD] w-full"
          />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4">
        <div className="flex flex-col gap-3 flex-2 w-full col-span-8">
          <Label htmlFor="link" className="text-[#0085FF] font-medium">
            Link
          </Label>
          <Input
            required
            {...register("link")}
            id="link"
            defaultValue={data?.link}
            className="border-[#D0D5DD] w-full"
          />
        </div>
        <div className="flex flex-col gap-3 w-full col-span-4">
          <Label htmlFor="reference" className="text-[#0085FF] font-medium">
            Reference
          </Label>
          <Input
            {...register("reference")}
            id="reference"
            defaultValue={data?.reference}
            className="border-[#D0D5DD] w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default EditFormInputs;
