import app from "./app";

import { Server } from "http";

const PORT: string | 4000 = process.env.PORT || 4000;

const server: Server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default server;

