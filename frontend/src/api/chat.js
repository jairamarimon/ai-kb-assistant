let firstMessage = true;

export const askQuestion = async (question) => {
  const url = import.meta.env.VITE_API_URL;

  try {
    const res = await fetch(`${url}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: question,
        resetHistory: firstMessage,
      }),
    });

    firstMessage = false;
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('API error:', err);
    return { success: false, answer: 'Error: Could not fetch answer.' };
  }
};
