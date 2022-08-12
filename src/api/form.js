export const formError = (form, values, mainField, data) => {
  if (data.error && data.error === "ValidationError") {
    Object.keys(data.validationMessages).forEach(item => {
      form.setFields([{
        name: item,
        value: values[item],
        errors: data.validationMessages[item],
      }]);
    });
    return;
  }
  if (data.error) {
    form.setFields([
      {
        name: mainField,
        value: values[mainField],
        errors: [data.message],
      },
    ]);
    return;
  }
}