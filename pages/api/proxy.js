import axios from "axios";

export default async function handler(req, res) {
  const { endpoint } = req.query; // e.g., getBlogByUser, getCommentByUser
  try {
    const cookies = req.headers.cookie || "";

    const response = await axios({
      method: req.method,
      url: `https://blog-next-server-5nzm.onrender.com/api/${endpoint}`,
      headers: { Cookie: cookies },
      data: req.body,
      withCredentials: true
    });

    res.status(response.status).json(response.data);
  } catch (err) {
    console.error("Proxy error:", err.response?.data || err.message);
    res.status(err.response?.status || 500).json({ message: "Proxy failed" });
  }
}
