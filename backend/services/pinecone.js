import { Pinecone } from '@pinecone-database/pinecone';

const initPinecone = () => {
  const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
  });

  return pc.index(process.env.PINECONE_INDEX_NAME, process.env.PINECONE_HOST);
};

export default initPinecone;
