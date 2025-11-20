import { FormProvider, useForm } from "react-hook-form";
import TextareaFiled from "./textarea-field";
import { fireEvent, render, screen } from "@testing-library/react";
import { useEffect } from "react";

const Wrapper = ({ withError = false }) => {
  const defaultValues = { description: "Initial text" };

  const methods = useForm({
    defaultValues,
  });

  useEffect(() => {
    if (withError) {
      methods.setError("description", {
        type: "manual",
        message: "Enter your description",
      });
    }
  }, [withError, methods]);

  return (
    <FormProvider {...methods}>
      <TextareaFiled
        name="description"
        label="Description"
        placeholder="Enter your description"
        rows={3}
      />
    </FormProvider>
  );
};

describe("Textarea Component", () => {
  test("Render textarea and label correctly", () => {
    render(<Wrapper />);

    const textarea = screen.getByLabelText("Description") as HTMLInputElement;

    expect(textarea).toBeInTheDocument();
  });

  test("Allows user to type in the textarea", () => {
    render(<Wrapper />);

    const textarea = screen.getByPlaceholderText(
      "Enter your description"
    ) as HTMLInputElement;

    fireEvent.change(textarea, { target: { value: "It's my description" } });

    expect(textarea.value).toBe("It's my description");
  });

  test("Shows default value from form", () => {
    render(<Wrapper />);

    const textarea = screen.getByDisplayValue(
      "Initial text"
    ) as HTMLInputElement;

    expect(textarea).toBeInTheDocument();
  });

  test("Label is connected to textarea", () => {
    render(<Wrapper />);

    const label = screen.getByText("Description") as HTMLInputElement;

    const textarea = screen.getByLabelText("Description") as HTMLInputElement;

    expect(label).toHaveAttribute("for", textarea.id);
  });

  test("Textarea has correct rows", () => {
    render(<Wrapper />);

    const textarea = screen.getByLabelText("Description") as HTMLInputElement;

    expect(textarea).toHaveAttribute("rows", "3");
  });

  test("Displays error message", () => {
    render(<Wrapper withError />);

    const textarea = screen.getByText(
      "Enter your description"
    ) as HTMLInputElement;

    expect(textarea).toBeInTheDocument();
  });
});
