import { upload } from "thirdweb/storage";
import { client } from "@/utils/thirdweb/client";


export async function uploadData(_file) {
      try {
        // Upload the file to IPFS
        // console.log("back end log",_file);
        const uri = await upload({
          client,
          files: [_file],
        });
        console.log("Uploaded to:", uri);
        return uri;
      } catch (error) {
        console.error("Error uploading to IPFS:", error);
      }
  };



