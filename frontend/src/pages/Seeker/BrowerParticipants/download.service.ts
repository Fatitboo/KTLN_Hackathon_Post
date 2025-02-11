import axios from "axios";

function saveBlob(content: any, mimeType: string, filename: string) {
  const a = window.document.createElement("a");
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  a.setAttribute("href", url);
  a.setAttribute("download", filename);
  a.click();
}

export async function downloadFileByUrl(url: string, fileName?: string) {
  const response = await axios({
    method: "get",
    url,
    responseType: "arraybuffer",
    transformResponse: [
      function (data) {
        return data;
      },
    ],
  });
  saveBlob(response.data, response.headers["content-type"], fileName || "file");
}

export async function downloadResourceFile(
  apiPath: string,
  body: any,
  inquiryName: string
) {
  const response: Blob = await axios.post(apiPath, body, {
    responseType: "blob",
  });
  saveBlob(response, response.type, inquiryName);

  return response;
}
