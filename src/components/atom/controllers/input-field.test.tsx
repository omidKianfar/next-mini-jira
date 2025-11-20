import { FormProvider, useForm } from "react-hook-form";
import InputField from "./input-field";
import { render, screen, fireEvent } from "@testing-library/react";
import { useEffect } from "react";

const Wrapper = ({ withError = false }) => {
  const defaultValues = { name: "Initial text" };

  const methods = useForm({
    defaultValues,
  });

  useEffect(() => {
    if (withError) {
      methods.setError("name", {
        type: "manual",
        message: "Enter your name",
      });
    }
  }, [withError, methods]);

  return (
    <FormProvider {...methods}>
      <InputField name="name" label="Name" placeholder="Enter your name" />
    </FormProvider>
  );
};

describe("InputField component", () => {
  test("Renders input and label correctly", () => {
    render(<Wrapper />);

    const textInput = screen.getByLabelText("Name") as HTMLInputElement;

    expect(textInput).toBeInTheDocument();
  });

  test("Allows user to type in the input", () => {
    render(<Wrapper />);

    const textInput = screen.getByPlaceholderText(
      "Enter your name"
    ) as HTMLInputElement;

    fireEvent.change(textInput, { target: { value: "omid" } });

    expect(textInput.value).toBe("omid");
  });

  test("Shows default value from form", () => {
    render(<Wrapper />);

    const textInput = screen.getByDisplayValue(
      "Initial text"
    ) as HTMLInputElement;

    expect(textInput).toBeInTheDocument();
  });

  test("Label is connected to input", () => {
    render(<Wrapper />);

    const label = screen.getByText("Name") as HTMLInputElement;

    const textInput = screen.getByLabelText("Name") as HTMLInputElement;

    expect(label).toHaveAttribute("for", textInput.id);
  });

  test("Displays error message", () => {
    render(<Wrapper withError />);

    const textInput = screen.getByText("Enter your name") as HTMLInputElement;

    expect(textInput).toBeInTheDocument();
  });
});
