This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## For new contributors

# Step by step guide:

- Fork this repository
- Login on [Vercel](https://vercel.com/) and if you don't have an account create one.
- In Vercel's Dashboard go to this forked project and connect your git repository it.
- On the project go to storage and Create Database>Blob and create a database.
- Open the project with Visual Studio Code or any code editor that you use and paste 'vercel env pull .env.development.local'
- It must have created a file named ".env.development.local"
  + Optionally you can add an env variable called BLOB_READ_WRITE_TOKEN="your token" where you can find your token in vercels plataform>this forked project>settings>enviromental variables and you should see it there.
- In the console paste "npm run dev" and open the server.

## Considerations:

- The edit button does not work perfectly because I didn't have enough time to make it work, but everything else should work fine.

# This project was made taking account this considerations:

```bash
/*
-Build a single button that allows you to upload files <=5MB to Vercel’s blob storage.
  +call a third party API (example.com) when the upload begins
  +call a third party API (example.com) when the upload succeeds
  +call a third party API (example.com) when the upload fails
  +If the file is >5MB please show a modal that rejects
-After the upload is complete, show a list of links of all uploaded files such that you can download them again.
-Put a pencil icon to each link in the list to rename the file. A modal with Save and Cancel buttons should open for the rename.
-Show a skeleton instead of the list of files when the list is still loading.
-add some fake delay if it loads too fast just to show the effect.
-Put a trash icon next to each link in the list so that you can delete it.
-Ensure there are error boundaries in case anything errors and you show some kind of error UI.
-When you refresh the whole page, the entire state should persist.

Libraries:

Use shadcn/ui or Radix UI
Use NextJs 14 with AppRouter and Server Actions
Make a Git repository to track your code changes in commits

Deploy to Vercel

Write brief documentation as a Readme.md at the root to flag anything you might find relevant for a new contributor
*/
```

Thank you very much.
