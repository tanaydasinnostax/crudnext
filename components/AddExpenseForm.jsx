import { useState } from "react";

const AddExpenseForm = ({ addExpense }) => {
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (description.trim() !== "" && value.trim() !== "") {
      addExpense(description, value);
      setDescription("");
      setValue("");
    }
  };

  return (
    <div className="p-8">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row sm:space-x-4">
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full sm:w-1/2 p-3 rounded-md border border-orange-100 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 sm:mb-0"
          />
          <input
            type="number"
            placeholder="Amount"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full sm:w-1/2 p-3 rounded-md border border-orange-100 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 sm:mb-0"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#e98901] text-white p-3 rounded-md hover:bg-[#FF990A] font-semibold shadow-md"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default AddExpenseForm;
