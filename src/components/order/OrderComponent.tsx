import { QUERY_ORDERS_BY_CONTEXT } from "@/graphql/order/order";
import { useQuery } from "@apollo/client";
import { Box, Typography } from "@mui/material";
import { showToast } from "../utils/toastHelper";
import { useRouter } from "next/router";
import { IOrder } from "@/types/IOrder";
import { VariablesColors } from "@/styles/Variables.colors";
import CardPageCard from "./OrderPageCard";

function OrderComponent() {
  const router = useRouter();
  const { greyColor } = new VariablesColors();

  const { data: dataOrder } = useQuery<{ items: IOrder[] }>(
    QUERY_ORDERS_BY_CONTEXT,
  );
  const orders = dataOrder ? dataOrder.items : [];

  return (
    <Box minHeight={300}>
      <Box display={"flex"} gap={1} alignItems={"baseline"}>
        <Typography
          variant="h4"
          mt={3}
          sx={{
            fontSize: {
              xs: "1.5rem",
              sm: "2.5rem",
            },
          }}
        >
          {orders.length > 0 ? "Vos commands" : "Aucune commande"}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", gap: 1, flexDirection: "column" }}>
        {orders.length > 0 &&
          orders?.map((order: IOrder) => {
            return (
              <Box
                key={order.id}
                sx={{
                  bgcolor: "#f5f5f5",
                  borderRadius: "10px",
                  padding: "1rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <CardPageCard order={order} />
              </Box>
            );
          })}
      </Box>
    </Box>
  );
}

export default OrderComponent;
