import { MouseEvent, useRef, useState } from "react";
import Cards from "react-credit-cards-2";
import AddCard from "./AddCard";
import { useDeleteCardMutation, useGetCardsQuery } from "@/redux/api/baseApi";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import EditCard from "./EditCard";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  clearActiveCard,
  setActiveCard,
} from "@/redux/features/activeCardSlice";
import ActivateBadge from "./ActivateBadge";
import Loader from "@/components/Loader";

interface Card {
  _id: string;
  number: string;
  name: string;
  expiry: string;
  cvc: string;
}

const CardsPage = () => {
  const dispatch = useAppDispatch();
  const activeCard = useAppSelector((state) => state.activeCard.activeCard);

  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState("");
  const { data: cards, isLoading, isError } = useGetCardsQuery("");
  const [deleteCard] = useDeleteCardMutation();
  const contextMenuRef = useRef<HTMLUListElement>(null);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });

  // Active Card
  const handleSetActiveCard = (card: Card) => {
    dispatch(setActiveCard(card));
    setIsContextMenuVisible(false);
    toast.success("Card set as active");
  };

  // Deactivate card
  const handleDeactivateCard = () => {
    dispatch(clearActiveCard());
    setIsContextMenuVisible(false);
    toast.success("Card deactivated");
  };

  // Handler Context menu
  const handleContextMenu = (event: MouseEvent<HTMLDivElement>, id: string) => {
    event.preventDefault();
    const rect = event.currentTarget.getBoundingClientRect();
    setContextMenuPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
    setIsContextMenuVisible(true);
    setSelectedCardId(id);
  };

  // Click outside context hidden
  const handleClickOutside = (event: MouseEvent) => {
    if (
      contextMenuRef.current &&
      !contextMenuRef.current.contains(event.target as Node)
    ) {
      setIsContextMenuVisible(false);
    }
  };

  // Handler delete
  const handlerDeleteCard = async () => {
    try {
      setIsContextMenuVisible(false);
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Are you sure you want to delete this card?",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Delete",
      });

      if (result.isConfirmed) {
        await deleteCard(selectedCardId).unwrap();

        if (selectedCardId === activeCard?._id) {
          dispatch(clearActiveCard());
        }

        toast.success("Successfully deleted");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // showing loading component
  if (isLoading) {
    return (
      <div className="w-full bg-white p-5 rounded-md min-h-[75vh]">
        <Loader />
      </div>
    );
  }

  // Showing error
  if (isError) {
    return (
      <div className="w-full bg-white p-5 rounded-md">
        <p className="text-sm text-red-600 text-center py-10">
          Something went wrong
        </p>
      </div>
    );
  }

  return (
    <section
      className="bg-white p-6 rounded-md h-full min-h-[75vh]"
      onClick={handleClickOutside}
    >
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-medium">Cards</h1>
        {/* <CardsDropDown /> */}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 justify-items-center md:justify-items-start">
        {cards?.map((card: Card) => (
          <div
            key={card._id}
            className="w-full relative max-w-[290px]"
            onContextMenu={(event) => handleContextMenu(event, card._id)}
          >
            <Cards
              number={card.number}
              expiry={card.expiry}
              cvc={card.cvc}
              name={card.name}
            />
            {activeCard?._id === card._id && <ActivateBadge />}
            {isContextMenuVisible && selectedCardId === card._id && (
              <ul
                className="z-50 py-4 ps-4 pe-10 bg-white text-[#5F6C72] rounded text-sm space-y-3 absolute border shadow-md"
                ref={contextMenuRef}
                style={{
                  left: `${contextMenuPosition.x}px`,
                  top: `${contextMenuPosition.y}px`,
                }}
              >
                <li
                  className="cursor-pointer hover:text-black transition-all duration-100"
                  onClick={() => handleSetActiveCard(card)}
                >
                  Activate
                </li>
                {activeCard?._id === card._id && (
                  <li
                    onClick={handleDeactivateCard}
                    className="cursor-pointer hover:text-black transition-all duration-100"
                  >
                    Deactivated
                  </li>
                )}
                <EditCard
                  id={selectedCardId}
                  setState={setIsContextMenuVisible}
                />
                <li
                  className="cursor-pointer hover:text-black transition-all duration-100"
                  onClick={() => handlerDeleteCard()}
                >
                  Delete
                </li>
              </ul>
            )}
          </div>
        ))}
        <AddCard />
      </div>
    </section>
  );
};

export default CardsPage;
