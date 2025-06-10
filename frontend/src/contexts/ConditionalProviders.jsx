import { Outlet } from "react-router-dom";
import { SoundProvider } from "./contexts/SoundProvider";

export const ConditionalProviders = () => {
  return (
    <SoundProvider>
      <Outlet />
    </SoundProvider>
  );
};
