


import { ConnectEmbed  } from "thirdweb/react";

import {  client  } from "../utils/thirdweb/client";









const EmbeddLogin = () => {




  return (
    <div>
        <ConnectEmbed client={client}/>
    </div>
  )
}

export default EmbeddLogin
