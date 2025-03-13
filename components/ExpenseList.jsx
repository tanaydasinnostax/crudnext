import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";

const ExpenseList = ({ expenses, updateExpense,deleteExpense }) => {
  const [editingId, setEditingId] = useState(null);
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedValue, setUpdatedValue] = useState("");

  const startEditing = (expense) => {
    setEditingId(expense.id);
    setUpdatedDescription(expense.description);
    setUpdatedValue(expense.value);
  };

  const handleSave = (id) => {
    updateExpense(id, updatedDescription, updatedValue);
    setEditingId(null);
  };

  return (
    <ul>
      {expenses.map((expense) => (
        <li
          key={expense.id}
          className="bg-white p-3 rounded-md shadow-md flex justify-between items-center mb-2"
        >
          {editingId === expense.id ? (
            <>
              <input
                type="text"
                value={updatedDescription}
                onChange={(e) => setUpdatedDescription(e.target.value)}
                className="p-2 border rounded"
              />
              <input
                type="number"
                value={updatedValue}
                onChange={(e) => setUpdatedValue(e.target.value)}
                className="p-2 border rounded"
              />
              <button onClick={() => handleSave(expense.id)} className="text-green-500">
                <SaveIcon />
              </button>
            </>
          ) : (
            <>
              <span>
                {expense.description} - ${expense.value}
              </span>
              <div className="flex gap-2">
                <button onClick={() => startEditing(expense)} className="text-blue-500">
                  <EditIcon />
                </button>
                <button onClick={() => deleteExpense(expense.id)} className="text-red-500">
                  <DeleteIcon />
                </button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ExpenseList;
