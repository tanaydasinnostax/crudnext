"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import AddExpenseForm from "@/components/AddExpenseForm";
import ExpenseChart from "@/components/ExpenseChart";
import ExpenseList from "@/components/ExpenseList";
import Navbar from "@/components/Navbar";

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingExpense, setEditingExpense] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const pageSize = 3;

  const fetchExpenses =  () => {
    setLoading(true);
      api.get(
        `/expenses?pageNumber=${currentPage}&pageSize=${pageSize}&sortOrder=${sortOrder}${
          startDate ? `&startDate=${startDate}` : ""
        }${
          endDate ? `&endDate=${endDate}` : ""
        }`
      )
      .then((response) =>{
        setExpenses(response.data.expenses || []);
        setTotalPages(Math.ceil(response.data.totalCount/pageSize));
      })
      .catch((error) =>{
        console.error("Error fetching expenses",error);
      })
      .finally(() =>{
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchExpenses();
  }, [currentPage, sortOrder, startDate, endDate]);

  const addExpense = (description, value) => {
    setLoading(true);
    api.post("/expenses", {
        description,
        value: parseFloat(value),
      })
      .then(() =>{
        fetchExpenses();
      })
      .catch((error) =>{
        console.error("Error adding expenses",error);
      })
      .finally(()=>{
        setLoading(false);
      })
  };

  const updateExpense = (id, updatedDescription, updatedValue) => {
    setLoading(true);
    api.patch(`/expenses/${id}`, {
        id,
        value: parseFloat(updatedValue),
        description: updatedDescription,
    })
    .then(()=>{
      fetchExpenses();
      setEditingExpense(null);
    })
    .catch((error)=>{
      console.error("Error updating expenses",error);
    })
    .finally(()=>{
      setLoading(false);
    })
  };

  const deleteExpense = (id) => {
    setLoading(true);
    api.delete(`/expenses/${id}`)
    .then(()=>{
      fetchExpenses();
    })
    .catch((error)=>{
      console.error("Error deleting expenses",error);
    })
    .finally(()=>{
      setLoading(false);
    })
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen p-4 mt-10">
        <div className="flex justify-center">
          <div className="w-full max-w-4xl bg-[#525151] p-8 rounded-xl shadow-lg mt-8">
            <h1 className="text-3xl font-bold text-center text-white mb-6">
              Expense Tracker
            </h1>
            <AddExpenseForm addExpense={addExpense} />
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <div className="w-full max-w-4xl bg-[#525151] p-4 rounded-xl shadow-lg flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
              <label className="text-white">Start Date:</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="px-4 py-2 rounded text-black w-full md:w-auto"
              />
            </div>
            <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
              <label className="text-white">End Date:</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="px-4 py-2 rounded text-black w-full md:w-auto"
              />
            </div>
            <button
              onClick={() => {
                setStartDate("");
                setEndDate("");
              }}
              className="bg-red-500 text-white px-4 py-2 rounded w-full md:w-auto"
            >
              Clear Filter
            </button>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <div className="w-full max-w-4xl bg-[#525151] p-8 rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold text-white">My Expenses</h1>
              <button
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Sort by Value ({sortOrder === "asc" ? "↑ Ascending" : "↓ Descending"})
              </button>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-10">
                <div className="w-12 h-12 border-4 border-gray-300 border-t-white rounded-full animate-spin"></div>
              </div>
            ) : (
              <ExpenseList
                expenses={expenses}
                updateExpense={updateExpense}
                deleteExpense={deleteExpense}
                setEditingExpense={setEditingExpense}
                editingExpense={editingExpense}
              />
            )}
            <ExpenseChart expenses={expenses} />
            <div className="flex justify-center mt-4 space-x-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1 || loading}
                className={`px-4 py-2 rounded ${
                  currentPage === 1 || loading ? "bg-gray-400 cursor-not-allowed" : "bg-gray-500 text-white"
                }`}
              >
                Previous
              </button>
              <span className="text-white">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage >= totalPages || loading}
                className={`px-4 py-2 rounded ${
                  currentPage >= totalPages || loading ? "bg-gray-400 cursor-not-allowed" : "bg-gray-500 text-white"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
