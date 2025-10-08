import { useMediaQuery } from "react-responsive";

export const useMaskSettings = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1024 });

  if (isMobile) {
    return {
      initialMaskPos: "50% -1500vh",
      initialMaskSize: "3100% 3100%",
      maskPos: "50% 12%",
      maskSize: "35% 30%",
    };
  }

  if (isTablet) {
    return {
      initialMaskPos: "50% -1700vh",
      initialMaskSize: "3500% 3500%",
      maskPos: "50% 10%",
      maskSize: "30% 35%",
    };
  }

  return {
    initialMaskPos: "50% 8%",
    initialMaskSize: "30000% 30000%",
    maskPos: "50% 8%",
    maskSize: "20% 35%",
  };
};