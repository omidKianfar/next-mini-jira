import { routes } from "@/src/lib/route/routes";
import { UsePlanActionProps } from "../type";

export const usePlanAction = () => {
  const choosePlan = async ({
    selectedPlan,
    setLoading,
  }: UsePlanActionProps) => {
    try {
      const response = await fetch(routes.api.createStripCheckout, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ planType: selectedPlan }),
      });

      const result = await response.json();

      if (result.url) {
        window.location.href = result.url;
      } else {
        console.log("Error creating Stripe session");
        setLoading(false);
      }
    } catch (e) {
      console.log("Stripe error:", e);
      setLoading(false);
    }
  };

  return { choosePlan };
};
