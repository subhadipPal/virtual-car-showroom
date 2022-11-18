import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Theme,
  Typography,
  useTheme,
} from "@mui/material";
import { Record } from "../../../typings";
import { makeStyles, createStyles } from "@mui/styles";

const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    tileContent: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      height: "100%",
    },
    tileFooter: {
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
      position: "absolute",
      bottom: 0,
      width: "90%",
      minHeight: "60px",
      borderTop: `1px solid ${theme.palette.grey[400]}`,
    },
    cardContent: {
      position: "absolute",
      bottom: 0,
      width: "100%",
      height: "70%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    otherDetails: {
      marginTop: "10px",
      display: "grid",
      gap: "5px",
      gridTemplateColumns: "1fr 1fr",
    },
  })
);

const OfferTile = ({ record }: { record: Record }) => {
  const theme = useTheme();
  const { tileContent, tileFooter, cardContent, otherDetails } = useStyles();
  return (
    <Card sx={{ width: "350px", height: "450px" }}>
      <CardActionArea className={tileContent}>
        <CardMedia
          component="img"
          image={record.image}
          alt={`${record.make} ${record.model}`}
          sx={{
            position: "absolute",
            top: 0,
            maxHeight: 200,
            overflow: "visible",
            backgroundSize: "contain",
          }}
        />
        <CardContent className={cardContent}>
          <Typography variant="h6">
            {`${record.make} ${record.model}`}
          </Typography>
          <Typography sx={{ fontSize: 12, fontWeight: "bold" }}>
            {record.variant}
          </Typography>
          <div className={otherDetails}>
            <Typography sx={{ fontSize: 10 }}>
              Condition: {record.condition}
            </Typography>
            <Typography sx={{ fontSize: 10 }}>
              Mileage: {record.mileage}
            </Typography>
            <Typography sx={{ fontSize: 10 }}>
              First registration: {record.firstRegistration}
            </Typography>
            <Typography sx={{ fontSize: 10 }}>Fuel: {record.fuel}</Typography>
            <Typography sx={{ fontSize: 10 }}>Power: {record.power}</Typography>
            <Typography sx={{ fontSize: 10 }}>
              Consumption: `${record.consumptionCombined} $
              {record.consumptionUnit}`
            </Typography>
            <Typography sx={{ fontSize: 10 }}>CO2: {record.co2}</Typography>
          </div>
          <div className={tileFooter}>
            <Typography
              variant="h6"
              sx={{ color: theme.palette.grey[700], width: "80%" }}
            >
              from €{record.monthlyInstallment}/month
            </Typography>
            <Typography variant="h6" sx={{ color: theme.palette.grey[700] }}>
              €{record.price}
            </Typography>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default OfferTile;
