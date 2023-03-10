import fs from 'fs/promises';
import path from "path";
import {GetStaticPropsResult, InferGetStaticPropsType} from "next";
import Link from "next/link";
import {getData} from "@/utils/getData";

export type Product = {
	id: string;
	title: string;
	description: string;
}

export type ProductData = {
	products: Product[];
}

export default function Home(props: InferGetStaticPropsType<typeof getStaticProps>) {
	const {products} = props;
	return (
		<>
			<ul>
				{products.map(product => (
					<li key={product.id}><Link href={`/${product.id}`}>{product.title}</Link></li>
				))}
			</ul>
		</>
	)
}

export async function getStaticProps(): Promise<GetStaticPropsResult<ProductData>> {
	const data = await getData<ProductData>('data', 'dummy-backend.json');

	return {
		props: {
			products: data.products
		},
		revalidate: 10
	}
}