import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { getData } from "@/utils/getData";
import { ProductData } from "@/pages/products/index";

export default function ProductDetailPage({
  product,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    (product && (
      <>
        <h1>{product.title}</h1>
        <p>{product.description}</p>
      </>
    )) || <p>Loading</p>
  );
}

export async function getStaticProps(
  context: GetStaticPropsContext<{ pid: string }>
) {
  const { params } = context;
  const productId = params!.pid;

  const data = await getData<ProductData>("data", "dummy-backend.json");
  const product = data.products.find((product) => product.id === productId);

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths(): Promise<
  GetStaticPathsResult<{ pid: string }>
> {
  const data = await getData<ProductData>("data", "dummy-backend.json");
  const products = data.products.map((product) => {
    return {
      params: { pid: product.id },
    };
  });
  return {
    paths: [],
    fallback: true, // or 'blocking' if you want to wait for the page to be generated. False will return 404 if the page doesn't exist. False also relies on static content that you pass paths. True will return the page as soon as it's generated. True does not rely on static content that you pass paths. However, you need to handle the case where the page is not yet generated so props may be undefined
  };
}
