import "./App.css";
import SpinningAvatar from "./components/SpinningAvatar";

function App() {
  return (
    <>
      <div>Hover to spin</div>
      <SpinningAvatar
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
      />
    </>
  );
}

export default App;
