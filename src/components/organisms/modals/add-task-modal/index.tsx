"use client";

import { lazy, Suspense, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { enqueueSnackbar } from "notistack";
import dayjs from "dayjs";

// hook
import { useAuth } from "@/src/hooks/auth/use-auth";
import { useFileUploader } from "@/src/hooks/file-uploader/use-file-uploader";
import { useImageProcessor } from "@/src/hooks/image-processor/use-image-processor";

// type
import { AddTaskProps } from "../../type";
import { Task, TaskForm } from "@/src/types/global";

// schema
import { TaskShema } from "./schema";

// firestore
import { createTaskDocument } from "@/src/libs/tasks/create-task";

// ui
import PageLoading from "../../../common/page-loading";

// lazy
const AddTaskFormComponent = lazy(() => import("./steps/add-task-form"));
const AddTaskUploadCmponent = lazy(() => import("./steps/upload"));

const AddTask = ({ handleClose }: Pick<AddTaskProps, "handleClose">) => {
  // hooks
  const { user } = useAuth();

  const { processImage } = useImageProcessor({ size: 1024 });

  const { cancel, error, fileType, progress, reset, upload, uploading, url } =
    useFileUploader({
      accept: ["image/*", "video/*"],
    });

  // states
  const [loading, setLoading] = useState<boolean>(false);
  const [number, setNumber] = useState(0);

  // form
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

  // functions
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
    <Suspense fallback={<PageLoading />}>
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
    </Suspense>
  );
};

export default AddTask;
