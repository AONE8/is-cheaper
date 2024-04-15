export async function postProds(data, handleReset) {
  try {
    const response = await fetch("http://localhost:8080/api/products/search", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      method: "POST",
      body: JSON.stringify(data),
    });

    const message = await response.json();

    alert(message);
    console.log(message);
    handleReset();
  } catch (error) {
    alert(error);
  }
}
