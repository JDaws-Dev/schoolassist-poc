import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

// Sync Linktree twice a week (Monday and Thursday at 9am UTC)
crons.cron(
  "sync linktree monday",
  "0 9 * * 1", // Monday at 9am UTC
  internal.linktree.syncFromLinktree
);

crons.cron(
  "sync linktree thursday",
  "0 9 * * 4", // Thursday at 9am UTC
  internal.linktree.syncFromLinktree
);

export default crons;
