export const validateNewTodo = (validateTarget: string, alertMessage: string) => {
  if (validateTarget.length == 0) {
    alert(alertMessage);
    return false;
  }
  return true;
};
