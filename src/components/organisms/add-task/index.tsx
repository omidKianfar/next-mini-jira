"use client";

import { useState } from "react";
import AddTaskFormComponent from "./steps/add-task-form";
import { AddTaskProps } from "../type";
import { Task, TaskForm } from "@/src/types/global";
import { useAuth } from "@/src/hooks/auth/use-auth";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TaskShema } from "../board/schema";
import { createTaskDocument } from "@/src/lib/tasks/create-task";
import { enqueueSnackbar } from "notistack";
import dayjs from "dayjs";
import AddTaskUploadCmponent from "./steps/upload";
import { useFileUploader } from "@/src/hooks/file-uploader";
import { useImageProcessor } from "@/src/hooks/image-processor";

const AddTask = ({ handleClose }: Pick<AddTaskProps, "handleClose">) => {
  const { user } = useAuth();

  const { processImage } = useImageProcessor({ size: 1024 });

  const { cancel, error, fileType, progress, reset, upload, uploading, url } =
    useFileUploader({
      accept: ["image/*", "video/*"],
    });

  const [loading, setLoading] = useState<boolean>(false);
  const [number, setNumber] = useState(0);

  const defaultValues: TaskForm = {
    title: "",
    description: "",
    tag: "task",
    attachment: {
      fileUrl: null,
      fileType: null,
    },
  };

  const methods = useForm<TaskForm>({
    defaultValues,
    resolver: yupResolver(TaskShema),
  });

  const uploadProcessHandler = async (file: File) => {
    let finalFile = file;

    if (file.type.startsWith("image/")) {
      const processed = await processImage(file);

      finalFile = processed;
    }

    await upload({ file: finalFile });
  };

  const handleSave = () => {
    methods.setValue("attachment.fileUrl", url);
    setNumber(0);
  };

  const handleCancel = () => {
    methods.setValue("attachment.fileUrl", "");
    cancel();
    setNumber(0);
  };

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
        attachment: {
          fileUrl: values.attachment?.fileUrl,
          fileType: fileType,
        },
        userId: user?.userId as string,
        updatedAt: "",
      };

      await createTaskDocument(newTask);

      enqueueSnackbar(`Task created successfully`, {
        variant: "success",
      });

      reset();

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
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {number == 0 ? (
          <AddTaskFormComponent
            handleClose={handleClose}
            setNumber={setNumber}
            loading={loading}
          />
        ) : (
          <AddTaskUploadCmponent
            uploadProcessHandler={uploadProcessHandler}
            handleCancel={handleCancel}
            handleSave={handleSave}
            progress={progress}
            uploading={uploading}
            error={error}
            fileType={fileType}
            url={url}
          />
        )}
      </form>
    </FormProvider>
  );
};

export default AddTask;
