 import axios from "axios";

const chatWithAI = async (req, res) => {
  const { message } = req.body;

    try {
    const response = await axios.post(
      "https://router.huggingface.co/v1/chat/completions",
      {
        model: "deepseek-ai/DeepSeek-V3-0324",
        messages: [
          {
            role: "system",
            content: `You are AI-Mart assistant, a helpful and expert AI chatbot. 
                      You ONLY provide information related to AI-Mart, AI tools, student help apps, dietician consultations, and related topics. 
                      Answer concisely, professionally, and in friendly tone. 
                      If the question is unrelated, politely say "I can only help with AI-Mart related topics."`
          },
          { role: "user", content: message }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

      const reply =
      response.data?.choices?.[0]?.message?.content ||
      response.data?.[0]?.generated_text ||
      "No reply generated";
    res.json({ reply });

  } catch (err) {
    console.error("HF Router Error 👉", err.response?.data || err.message);
    res.status(500).json({ error: "HF AI response failed" });
  }
};

export default chatWithAI;




 

 

 
