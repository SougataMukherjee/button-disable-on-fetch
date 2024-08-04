import { useState } from "react";

export default function App() {
  const [disable, setDisable] = useState(false);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchData() {
    try {
      setDisable(true);
      setIsLoading(true);
      const response = await fetch("https://reqres.in/api/users?page=2");
      if (!response.ok) {
        throw new Error("Response not OK");
      }
      const resData = await response.json();
      setIsLoading(false);
      setData(resData);
    } catch (e) {
      console.error("Error:", e);
    }
  }

  return (
    <div>
      {isLoading && <p>Fetching...</p>}
      {!isLoading && (
        <button onClick={fetchData} disabled={disable}>
          Click
        </button>
      )}
      <p>{data ? JSON.stringify(data) : "No data fetched"}</p>
    </div>
  );
}
