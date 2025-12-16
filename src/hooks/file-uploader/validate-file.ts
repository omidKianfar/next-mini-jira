export function validateFile(
  file: File,
  accept: string[] | null,
  except: string[] | null,
  maxSizeMB: number,
): string | null {
  const mime = file.type;
  const ext = "." + file.name.split(".").pop()?.toLowerCase();

  if (file.size > maxSizeMB * 1024 * 1024) return "File too large";
  if (except && except.includes(ext)) return "Invalid file type";
  if (!accept) return null;

  for (const rule of accept) {
    if (rule.endsWith("/*") && mime.startsWith(rule.replace("/*", "")))
      return null;
    if (rule === mime) return null;
    if (rule.startsWith(".") && rule === ext) return null;
  }

  return "Invalid file type";
}
