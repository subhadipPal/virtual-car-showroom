import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { OffersData, Record } from "../typings";
import {
  fetchVehicleData,
  getDefaultAppliedFilters,
  getFilteredRecords,
} from "../utils";
import ProductListingPage from "../components/productListingPage";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "../theme";
import { OfferDataContext } from "../context";
import { useRouter } from "next/router";
import { AppContext } from "../context/appContext";

type AppliedFiltersType = { [key: string]: string };
type QueryParams = {
  model?: string;
  make?: string;
  mileage?: string;
  power?: string;
  firstRegistration?: string;
  fuel?: string;
  price?: string;
  gearbox?: string;
  exteriorColor?: string;
  category?: string;
};

export default function Home({ vehicleData }: { vehicleData: OffersData }) {
  const {
    getOffersV3Beta: { records: staticRecords },
  } = vehicleData;
  const router = useRouter();

  const [vehicleOffers] = useState(staticRecords);
  const [filteredVehicleOffers, setFilteredVehicleOffers] = useState<
    Record[] | undefined
  >();
  const { toggleOffers, appliedFilters: appAppliedFilters } =
    useContext(AppContext);
  let areFiltersUpdated = false;

  const [appliedFilters, setAppliedFilters] = useState<
    AppliedFiltersType | undefined
  >(getDefaultAppliedFilters());
  const [urlFilterApplied, setUrlFiltersApplied] = useState(false);

  if (appAppliedFilters) {
    areFiltersUpdated = Object.values(appAppliedFilters).some(
      (filterVal) => !!filterVal
    );
  }
  const {
    model,
    make,
    mileage,
    power,
    firstRegistration,
    fuel,
    price,
    gearbox,
    exteriorColor,
    category,
  }: QueryParams = router.query;

  const urlFilters = useMemo(
    () => ({
      ...appliedFilters,
      ...(!!model && { model }),
      ...(!!make && { make }),
      ...(!!mileage && { mileage }),
      ...(!!power && { power }),
      ...(!!firstRegistration && { firstRegistration }),
      ...(!!fuel && { fuel }),
      ...(!!price && { price }),
      ...(!!gearbox && { gearbox }),
      ...(!!exteriorColor && { exteriorColor }),
      ...(!!category && { category }),
    }),
    [
      appliedFilters,
      category,
      exteriorColor,
      firstRegistration,
      fuel,
      gearbox,
      make,
      mileage,
      model,
      power,
      price,
    ]
  );

  useEffect(() => {
    const areUrlFiltersApplied = Object.values(urlFilters).some(
      (filterVal) => !!filterVal
    );
    if (areUrlFiltersApplied && !urlFilterApplied) {
      const urlFilteredRecords = getFilteredRecords(urlFilters, vehicleOffers);
      setFilteredVehicleOffers(urlFilteredRecords);
      setUrlFiltersApplied(true);
      setAppliedFilters(urlFilters);
    }
  }, [urlFilterApplied, urlFilters, vehicleOffers]);

  const handleOfferTileClick = useCallback((vehicleId: string) => {
    router.push(`/${vehicleId}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    toggleOffers?.(vehicleOffers);
    if (areFiltersUpdated) {
      setAppliedFilters(appAppliedFilters);
      const filteredRecords = getFilteredRecords(
        appAppliedFilters,
        vehicleOffers
      );
      setFilteredVehicleOffers(filteredRecords);
    }
  }, [appAppliedFilters, areFiltersUpdated, toggleOffers, vehicleOffers]);

  const offerContextValue = useMemo(
    () => ({
      offers: vehicleOffers,
      appliedFilters: appliedFilters,
      filteredOffers: filteredVehicleOffers,
      redirectToPDP: handleOfferTileClick,
      toggleFilteredOffers: (newOffers?: Record[]) =>
        setFilteredVehicleOffers(newOffers),
      updateAppliedFilters: (newAppliedFilters?: AppliedFiltersType) => {
        setAppliedFilters(newAppliedFilters);
      },
    }),
    [appliedFilters, filteredVehicleOffers, handleOfferTileClick, vehicleOffers]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <OfferDataContext.Provider value={offerContextValue}>
        <ProductListingPage />
      </OfferDataContext.Provider>
    </ThemeProvider>
  );
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
