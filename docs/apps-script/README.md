# Request intake via Google Apps Script

Replaces Formspree. Free, no submission cap, supports photo uploads, and
notifies as many people as you like.

## One-time setup (about 10 minutes)

1. **Create the sheet.** Go to [sheets.new](https://sheets.new) and name it
   something like `Zart requests`.

2. **Open the script editor.** In that sheet: **Extensions → Apps Script**.

3. **Paste the code.** Delete whatever is in `Code.gs` and paste the contents
   of `Code.gs` from this folder. Save.

4. **Check the notify list.** Line 12:

   ```js
   var NOTIFY = [
     "zarttemp@gmail.com",
     "ifedamoladaniel@gmail.com",
     "ebuhwhitney@gmail.com"
   ];
   ```

   Add more addresses whenever you want — they all get every request.

5. **Deploy.** Click **Deploy → New deployment**.
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**

   Google will ask you to authorise it. It will warn that the app isn't
   verified — that's expected for your own script. Click **Advanced**, then
   **Go to (project name)**, then **Allow**.

6. **Copy the web app URL.** It looks like
   `https://script.google.com/macros/s/AKfy.../exec`.

7. **Add it to the site.** In `.env.local` for local work, and in your Vercel
   project settings for production:

   ```
   NEXT_PUBLIC_REQUEST_ENDPOINT=https://script.google.com/macros/s/AKfy.../exec
   ```

   Redeploy after adding it in Vercel — environment variables only apply to
   new builds.

## Editing the notification list later

This file is a reference copy. Changing it here does **not** change who
gets emailed — the script that actually runs lives in the Apps Script
editor attached to the sheet. To change the list:

1. Open the sheet, then **Extensions -> Apps Script**
2. Edit `NOTIFY` at the top of `Code.gs`
3. **Deploy -> Manage deployments -> pencil -> Version: New version -> Deploy**

Step 3 is required. Saving the file does not update the live endpoint.

A Google Group address in `NOTIFY` avoids redeploying every time someone
joins or leaves.

## Checking it works

Open the web app URL directly in a browser. You should see:

```json
{"ok":true,"service":"Zart request intake"}
```

Then submit a real request from the site. Within a few seconds you should get
a row in the sheet and an email.

## Things worth knowing

- **Redeploy after editing.** Changes to `Code.gs` don't go live until you
  click **Deploy → Manage deployments → edit → New version**. This catches
  everyone out at least once.
- **Email quota** is 100 recipients per day on a free Gmail account, 1,500 on
  Workspace. Each request sends one email per address in `NOTIFY`.
- **Photos** land in a Drive folder called `Zart request photos`, shared as
  "anyone with the link" so the link in the email works. If you'd rather keep
  them private, remove the `setSharing` line — the file will still be in Drive
  but only openable by you.
- **The sheet is the database.** Sort it, filter it, add a "Status" workflow,
  build a pivot. There's a `Status` column defaulting to `New` for that.
- **If you outgrow this**, the natural next step is Supabase with a Postgres
  table and an edge function for notifications. That's worth doing when you
  need multiple people updating request status at once, not before.

## Why not Formspree

The free plan caps at 50 submissions a month, sends to one address, and
rejects file uploads entirely — which is why the photo field never worked.
