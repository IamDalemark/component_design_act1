import { Member } from "../types/member.type";
import { useState } from "react";

interface Act3MemberProps extends Member {
  onDelete: (id: string) => void;
  onUpdate: (id: string, updatedMember: Partial<Member>) => void;
}

const Act3member = ({
  expectedDateOfDefense,
  expectedSalary,
  firstName,
  groupName,
  lastName,
  role,
  id,
  onDelete,
  onUpdate,
}: Act3MemberProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newSalary, setNewSalary] = useState(expectedSalary);

  const handleDelete = () => {
    if (onDelete) {
      onDelete(id);
    }
  };

  const handleSalaryUpdate = () => {
    if (onUpdate) {
      onUpdate(id, { expectedSalary: newSalary });
      setIsEditing(false);
    }
  };

  return (
    <div className="bg-white shadow-md p-4 rounded-lg mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold">
            {firstName} {lastName}
          </h3>
          <p className="text-gray-700">id: {id}</p>
          <p className="text-gray-700">Group: {groupName}</p>
          <p className="text-gray-700">Role: {role}</p>

          {isEditing ? (
            <div className="flex items-center mt-2">
              <p className="text-gray-700 mr-2">Expected Salary: ₱</p>
              <input
                type="text"
                value={newSalary}
                onChange={(e) => setNewSalary(e.target.value)}
                className="border rounded px-2 py-1 w-24"
              />
              <button
                onClick={handleSalaryUpdate}
                className="ml-2 bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setNewSalary(expectedSalary);
                }}
                className="ml-2 bg-gray-300 text-gray-700 px-2 py-1 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          ) : (
            <p className="text-gray-700">Expected Salary: ₱{expectedSalary}</p>
          )}

          <p className="text-gray-700">
            Defense Date: {new Date(expectedDateOfDefense).toDateString()}
          </p>
        </div>

        <div className="flex flex-col space-y-2">
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Edit Salary
            </button>
          )}

          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Act3member;
