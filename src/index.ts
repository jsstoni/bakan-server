import { app, logger } from '@/server';
import { PORT } from '@/lib/env';

app.listen(PORT, () => {
  logger.info(`Server started on port: ${PORT}`);
});
