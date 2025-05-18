-- AlterTable
ALTER TABLE "Availability" ADD COLUMN     "endDate" TEXT,
ADD COLUMN     "startDate" TEXT;

-- AlterTable
ALTER TABLE "Meeting" ALTER COLUMN "endTime" SET DEFAULT NOW() + interval '1 hour';

-- AlterTable
ALTER TABLE "ReminderOffset" ADD COLUMN     "customScheduleAt" TEXT,
ALTER COLUMN "sendOffset" DROP NOT NULL;
