import { ChangeEvent, useState } from "react";
import Cards, { Focused } from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { UseFormRegister } from "react-hook-form";

interface CardFormData {
  number: string;
  name: string;
  expiry: string;
  cvc: string;
}

type EditFormInputsProps = {
  register: UseFormRegister<CardFormData>;
  card: CardFormData;
};

const EditCardForm: React.FC<EditFormInputsProps> = ({ register, card }) => {
  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "" as Focused,
  });

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt: ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, focus: evt.target.name as Focused }));
  };

  return (
    <div className="flex flex-col md:flex-row justify-between gap-8 p-6 bg-gray-100 rounded-lg shadow-md my-5">
      <div className="w-full md:w-1/2 mb-6 md:mb-0">
        <Cards
          number={state.number}
          expiry={state.expiry}
          cvc={state.cvc}
          name={state.name}
          focused={state.focus}
        />
      </div>
      <div className="w-full md:w-1/2 space-y-4">
        <div>
          <input
            {...register("number", { required: true })}
            type="tel"
            name="number"
            defaultValue={card?.number}
            placeholder="Card Number"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            maxLength={16}
          />
        </div>
        <div>
          <input
            {...register("name", { required: true })}
            type="text"
            name="name"
            defaultValue={card?.name}
            placeholder="Name on Card"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex space-x-4">
          <input
            {...register("expiry", { required: true })}
            type="text"
            name="expiry"
            placeholder="MM/YY"
            defaultValue={card?.expiry}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            maxLength={5}
          />
          <input
            {...register("cvc", { required: true })}
            type="tel"
            name="cvc"
            defaultValue={card?.cvc}
            placeholder="CVC"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            maxLength={4}
          />
        </div>
      </div>
    </div>
  );
};

export default EditCardForm;
