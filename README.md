

# Getting Started

This project was created as a skills assessment with Next.js for Hire Digital. 

The idea of this app is to allow users to upload files smaller than 5MB to virtual storage on Vercel and to view, edit, and delete them in a simple and user-friendly manner.

## For New Contributors

### Step-by-Step Guide

1. Fork this repository.
2. Log in to [Vercel](https://vercel.com/), and if you don't have an account, create one.
3. In Vercel's Dashboard, go to this forked project and connect your Git repository to it.
4. In the project settings, go to "Storage" and create a Blob database.
5. Open the project with Visual Studio Code or any code editor you use and run `vercel env pull .env.development.local`.
6. This should create a file named ".env.development.local".
   - Optionally, you can add an environment variable called `BLOB_READ_WRITE_TOKEN="your token"`. You can find your token in Vercel's platform under the forked project settings in the "Environment Variables" section.
7. In the console, run `npm run dev` and open the server.

## Considerations

- I only had 12 hours to do this because I saw the email inviting me to this challenge quite late.
- The edit button does not work perfectly because of time constraints, but everything else should function correctly.

### Project Requirements

```bash
- Build a single button that allows users to upload files <=5MB to Vercel’s blob storage.
  + Call a third-party API (example.com) when the upload begins.
  + Call a third-party API (example.com) when the upload succeeds.
  + Call a third-party API (example.com) when the upload fails.
  + Show a modal if the file is >5MB, rejecting the upload.
- After the upload is complete, display a list of links to all uploaded files so they can be downloaded again.
- Add a pencil icon next to each link in the list to allow renaming the file. A modal with Save and Cancel buttons should open for renaming.
- Display a skeleton loader while the list of files is loading.
  - Add a fake delay if the list loads too quickly to demonstrate the effect.
- Add a trash icon next to each link in the list to allow deletion of the file.
- Implement error boundaries to handle any errors and display an error UI.
- Ensure that the entire state persists when the page is refreshed.
Libraries
  - Use shadcn/ui or Radix UI.
  - Use Next.js 14 with App Router and Server Actions.
  - Create a Git repository to track code changes with commits.
  - Deploy to Vercel.
  - Write brief documentation as a README.md at the root to highlight anything relevant for new contributors.
```


