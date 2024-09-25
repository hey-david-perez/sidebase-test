/*
  Warnings:

  - You are about to drop the `ActionBank` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Agents` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AssetColumnsMetadata` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AssetMetadata` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ClientMetadata` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DataFileTransfer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Dimensions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EventSequences` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Events` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FAARAugmentations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FeatureData` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FilterAndAugmentRecs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FilterComparators` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FilterLogic` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Messages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Prediction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Regimes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReportingDriverTreeKPINodes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReportingDriverTrees` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReportingKPIs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReportingMetrics` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReportingSegments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TrainingExperiences` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TodoStatus" AS ENUM ('TODO', 'DONE');

-- CreateEnum
CREATE TYPE "ListStatus" AS ENUM ('ONTIME', 'LATE', 'COMPLETED');

-- DropForeignKey
ALTER TABLE "Agents" DROP CONSTRAINT "Agents_dimensionsId_fkey";

-- DropForeignKey
ALTER TABLE "AssetMetadata" DROP CONSTRAINT "AssetMetadata_assetColumnsMetadataId_fkey";

-- DropForeignKey
ALTER TABLE "AssetMetadata" DROP CONSTRAINT "AssetMetadata_clientMetadataId_fkey";

-- DropForeignKey
ALTER TABLE "DataFileTransfer" DROP CONSTRAINT "DataFileTransfer_assetMetadataId_fkey";

-- DropForeignKey
ALTER TABLE "Dimensions" DROP CONSTRAINT "Dimensions_regimesId_fkey";

-- DropForeignKey
ALTER TABLE "EventSequences" DROP CONSTRAINT "EventSequences_eventsId_fkey";

-- DropForeignKey
ALTER TABLE "Events" DROP CONSTRAINT "Events_faarAugmentationsId_fkey";

-- DropForeignKey
ALTER TABLE "FAARAugmentations" DROP CONSTRAINT "FAARAugmentations_actionBankId_fkey";

-- DropForeignKey
ALTER TABLE "FeatureData" DROP CONSTRAINT "FeatureData_filterLogicId_fkey";

-- DropForeignKey
ALTER TABLE "FilterAndAugmentRecs" DROP CONSTRAINT "FilterAndAugmentRecs_predictionId_fkey";

-- DropForeignKey
ALTER TABLE "FilterComparators" DROP CONSTRAINT "FilterComparators_filterLogicId_fkey";

-- DropForeignKey
ALTER TABLE "ReportingDriverTreeKPINodes" DROP CONSTRAINT "ReportingDriverTreeKPINodes_reportingDriverTreesId_fkey";

-- DropForeignKey
ALTER TABLE "ReportingMetrics" DROP CONSTRAINT "ReportingMetrics_reportingKPIsId_fkey";

-- DropForeignKey
ALTER TABLE "ReportingSegments" DROP CONSTRAINT "ReportingSegments_reportingMetricsId_fkey";

-- DropForeignKey
ALTER TABLE "TrainingExperiences" DROP CONSTRAINT "TrainingExperiences_eventSequencesId_fkey";

-- DropTable
DROP TABLE "ActionBank";

-- DropTable
DROP TABLE "Agents";

-- DropTable
DROP TABLE "AssetColumnsMetadata";

-- DropTable
DROP TABLE "AssetMetadata";

-- DropTable
DROP TABLE "ClientMetadata";

-- DropTable
DROP TABLE "DataFileTransfer";

-- DropTable
DROP TABLE "Dimensions";

-- DropTable
DROP TABLE "EventSequences";

-- DropTable
DROP TABLE "Events";

-- DropTable
DROP TABLE "FAARAugmentations";

-- DropTable
DROP TABLE "FeatureData";

-- DropTable
DROP TABLE "FilterAndAugmentRecs";

-- DropTable
DROP TABLE "FilterComparators";

-- DropTable
DROP TABLE "FilterLogic";

-- DropTable
DROP TABLE "Messages";

-- DropTable
DROP TABLE "Prediction";

-- DropTable
DROP TABLE "Regimes";

-- DropTable
DROP TABLE "ReportingDriverTreeKPINodes";

-- DropTable
DROP TABLE "ReportingDriverTrees";

-- DropTable
DROP TABLE "ReportingKPIs";

-- DropTable
DROP TABLE "ReportingMetrics";

-- DropTable
DROP TABLE "ReportingSegments";

-- DropTable
DROP TABLE "TrainingExperiences";

-- CreateTable
CREATE TABLE "Todo" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "TodoStatus" NOT NULL DEFAULT 'TODO',
    "dueTo" TIMESTAMP(3) NOT NULL,
    "todoListId" INTEGER,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TodoList" (
    "id" SERIAL NOT NULL,
    "status" "ListStatus" NOT NULL,
    "clientId" INTEGER,

    CONSTRAINT "TodoList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_todoListId_fkey" FOREIGN KEY ("todoListId") REFERENCES "TodoList"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TodoList" ADD CONSTRAINT "TodoList_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE SET NULL ON UPDATE CASCADE;
