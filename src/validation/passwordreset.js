export default function validate(values) {
  let errors = {};

  if (!values.passwordOne) {
    errors.passwordOne = "Password is required";
  } else if (values.passwordOne.length < 8) {
    errors.passwordOne = "Password must be 8 characters long";
  }

  if (!values.passwordTwo || values.passwordTwo !== values.passwordOne) {
    errors.passwordTwo = "Passwords must match";
  }

  return errors;
}
