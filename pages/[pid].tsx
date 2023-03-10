import {GetStaticPathsResult, GetStaticPropsContext, InferGetStaticPropsType} from "next";
import {getData} from "@/utils/getData";
import {ProductData} from "@/pages/index";

export default function ProductDetailPage({product}: InferGetStaticPropsType<typeof getStaticProps>) {
	return product && (
		<>
			<h1>{product.title}</h1>
			<p>{product.description}</p>
		</>
	) || <p>Loading</p>
}

export async function getStaticProps(context: GetStaticPropsContext<{pid: string}>) {
	const {params} = context;
	const productId = params!.pid;

	const data = await getData<ProductData>('data', 'dummy-backend.json');
	const product = data.products.find(product => product.id === productId);

	return {
		props: {
			product
		},
		revalidate: 10
	}
}

export async function getStaticPaths(): Promise<GetStaticPathsResult<{pid: string}>> {
	const data = await getData<ProductData>('data', 'dummy-backend.json');
	const products = data.products.map(product => {
		return {
			params: {pid: product.id}
		}
	});
	return {
		paths: [],
		fallback: true // or 'blocking' if you want to wait for the page to be generated. False will return 404 if the page doesn't exist. True will return the page as soon as it's generated.
	}
}