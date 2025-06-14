import { loginValidationSchema } from "./formValidation";

describe("loginValidationSchema", () => {
  const validate = async (data) => {
    try {
      await loginValidationSchema.validate(data, { abortEarly: false });
      return null;
    } catch (error) {
      return error.errors;
    }
  };

  test("valid email and password should pass", async () => {
    const errors = await validate({
      email: "user@example.com",
      password: "SecurePass123",
    });
    expect(errors).toBeNull();
  });

  test("invalid email format should fail", async () => {
    const errors = await validate({
      email: "invalid-email",
      password: "SecurePass123",
    });
    expect(errors).toContain("Email must be valid");
  });

  test("email with 321 characters should fail", async () => {
    const longEmail = "a".repeat(312) + "@mail.com";
    const errors = await validate({
      email: longEmail,
      password: "SecurePass123",
    });
    expect(errors).toContain("Email must be less than 320 characters");
  });

  test("email with 320 characters should pass", async () => {
    const validLongEmail = "a".repeat(311) + "@mail.com";
    const errors = await validate({
      email: validLongEmail,
      password: "SecurePass123",
    });
    expect(errors).toBeNull();
  });

  test("empty email should fail", async () => {
    const errors = await validate({
      email: "",
      password: "SecurePass123",
    });
    expect(errors).toContain("Email is required");
  });

  test("empty password should fail", async () => {
    const errors = await validate({
      email: "user@example.com",
      password: "",
    });
    expect(errors).toContain("Password is required");
  });
});
