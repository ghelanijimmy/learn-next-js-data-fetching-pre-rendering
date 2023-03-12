import { useState } from "react";
import useSWR from "swr";
export default function LastSales() {
  const [sales, setSales] =
    useState<{ id: string; username: string; volume: number }[]>();

  const { isLoading, error } = useSWR(
    "https://learn-next-js-c3666-default-rtdb.firebaseio.com/sales.json",
    async (url) => {
      const data = await fetch(url).then(
        (response) =>
          response.json() as Promise<{
            [key: string]: { username: string; volume: number };
          }>
      );
      const transformedSales = [];

      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }

      setSales(transformedSales);
    }
  );

  if (error) {
    return <p>{error}</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!sales) {
    return <p>No data yet.</p>;
  }

  return (
    <>
      <ul>
        {sales.map((sale) => (
          <li key={sale.id}>
            {sale.username} - {sale.volume}
          </li>
        ))}
      </ul>
    </>
  );
}
