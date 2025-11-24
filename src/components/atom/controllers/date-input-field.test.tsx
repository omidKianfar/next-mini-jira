import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { fireEvent, render, screen } from "@testing-library/react";
import DateInputField from "./date-input-field";

const Wrapper = ({ withError = false }) => {
  const methods = useForm({
    defaultValues: { date: "1990-08-03" },
  });

  useEffect(() => {
    if (withError) {
      methods.setError("date", {
        type: "manual",
        message: "Invalid date",
      });
    }
  }, [withError, methods]);

  return (
    <FormProvider {...methods}>
      <DateInputField name="date" label="Date" />
    </FormProvider>
  );
};

describe("DateInput Component", () => {
  test("Render date input and label correctly", () => {
    render(<Wrapper />);

    const timeInput = screen.getByLabelText("Date") as HTMLInputElement;

    expect(timeInput).toBeInTheDocument();
  });

  test("Shows default value", () => {
    render(<Wrapper />);

    const timeInput = screen.getByLabelText("Date") as HTMLInputElement;

    expect(timeInput.value).toBe("1990-08-03");
  });

  test("Allows user to change date", () => {
    render(<Wrapper />);

    const timeInput = screen.getByLabelText("Date") as HTMLInputElement;

    fireEvent.change(timeInput, { target: { value: "1990-08-04" } });

    expect(timeInput.value).toBe("1990-08-04");
  });

  test("Show error", () => {
    render(<Wrapper withError />);

    const errorMessage = screen.getByText("Invalid date");

    expect(errorMessage).toBeInTheDocument();
  });
});
