import { useEffect } from "react";
import { logPageView } from '../lib/analytics';


export default function Translate() {
  useEffect(() => {
    logPageView();
  }, []);
  
  return (
    <iframe
      src="https://paigetranslate.netlify.app/"
      style={{ width: "100%", height: "100%", minHeight: "100vh" }}
      id="frame"
    />
  );
}
