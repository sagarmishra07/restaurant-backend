export const ReceiveUserDto = {
  receive: (data: any) => ({
    id: data?.id || '---',
    username: data?.username || '---',
    email: data?.email || '---',
    role: data?.role || '---',
    status: data?.status || '---',
  }),
};
