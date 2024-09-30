import { PORT } from "@/lib/env";
import { app, logger } from "@/server";

app.listen(PORT, () => {
  logger.info(`Server started on port: ${PORT}`);
});
