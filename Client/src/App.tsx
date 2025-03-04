import "./App.css";
import CustomTable from "./components/CustomTable";
import SpinningAvatar from "./components/SpinningAvatar";
import { useState, useEffect } from "react";
export type employeeProps = {
  id: number;
  name: string;
  role: string;
  salary: number;
};

function App() {
  const [data, setData] = useState([
    { id: 1, name: "daniel1", role: "waterboy", salary: 20000 },
  ]);
  let employeeNames: employeeProps[] = [];
  let canProceed: boolean = true;
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/employee");
        const body = await response.json();
        if (canProceed) {
          body.map((e: employeeProps) => {
            employeeNames.push(e);
          });
        }
        console.log(employeeNames);
        canProceed = false;
        setData(body);
        setIsLoaded(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  // const [data, setData] = useState("");

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("http://localhost:3000/");
  //       const json = await response.json();
  //       setData(json.client);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <>
      {/* <div>{data ? data : "Loading..."}</div> */}
      {/* <div>Hover to spin</div> */}
      {/* <SpinningAvatar
        name="dog"
        nameColor="pink"
        imageUrl="https://tse2.mm.bing.net/th?id=OIP.PDlm3trgAkY6pGPcbRt4SQHaEK&pid=Api&P=0&h=180"
        size={200}
        border={12}
        borderColor="brown"
      />
      <SpinningAvatar
        name="capybara"
        nameColor="blue"
        imageUrl="https://i.pinimg.com/originals/dc/03/16/dc03166d8b1bee0cfd1da3dd29491377.jpg"
        size={150}
        border={24}
        borderColor="yellow"
      /> */}

      {isLoaded && <CustomTable list={data} />}
    </>
  );
}

export default App;
