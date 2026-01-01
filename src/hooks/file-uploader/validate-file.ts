import { validateFileProps } from "../type";

export function validateFile({
  file,
  accept,
  except,
  maxSizeMB,
}: validateFileProps): string | null {
  const mime = file.type;

  // splite extension
  const ext = "." + file.name.split(".").pop()?.toLowerCase();

  // check extension type and size
  if (file.size > maxSizeMB * 1024 * 1024) return "File too large";
  if (except && except.includes(ext)) return "Invalid file type";
  if (!accept) return null;

  // rules
  for (const rule of accept) {
    if (rule.endsWith("/*") && mime.startsWith(rule.replace("/*", "")))
      return null;
    if (rule === mime) return null;

    if (rule.startsWith(".") && rule === ext) return null;
  }

  return "Invalid file type";
}
