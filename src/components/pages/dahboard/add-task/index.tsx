"use client";

import {
  Button,
  Columns,
  createTaskDocument,
  dayjs,
  enqueueSnackbar,
  FormProvider,
  InputField,
  ModalProps,
  SelectField,
  Task,
  TaskForm,
  TaskShema,
  TextareaFiled,
  useAuth,
  useForm,
  useMemo,
  useState,
  yupResolver,
} from "../imports";

const AddTaskFormComponent = ({
  handleClose,
}: Pick<ModalProps, "handleClose">) => {
  const { user } = useAuth();

  const [loading, setLoading] = useState<boolean>(false);

  const defaultValues: TaskForm = useMemo(
    () => ({
      title: "",
      description: "",
      tag: "task",
      fileUrl: null,
    }),
    []
  );

  const methods = useForm<TaskForm>({
    defaultValues,
    resolver: yupResolver(TaskShema),
  });

  const onSubmit = async (values: TaskForm) => {
    setLoading(true);

    try {
      const newTask: Task = {
        id: crypto.randomUUID(),
        title: values.title,
        description: values.description,
        status: "todo",
        tag: values.tag,
        createdAt: dayjs().format("YYYY-MM-DD"),
        fileUrl: values.fileUrl,
        userId: user?.userId as string,
      };

      await createTaskDocument(newTask);

      enqueueSnackbar(`Todo created successfully`, {
        variant: "success",
      });

      handleClose();
    } catch (error: any) {
      enqueueSnackbar(`Error: ${error?.message || error}. Please try again.`, {
        variant: "error",
      });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-4 text-amber-500">
        Task
      </h1>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <SelectField name="tag" options={columns} label={"Tag"} />

          <InputField
            name="title"
            label="Title"
            placeholder="Enter your title"
            autoFocus
          />

          <TextareaFiled
            name="description"
            label="Description"
            placeholder="Enter your description"
          />

          <div className="mt-4 flex justify-end">
            <Button
              onClick={handleClose}
              className=" bg-blue-500 text-white border-2
                hover:bg-transparent hover:border-blue-500
                hover:text-blue-500 rounded-lg px-8 py-2 
                transition-all duration-200 mr-4"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              isLoading={loading}
              className=" bg-blue-500 text-white border-2
                hover:bg-transparent hover:border-blue-500
                hover:text-blue-500 rounded-lg px-8 py-2 
                transition-all duration-200"
            >
              Add {methods.watch("tag") == "task" ? "Task" : "Bug"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default AddTaskFormComponent;

export const columns: Columns[] = [
  { label: "Bug", value: "bug" },
  { label: "Task", value: "task" },
];
