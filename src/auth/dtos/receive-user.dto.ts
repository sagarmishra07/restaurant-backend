export const ReceiveUserDto = {
  receive: (data: any) => ({
    id: data?.id || '---',
    username: data?.username || '---',
    email: data?.email || '---',
    role: data?.role || '---',
    status: data?.status || '---',
  }),
};
export const ReceiveUserDetailDto = {
  receive: (data: any) => ({
    id: data?.id,
    userId: data?.user.id || '---',
    username: data?.user.username || '---',
    email: data?.user.email || '---',
    role: data?.user.role || '---',
    status: data?.user.status || '---',
    phone: data?.phone || '---',
  }),
};
