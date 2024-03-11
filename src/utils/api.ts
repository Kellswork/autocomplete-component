import ResponseData from "./type";

export const fetchData = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicod.com/users");
    const responseData = (await response.json()) as ResponseData[];
    return responseData;
  } catch (error) {
    let err: string | undefined;
    if (error instanceof TypeError) {
      err = error.message;
    }
    console.error("Error fetching data:", err);
    return `There was a problem fetching the data`;
  }
};

// export const getInternetSpeedData = async () => {
//   try {
//     const response = await fetch(
//       "https://intense-gilbertina-speedcheck.koyeb.app/speed_test_result/list",
//     );

//     if (!response.ok) {
//       return `${response.status}: Network error`;
//     }

//     const responseData = (await response.json()) as ResponseProps;
//     // console.log("h", responseData);
//     return responseData.data;
//   } catch (error) {
//     let err: string | undefined;
//     if (error instanceof TypeError) {
//       console.error("Error:", error);
//       err = error.message;
//     }
//     return `There was a problem with the Fetch operation, ${err}`;
//   }
// };
