import {
  fireEvent,
  FormProvider,
  render,
  useEffect,
  useForm,
  screen,
  SelectField,
} from "../imports";

const options = [
  { label: "Option A", value: "A" },
  { label: "Option B", value: "B" },
  { label: "Option C", value: "C" },
];

const Wrapper = ({ withError = false }) => {
  const defaultValues = { category: "B" };

  const methods = useForm({
    defaultValues,
  });

  useEffect(() => {
    if (withError) {
      methods.setError("category", {
        type: "manual",
        message: "Please select a category",
      });
    }
  }, [withError, methods]);

  return (
    <FormProvider {...methods}>
      <SelectField
        name="category"
        label="Category"
        options={options}
        className=""
      />
    </FormProvider>
  );
};

describe("SelectField component", () => {
  test("Renders select and label correctly", () => {
    render(<Wrapper />);

    const select = screen.getByLabelText("Category") as HTMLSelectElement;

    expect(select).toBeInTheDocument();
  });

  test("Shows default value from form", () => {
    render(<Wrapper />);

    const select = screen.getByLabelText("Category") as HTMLSelectElement;

    expect(select.value).toBe("B");
  });

  test("Allows user to change selection", () => {
    render(<Wrapper />);

    const select = screen.getByLabelText("Category") as HTMLSelectElement;

    fireEvent.change(select, { target: { value: "C" } });

    expect(select.value).toBe("C");
  });

  test("Renders all options", () => {
    render(<Wrapper />);

    options.forEach((opt) => {
      expect(screen.getByText(opt.label)).toBeInTheDocument();
    });
  });

  test("Label is connected to select", () => {
    render(<Wrapper />);

    const label = screen.getByText("Category");
    const select = screen.getByLabelText("Category");

    expect(label).toHaveAttribute("for", select.id);
  });

  test("Displays error message", () => {
    render(<Wrapper withError />);

    const error = screen.getByText("Please select a category");

    expect(error).toBeInTheDocument();
  });
});
