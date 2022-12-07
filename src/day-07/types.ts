export type Directory = {
  /** The name of the current directory. */
  name: string;

  /** Maps each subdirectory name to its Directory object representation. */
  subdirectories: Map<string, Directory>;

  /** Maps each filename to its file's size. */
  files: Map<string, number>;
};
