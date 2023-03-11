import path from "path";
import fs from "fs/promises";
import { ProductData } from "@/pages/products";

export async function getData<T>(...args: string[]): Promise<T> {
  const filePath = path.join(process.cwd(), ...args);
  const jsonData = await fs.readFile(filePath);
  return (await JSON.parse(jsonData.toString())) as T;
}
