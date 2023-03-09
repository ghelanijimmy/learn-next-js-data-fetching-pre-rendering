import fs from 'fs/promises';
import path from "path";

type Product = {
    id: string;
    title: string;
}

type Props = {
    products: Product[];
}

export default function Home(props: Props) {
  const {products} = props;
  return (
    <>
      <ul>
        {products.map(product => (
            <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </>
  )
}

export async function getStaticProps(): Promise<{props: Props, revalidate: number}> {
    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
    const jsonData = await fs.readFile(filePath)
    const data = JSON.parse(jsonData.toString());

  return {
    props: {
      products: data.products
    },
      revalidate: 10
  }
}