import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";

const Index = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, date: "2023-03-15", amount: 150, type: "Expense", category: "Nike" },
    { id: 2, date: "2023-03-20", amount: 200, type: "Income", category: "Adidas" },
    { id: 3, date: "2023-03-25", amount: 180, type: "Expense", category: "Jordan" },
  ]);

  const [newTransaction, setNewTransaction] = useState({
    date: "",
    amount: "",
    type: "",
    category: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction({ ...newTransaction, [name]: value });
  };

  const handleSelectChange = (name, value) => {
    setNewTransaction({ ...newTransaction, [name]: value });
  };

  const handleDateChange = (date) => {
    setNewTransaction({ ...newTransaction, date: date.toISOString().split('T')[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newId = transactions.length > 0 ? Math.max(...transactions.map(t => t.id)) + 1 : 1;
    setTransactions([...transactions, { id: newId, ...newTransaction }]);
    setNewTransaction({ date: "", amount: "", type: "", category: "" });
  };

  const handleEdit = (id) => {
    // Implement edit functionality
    console.log("Edit transaction with id:", id);
  };

  const handleDelete = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Sneaker Accounting App</h1>
      
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="date">Date</Label>
            <Calendar
              mode="single"
              selected={newTransaction.date ? new Date(newTransaction.date) : undefined}
              onSelect={handleDateChange}
              className="rounded-md border"
            />
          </div>
          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input
              type="number"
              id="amount"
              name="amount"
              value={newTransaction.amount}
              onChange={handleInputChange}
              placeholder="Enter amount"
            />
          </div>
          <div>
            <Label htmlFor="type">Type</Label>
            <Select name="type" onValueChange={(value) => handleSelectChange("type", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Income">Income</SelectItem>
                <SelectItem value="Expense">Expense</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Select name="category" onValueChange={(value) => handleSelectChange("category", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Nike">Nike</SelectItem>
                <SelectItem value="Adidas">Adidas</SelectItem>
                <SelectItem value="Jordan">Jordan</SelectItem>
                <SelectItem value="Reebok">Reebok</SelectItem>
                <SelectItem value="Puma">Puma</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button type="submit" className="w-full">Add Transaction</Button>
      </form>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>${transaction.amount}</TableCell>
              <TableCell>{transaction.type}</TableCell>
              <TableCell>{transaction.category}</TableCell>
              <TableCell>
                <Button variant="ghost" size="icon" onClick={() => handleEdit(transaction.id)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(transaction.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Index;