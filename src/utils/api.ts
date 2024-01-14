import ResponseData from "./type";

export const fetchData = async () => {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );
    const responseData = await response.json() as ResponseData[];
    return responseData;

  } catch (error) {
    console.error("Error:", error);
  }
};


export const FileteredData = async ( inputValue: string) => {
  const responseData = await fetchData();
  return responseData?.filter((user) =>
  user.name.toLowerCase().includes(inputValue.toLowerCase()))
}
