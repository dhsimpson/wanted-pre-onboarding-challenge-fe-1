export const getFormInputData = (formData: FormData, name: string) => {
  return formData.get(name)?.toString() ?? '';
};
