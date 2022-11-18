import { InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";

import PDP from "../components/productDetailsPage";
import { fetchVehicleData, generateStaticPathsForOffers } from "../utils";

export default function PDPPage({
  vehicleData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const { offerId } = router.query;
  const {
    getOffersV3Beta: { records: staticRecords },
  } = vehicleData;

  return <PDP offerId={offerId as string} staticVehicleData={staticRecords} />;
}

export async function getStaticProps() {
  try {
    const vehicleData = await fetchVehicleData();
    if (!vehicleData) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        vehicleData,
      },
    };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return {
      notFound: true,
    };
  }
}

export async function getStaticPaths() {
  const staticPaths = await generateStaticPathsForOffers();
  return {
    paths: staticPaths,
    fallback: false,
  };
}
