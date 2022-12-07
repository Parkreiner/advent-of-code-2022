# Day 7

## Part 1 notes

- We're working with a mock filesystem directory?
  - Root directory is `/`
  - Lines that start with `$` indicate commands I enter
  - `cd` works exactly how you'd expect
  - `ls` also works how you'd expect
    - A value of `123 abc` indicates a file named `abc` that has a size of `123`
    - `dir xyz` indicates a directory with the name `xyz`
- I need to find files/folders that are good candidates for deletion
  - Specifically, directories that have at most a size of `100,000`
  - I then need to add up the sizes of these directories
  - For this challenge, I can count the same file multiple times if it exists within multiple eligible directories
- Files are allowed to have the same name, as long as they have different extensions

### Part 1 approach

I feel like there should be two steps:

1. Process the lines into a directory object
2. Do a recursive calculation through the object to determine the directory sizes that meet the criteria, and then add those sizes up

#### Step 1

1. Create a root object (but also make sure that the first line is `$ cd /`)
   - It might help to have each directory object consist of folders and subdirectories?
2. Create a stack for holding the current level in the directory, and a pointer for the current element in the stack
3. For each line of the input file:

   1. If the line indicates a command (starts with `$`):

      1. If the line is a `cd` command:
         1. If the `cd` is to the root directory (`/`):
            1. Clear out the stack until it only has one element left
         2. If the `cd` is to `..`
            1. Go up one level in the directory, popping the stack, and updating the reference to the current element
         3. If the `cd` is to a specific directory:
            1. Create the directory object if it doesn't already exist
            2. Add the directory object to the stack, and update the current pointer
      2. If the line is an `ls` command:
         1. Do nothing? (the following lines will have files/directories, which must all follow a specific format)

   2. If the line indicates a resource (file or directory):
      1. If the line starts with `dir`:
         1. Make a new directory object if it doesn't already exist, and append it to the current one
      2. If the line starts with a number:
         1. Add the file as a key to the directory object's files map, using the filename as the key, and the size as the value

#### Step 2

1. Create a variable for storing the answer, intialized at 0
2. Start with the root object
3. Create a variable for storing the current directory object's size
4. For each file entry in the files property:
   1. Add the file size to the current object's size
5. For each subdirectory:
   1. Calculate that file's size recursively
6. If the current directory's total size is smaller than 100,000:
   1. Add it to the answer
7. Log out the answer
