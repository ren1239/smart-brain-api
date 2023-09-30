// controllers/clarifai.js

const handleClarifai = async (req, res) => {
  try {
    const { imageUrl } = req.body;

    // Your Clarifai API request logic here
    const PAT = "730b0f066a624c45941de93f96550d4a";
    const USER_ID = "ren1239";
    const APP_ID = "facedetection";
    const MODEL_ID = "face-detection";
    const MODEL_VERSION_ID = "6dc7e46bc9124c5c8824be4822abe105";

    const raw = JSON.stringify({
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID,
      },
      inputs: [
        {
          data: {
            image: {
              url: imageUrl,
            },
          },
        },
      ],
    });

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Key " + PAT,
        "Content-Type": "application/json",
      },
      body: raw,
    };

    // Make the Clarifai API call
    const response = await fetch(
      `https://api.clarifai.com/v2/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`,
      requestOptions
    );

    if (!response.ok) {
      throw new Error("API request failed");
    }

    const result = await response.json();

    // Process the Clarifai API response as needed

    // Send the result back to the frontend
    res.json(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  handleClarifai: handleClarifai,
};
