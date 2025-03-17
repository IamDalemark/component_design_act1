import { useState } from "react";
import { Form } from "../types/form.type";
interface Act3FormProps {
  onFormSubmitted?: () => void;
}
const Act3Form = ({ onFormSubmitted }: Act3FormProps) => {
  const [formData, setFormData] = useState<Form>({
    id: 0,
    firstName: "",
    lastName: "",
    groupName: "",
    role: "",
    expectedSalary: "",
    expectedDateOfDefense: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/act3", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Form submission successful:", result);
      setFormData({
        id: 0,
        firstName: "",
        lastName: "",
        groupName: "",
        role: "",
        expectedSalary: "",
        expectedDateOfDefense: "",
      });
      if (onFormSubmitted) {
        onFormSubmitted();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="self-start bg-green-500 min-h-screen p-6 flex justify-center items-center">
      <form
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <div className="bg-blue-500 p-4 rounded-lg mb-4 ">
          <h2 className="text-lg font-bold mb-2">Contact Name</h2>
          <div className="flex gap-2">
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="bg-green-100 p-2 rounded w-full"
              placeholder="First Name"
            />
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="bg-green-100 p-2 rounded w-full"
              placeholder="Last Name"
            />

            <input
              name="id"
              value={formData.id}
              onChange={handleChange}
              className="bg-green-100 p-2 rounded w-full"
              placeholder="id"
            />
          </div>
        </div>
        <div className="text-lg font-bold mb-2"> Group Name</div>
        <input
          name="groupName"
          value={formData.groupName}
          onChange={handleChange}
          className="bg-green-100 p-2 rounded w-full mb-2"
          placeholder="Group Name"
        />

        <div className="text-lg font-bold mb-2"> Role</div>
        <input
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="bg-green-100 p-2 rounded w-full mb-2"
          placeholder="Role"
        />
        <div className="text-lg font-bold mb-2"> Expected Salary</div>
        <input
          name="expectedSalary"
          value={formData.expectedSalary}
          onChange={handleChange}
          className="bg-green-100 p-2 rounded w-full mb-2"
          placeholder="Expected Salary"
        />
        <div className="text-lg font-bold mb-2"> Expected Date of Defense</div>

        <input
          name="expectedDateOfDefense"
          value={formData.expectedDateOfDefense}
          onChange={handleChange}
          className="bg-green-100 p-2 rounded w-full mb-2"
          type="date"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full mt-4 hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Act3Form;
