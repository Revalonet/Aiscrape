import axios from "axios";
import crypto from "crypto";
import readline from "readline";

function generateSessionHash() {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 11; i++) {
    const byte = crypto.randomBytes(1)[0];
    result += chars[byte % chars.length];
  }
  return result;
}

export async function deepSeek(teks, webSearch = false) {
  const sessionHash = generateSessionHash();

  await axios.post(
    "https://ginigen-deepseek-r1-0528-api.hf.space/gradio_api/queue/join?__theme=system",
    {
      data: [teks, [], webSearch],
      event_data: null,
      fn_index: 2,
      trigger_id: 13,
      session_hash: sessionHash
    },
    {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Content-Type": "application/json"
      },
      timeout: 20000
    }
  );

  const res = await axios.get(
    `https://ginigen-deepseek-r1-0528-api.hf.space/gradio_api/queue/data?session_hash=${sessionHash}`,
    {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "text/event-stream"
      },
      responseType: "stream",
      timeout: 0
    }
  );

  return new Promise((resolve) => {
    let output = "";

    const rl = readline.createInterface({
      input: res.data,
      crlfDelay: Infinity
    });

    rl.on("line", (line) => {
      if (line.startsWith("data:")) {
        try {
          const json = JSON.parse(line.slice(5).trim());
          if (
            json?.output?.data?.[0]?.[0]?.[0] === "replace" ||
            json?.output?.data?.[0]?.[0]?.[0] === "append"
          ) {
            output += json.output.data[0][0][2];
          }
        } catch (e) {
          // ignore parse errors
        }
      }
    });

    rl.on("close", () => {
      resolve(output);
    });
  });
}
