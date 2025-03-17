import Act3Form from "./components/Act3Form";
import Act3member from "./components/Act3Member";
import { useEffect, useState } from "react";
import { Member } from "./types/member.type";

const Activity3App = () => {
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await fetch("http://localhost:3000/act3");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMembers(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/act3/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      fetchMembers();
    } catch (error) {
      console.error("Error deleting member:", error);
      alert("Failed to delete member. Please try again.");
    }
  };

  const handleUpdate = async (id: string, updatedMember: Partial<Member>) => {
    try {
      const response = await fetch(`http://localhost:3000/act3/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedMember),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      fetchMembers();
    } catch (error) {
      console.error("Error updating member:", error);
      alert("Failed to update member salary. Please try again.");
    }
  };

  const refreshMembers = () => {
    fetchMembers();
  };

  return (
    <div className="grid grid-cols-2 bg-green-500 w-[100vw]">
      <Act3Form onFormSubmitted={refreshMembers} />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Members</h2>
        {members.map((member) => (
          <Act3member
            key={member.id}
            {...member}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </div>
    </div>
  );
};

export default Activity3App;
