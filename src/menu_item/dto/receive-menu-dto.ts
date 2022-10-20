export const ReceiveMenuDto = {
  receive: (data: any) =>
    data
      ? {
          id: data?.id,
          foodName: data?.foodName,
          foodPrice: data?.foodPrice,
          discountedPrice: data?.discountedPrice,
          status: data?.status,
          ingredients: data?.ingredients,
          productImage: data?.productImage,
          createdBy: data?.createdBy,
          createdAt: data?.createdAt,
          category: data?.category
            ? {
                categoryId: data?.category.id,
                categoryName: data?.category.categoryName,
                createdBy: data?.category.createdBy,
              }
            : null,
        }
      : null,
};
