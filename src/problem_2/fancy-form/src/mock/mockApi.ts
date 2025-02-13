export const mockSwapApi = async (swapData: any): Promise<{ success: boolean; message: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Mock API Received:", swapData);
        resolve({
          success: true,
          message: "Swap transaction completed successfully!",
        });
      }, 1500);
    });
  };
  