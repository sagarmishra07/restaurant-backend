export const ReceiveCategoryDto = {
  receive: (data: any) =>
    data
      ? {
          id: data?.id,

          categoryName: data?.categoryName,
        }
      : null,
};
