import { Divider, Typography } from "@material-ui/core";
import React from "react";

export default function Notificaciones() {
  return (
    <div>
      <Typography variant="h4">Notificaciones</Typography>
      <Typography variant="subtitle2" gutterBottom>
        Lista de notificaciones
      </Typography>
      <Divider />
    </div>
  );
}
