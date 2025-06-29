import app from '@src/app';
import dotenv from 'dotenv';

dotenv.config();

async function start() {
  try {
    const PORT = process.env.PORT || 3000;
    await app.listen({ port: Number(PORT) });
    console.log(`Server is running on http://localhost:${PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();
