export default async function handler(req, res) {
  try {
    const searchWord = req.query.searchInput;
    const sizeSearch = req.query.size;
    const apiUrl = `https://cosmic-software-developer-assessment.ngrok.app/shakespeare/search?term=${searchWord}&size=${sizeSearch}&highlight=true&highlight-start=%3Cstrong%3E&highlight-end=%3C%2Fstrong%3E`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
}
