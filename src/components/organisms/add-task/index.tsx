"use client";

import { Columns, Task, TaskForm } from "@/src/types/global";
import { FormProvider, useForm } from "react-hook-form";
import { useMemo, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { TaskShema } from "../board/schema";
import dayjs from "dayjs";
import { createTaskDocument } from "@/src/lib/tasks/create-task";
import ButtonNext from "@/src/components/atom/button/button-next";
import { useAuth } from "@/src/hooks/auth/use-auth";
import { enqueueSnackbar } from "notistack";
import SelectField from "../../molecule/controllers/RHF-fields/select-filed";
import InputField from "../../molecule/controllers/RHF-fields/input-field";
import TextareaFiled from "../../molecule/controllers/RHF-fields/textarea-field";
import { ModalProps } from "../../molecule/type";

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
    [],
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
        updatedAt: "",
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
      <h1 className="mb-4 text-center text-title font-bold text-warning-500">
        Create Task
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

          <div className="mt-4 flex justify-center lg:justify-end">
            <ButtonNext onClick={handleClose} className="mr-4">
              Cancel
            </ButtonNext>

            <ButtonNext type="submit" isLoading={loading}>
              Create
            </ButtonNext>
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
