

export const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "long" }).toUpperCase();
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};